require 'digest/sha1'

class User < ActiveRecord::Base

  #GC 
  has_many :rsvps, :dependent => :destroy
  has_many :events, :through => :rspvs
  has_many :contributions
  has_many :digs
  has_many :coupons
  has_many :favorites
  has_many :causes, :through => :contributions, :uniq => true
  has_many :contributed_non_profits, :through => :contributions, :source => :charity, :uniq => true
  has_many :favorite_venues, :through => :favorites, :source => :venue, :uniq => true

  #end GC 

  MALE    = 'M'
  FEMALE  = 'F'
  attr_accessor :password
  attr_protected :admin, :role_id

  tracks_unlinked_activities [:logged_in, :invited_friends, :updated_profile]  
  acts_as_mappable :default_units => :miles, 
                   :default_formula => :sphere, 
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  
  #callbacks  
  before_save   :encrypt_password, :whitelist_attributes
  before_create :make_activation_code
  before_save   :generate_location_data
  after_create  :update_last_login
  #after_create {|user| UserNotifier.deliver_signup_notification(user) }
  #after_save   {|user| UserNotifier.deliver_activation(user) if user.recently_activated? }  
  before_save   :generate_login_slug


  #validation
  validates_presence_of     :login, :email
  validates_presence_of     :password,                   :if => :password_required?
  validates_presence_of     :password_confirmation,      :if => :password_required?
  #validates_presence_of     :zipcode #:with => /\d\d\d\d\d/
  #validates_format_of       :zipcode, :with => /(^\d{5}$)|(^\d{5}-\d{4}$)/
  validates_length_of       :password, :within => 6..20, :if => :password_required?
  validates_confirmation_of :password,                   :if => :password_required?
  validates_length_of       :login,    :within => 5..20
  validates_length_of       :email,    :within => 3..100
  validates_format_of       :email, :with => /^([^@\s]+)@((?:[-a-z0-9A-Z]+\.)+[a-zA-Z]{2,})$/
  validates_format_of       :login, :with => /^[\sA-Za-z0-9_-]+$/
  validates_uniqueness_of   :login, :email, :case_sensitive => false
  validates_uniqueness_of   :login_slug
  validates_exclusion_of    :login, :in => AppConfig.reserved_logins

  #associations
    has_enumerated :role  
    #has_many :posts, :order => "published_at desc", :dependent => :destroy
    has_many :photos, :order => "created_at desc", :dependent => :destroy
    has_many :invitations, :dependent => :destroy
    has_many :offerings, :dependent => :destroy

    #friendship associations
    has_many :friendships, :class_name => "Friendship", :foreign_key => "user_id", :dependent => :destroy
    has_many :accepted_friendships, :class_name => "Friendship", :conditions => ['friendship_status_id = ?', 2]
    has_many :pending_friendships, :class_name => "Friendship", :conditions => ['initiator = ? AND friendship_status_id = ?', false, 1]
    has_many :friendships_initiated_by_me, :class_name => "Friendship", :foreign_key => "user_id", :conditions => ['initiator = ?', true], :dependent => :destroy
    has_many :friendships_not_initiated_by_me, :class_name => "Friendship", :foreign_key => "user_id", :conditions => ['initiator = ?', false], :dependent => :destroy
    has_many :occurances_as_friend, :class_name => "Friendship", :foreign_key => "friend_id", :dependent => :destroy

    #forums
    #has_many :moderatorships, :dependent => :destroy
    #has_many :forums, :through => :moderatorships, :order => 'forums.name'
    #has_many :sb_posts, :dependent => :destroy
    #has_many :topics, :dependent => :destroy
    #has_many :monitorships, :dependent => :destroy
    #has_many :monitored_topics, :through => :monitorships, :conditions => ['monitorships.active = ?', true], :order => 'topics.replied_at desc', :source => :topic

    belongs_to  :avatar, :class_name => "Photo", :foreign_key => "avatar_id"
    #has_many    :comments_as_author, :class_name => "Comment", :foreign_key => "user_id", :order => "created_at desc", :dependent => :destroy
    #has_many    :comments_as_recipient, :class_name => "Comment", :foreign_key => "recipient_id", :order => "created_at desc", :dependent => :destroy
    #has_many    :clippings, :order => "created_at desc", :dependent => :destroy
    
  #named scopes
  named_scope :recent, :order => 'users.created_at DESC'
  #named_scope :featured, :conditions => ["users.featured_writer = ?", 1]
  named_scope :active, :conditions => ["users.activated_at IS NOT NULL"]  
  #named_scope :vendors, :conditions => ["users.vendor = ?", 1]
  named_scope :tagged_with, lambda {|tag_name|
    {:conditions => ["tags.name = ?", tag_name], :include => :tags}
  }

#Filter Related

  #if don't want to use user_array param (user objects), use nil (USES OBJECTS)
  def self.filter_by_proximity(zipcode, radius,user_array)
    location = Zipcode.find_by_zipcode(zipcode.to_i)
    location = [location.latitude, location.longitude]
    near_users = User.find(:all, :origin => location, :within => radius)
    if user_array.nil?
      return near_users
    else
      filtered_users = return_array_of_similar_elements(near_users, user_array)
    end
    filtered_users
  end
  
  #if don't want to use user_array param (object array).  Set to 50 max results returned. (USES OBJECTS)
  def self.filter_by_causes(cause_array, user_array)
    max = 50
    users =[]
    if cause_array.nil?
      return []
    end
    cause_array.each do |cause|
      users << cause.contributors
    end
    users.uniq!
    users.flatten!
    users = users.slice(0,max)
    if user_array.nil?
      return users
    else
      filtered_users = return_array_of_similar_elements(users, user_array)
    end
    filtered_users
  end
  
  #if don't want to use user_array param (array of objects), use nil.  Set to 50 max results returned. (USES OBJECTS)
  def self.filter_by_favorite_venues(venue_array, user_array)
    max = 50
    if venue_array.nil?
      return []
    end
    users = []
    venue_array.each do |venue|
      users << venue.favorite_customers
    end
    users.uniq!
    users.slice!(0,max)
    if user_array.nil?
      return users
    else
      filtered_users = return_array_of_similar_elements(users, user_array)
    end
    filtered_users
  end

  def return_users_like_me
    max = 50
    users_location = []
    users_venues = []
    users_causes = []
  	if !self.zipcode.nil?
      users_location = User.filter_by_proximity(self.zipcode, 5,nil)
    end
    if !self.causes.nil?
      users_causes = User.filter_by_causes(self.causes,nil)
    end
    if !self.favorite_venues.nil?
      users_venues = User.filter_by_favorite_venues(self.favorite_venues, nil)
    end
    users=[]
    users << users_causes
    users << users_venues
    users << users_location
    users.flatten!
    users.uniq
    users.slice(0,max)
    users
  end
   
  #if you want to search all users, user_array = nil
  def self.filter_by_name(name, user_array)
    if user_array.nil?
      users_first_name = User.find(:all, :conditions => ["first_name like ?", "%"+name+"%"])
      users_last_name = User.find(:all, :conditions => ["last_name like ?", "%"+name+"%"])
      return (users_first_name + users_last_name).uniq
    elsif user_array.empty?
      return []
    else
      users = []
      user_array.each do |user|
        if user.last_name.match(name)
          users << user
        elsif user.first_name.match(name)
          users << user
        end
      end
      return users
    end
  end
    

#User Personal Info Related

  def active?
    activation_code.nil?
  end

  def recently_activated?
    @activated
  end
  
  def owner
    self
  end
  
  def self.recent_activity(page = {}, options = {})
    page.reverse_merge! :size => 10, :current => 1
    Activity.recent.find(:all, :page => page, *options)      
  end

  def self.currently_online
    User.find(:all, :conditions => ["sb_last_seen_at > ?", Time.now.utc-5.minutes])
  end

  #FIXME!  doesn't take into account leap years
  def age
    if birthday = self.birthday
      days_from_birthday= (Date.today-birthday).to_i
      age = (days_from_birthday/365).to_i
    else
      return ""
    end
  age
  end
  
#Friendship Related

  def friends_ids
    return [] if accepted_friendships.empty?
    accepted_friendships.map{|fr| fr.friend_id }
  end

  def return_friends
    ids = self.friends_ids
    friends = []
    if ids.empty?
      return []
    end
    ids.each do |id|
      friends << User.find(id)
    end
    friends
  end
    
      
  def has_reached_daily_friend_request_limit?
    friendships_initiated_by_me.count(:conditions => ['created_at > ?', Time.now.beginning_of_day]) >= Friendship.daily_request_limit
  end
  
  def can_request_friendship_with(user)
    !self.eql?(user) && !self.friendship_exists_with?(user)
  end

  def friendship_exists_with?(friend)
    Friendship.find(:first, :conditions => ["user_id = ? AND friend_id = ?", self.id, friend.id])
  end

#Venue Related

  def friends_favorite_venues
    friends = self.friends_ids
    venues = []
    friends.each do |id|
      friend_favorite_venues = User.find(id).favorite_venues
      venues << friends_venue_ids
    end
    venues.flatten!
    venues.uniq!
    venues
  end

  def purchase_coupon(original_coupon_id)
    #first find original coupon
    orig_coupon = Coupon.find(original_coupon_id)
    #unless orig_coupon isn't an original coupon...
    unless !orig_coupon.coupon_pin.nil?
      c = orig_coupon.return_copy_for_user(self.id)
      c.save
    else
      #TODO
      #RETURN ERROR
    end
  end

  def is_rsvp(event)
    if self.rsvps.find_by_event_id(event)
      return TRUE
    else
      return FALSE
    end
  end

  def add_rsvp(rsvp)
    rsvps << rsvp
  end
 
  def add_buzz(buzz)
	buzzes << buzz
  end
  
  def has_buzzed(event)
    for buzz in buzzes
      if buzz.event == event
        return true
      end
      return false
    end
  end


  def return_coupons
    self.coupons_by_users
  end
  
#Donations Related

  def add_contribution(donation)
    contributions << donation
  end

  def get_total_donation_amount
    total =0
    for donation in donations
      total = total + donation.amount
    end
    total
  end
  
  def get_donations_by_amt_descending
    donations = self.donations
    donations.sort_by {|d| d.amount }
    donations
  end

  def get_donations_by_amt_ascending
    get_donations_by_amt_descending.reverse!
  end

  def get_donations_by_date_descending
    donations = self.donations
    donations.sort_by {|d| d.created_at }
    donations
  end

  def get_donations_by_date_ascending
    get_donations_by_date_descending.reverse!
  end
  
  def get_donations_by_cause(cause)
    donations = self.donations
    donationsByCause = []
    for donation in donations
      if donation.cause == cause
        donationsByCause << donation
      end
    end
    donationsByCause
  end
  
  def get_donations_by_charity(charity)
    donations = self.donations
    donationsByCharity = []
    for donation in donations
      if donation.charity == charity
        donationsByCharity << donation
      end
    end
    donationsByCharity
  end
  
  def get_causes
    self.causes		
  end

	def top_charities(count)
		#find charities by this user's donation amount
  end

  #returns charities user has contributed to
  def has_contributed_to
    self.contributed_non_profits
  end

#Authentication Related

  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  def self.authenticate(login, password)
    # hide records with a nil activated_at
    u = find :first, :conditions => ['login = ? and activated_at IS NOT NULL', login]
    u = find :first, :conditions => ['email = ? and activated_at IS NOT NULL', login] if u.nil?
    u && u.authenticated?(password) && u.update_last_login ? u : nil
  end
  
  def self.encrypt(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
  end

#Feedback Related

  #returns charities sorted by feedback date
  def get_charities_sorted_by_feedback_date
    charity_ids = Charity.find_by_sql(["select distinct charities.id from charities inner join contributions on (charities.id=contributions.charity_id and contributions.user_id =?) order by latest_feedback_date DESC",self.id])
    charities = []    
    charity_ids.each do |c|
      charities << Charity.find(c)
    end
    charities
  end

  #returns latest feedback from 
  def get_latest_feedback(count)
    #returns array of 5 feedback objects--1 recent feedback each from at most COUNT charities
    charities = self.get_charities_sorted_by_feedback_date.slice!(0,count)
    feedback= []
    charities.each do |c|
      feedback << c.latest_feedback
    end
    feedback
  end

#Admin Related

  def deactivate
    return if admin? #don't allow admin deactivation
    @activated = false
    update_attributes(:activated_at => nil, :activation_code => make_activation_code)
  end

  def activate
    @activated = true
    update_attributes(:activated_at => Time.now.utc, :activation_code => nil)
  end

  def encrypt(password)
    self.class.encrypt(password, salt)
  end

  def authenticated?(password)
    crypted_password == encrypt(password)
  end

  def remember_token?
    remember_token_expires_at && Time.now.utc < remember_token_expires_at 
  end

  # These create and unset the fields required for remembering users between browser closes
  def remember_me
    self.remember_token_expires_at = 2.weeks.from_now.utc #remember token lasts 2 weeks
    self.remember_token            = encrypt("#{email}--#{remember_token_expires_at}")
    save(false)
  end

  def forget_me
    self.remember_token_expires_at = nil
    self.remember_token            = nil
    save(false)
  end
  
  def valid_invite_code?(code)
    code == invite_code
  end
  
  def invite_code
    Digest::SHA1.hexdigest("#{self.id}--#{self.email}--#{self.salt}")
  end
  
  def reset_password
     new_password = newpass(8)
     self.password = new_password
     self.password_confirmation = new_password
     return self.valid?
  end

  def newpass( len )
     chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
     new_password = ""
     1.upto(len) { |i| new_password << chars[rand(chars.size-1)] }
     return new_password
  end

#Helper Methods

  def avatar_photo_url(size = nil)
    if avatar
      avatar.public_filename(size)
    else
      case size
        when :thumb
          AppConfig.photo['missing_thumb']
        else
          AppConfig.photo['missing_medium']
      end
    end
  end

  def self.return_array_of_similar_elements(a1, a2)
    array = []
    a1.each do |item|
      if a2.include?(item)
        array << item
      end
    end
    array.uniq!
    array
  end

  def self.convert_user_id_array_into_id_array(array)
    array.flatten!
    new_array = []
    array.each do |x|
      new_array << x.user_id
    end
    new_array
  end

  def convert_object_array_into_ids(array)
    array.flatten!
    new_array = []
    array.each do |x|
      new_array << x.id
    end
    new_array
  end
  

#TODO ORGANIZE!!!!!!!!!

  # override activerecord's find to allow us to find by name or id transparently
  def self.find(*args)
    if args.is_a?(Array) and args.first.is_a?(String) and (args.first.index(/[a-zA-Z\-_]+/) or args.first.to_i.eql?(0) )
      find_by_login_slug(args)
    else
      super
    end
  end
  
  def self.find_by_activity(options = {})
    options.reverse_merge! :limit => 30, :require_avatar => true, :since => 7.days.ago   
    
    activities = Activity.since(options[:since]).find(:all, 
      :select => '*, count(*) as count', 
      :group => "activities.user_id", 
      :conditions => "#{options[:require_avatar] ? ' users.avatar_id IS NOT NULL' : nil}", 
      :order => 'count DESC', 
      :joins => "LEFT JOIN users ON users.id = activities.user_id",
      :limit => options[:limit]
      )
    activities.map{|a| find(a.user_id) }
  end  
    
  def self.paginated_users_conditions_with_search(params)
    search = prepare_params_for_search(params)

    metro_areas, states = find_country_and_state_from_search_params(search)
    
    cond = build_conditions_for_search(search)
    return cond, search, metro_areas, states
  end  

  def self.search(query, options = {})
    with_scope :find => { :conditions => build_search_conditions(query) } do
      find :all, options
    end
  end
  
  def self.build_search_conditions(query)
    query
  end  
  
  def to_xml(options = {})
    options[:except] ||= []
    super
  end
  
  def to_param
    login_slug
  end
  
  # before filter
  
  def generate_location_data
    ##if there is no latitude:
    ##Looks for address/city/state, and if true, geocodes that.  
    ##If no address/city/state, but zipcode is true, geocodes that.
    ##If no zipcode or address, it does nothing.
    if !(self.address.nil? && self.city.nil? && self.state.nil?) && self.latitude.nil? 
      #attempt to geocode address
      location = Geocoding::get("#{self.address}, #{self.city}, #{self.state}"  )
      #if geocoding call is successful, update lat/long
      if location.status == Geocoding::GEO_SUCCESS
        lat = location[0].latitude
        long = location[0].longitude
        zipcode = location[0].address.scan(/(\d{5})/).flatten.to_s  #parses zip from address hash
        self.latitude = lat
        self.longitude = long
        self.zipcode = zipcode
      end
    #if zipcode is filled in, but lat/long is nil
    elsif !self.zipcode.nil? & self.latitude.nil?  
      coords= Zipcode.get_coordinates_from_zipcode(self.zipcode)
      if !coords.nil?
        self.latitude = coords[0]
        self.longitude = coords[1]
      else
        #TODO log error, but for testing purposes, puts error to console
        puts "zipcode #{self.zipcode} returned nil coordinates!"
      end        
    end
  end

  def generate_login_slug
    self.login_slug = self.login.gsub(/[^a-z1-9]+/i, '-')
  end

  def update_last_login
     self.update_attribute(:last_login_at, Time.now)
  end

  def network_activity(page = {}, since = 1.week.ago)
    page.reverse_merge :size => 10, :current => 1
    ids = self.friends_ids
    
    Activity.recent.since(since).by_users(ids).find(:all, :page => page)          
  end
  
  def admin?
    role && role.eql?(Role[:admin])
  end

  def moderator?
    role && role.eql?(Role[:moderator])
  end

  def member?
    role && role.eql?(Role[:member])
  end
  
  def male?
    gender && gender.eql?(MALE)
  end
  
  def female
    gender && gender.eql?(FEMALE)    
  end

  ## GC specific before_filters ##

  def charity?
    role && role.eql?(Role[:charity])
  end

  def promoter?
    role && role.eql?(Role[:promoter])
  end

  def elite_user?
    role.eql?(Role[:member]) && elite_status==TRUE
  end

  protected

    def make_activation_code
      self.activation_code = Digest::SHA1.hexdigest( Time.now.to_s.split(//).sort_by {rand}.join )
    end

    # before filters
    def encrypt_password
      return if password.blank?
      self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--") if new_record?
      self.crypted_password = encrypt(password)
    end

    def whitelist_attributes
      self.login = self.login.strip
      self.about_me = white_list(self.about_me )
    end
  
    def password_required?
      crypted_password.blank? || !password.blank?
    end


end
