class Event < ActiveRecord::Base

  has_many  :images, :as => :attachable, :dependent => :destroy, :class_name => "EventImage"
  has_many :rsvps
  has_many :digs
  
  has_and_belongs_to_many :causes
  
  has_one :portrait, :class_name =>'EventImage',:dependent => :destroy

  has_enumerated :classification

  validates_presence_of :name, :identifier => 'validates_presence_of_name'
  validates_presence_of :start_time
  validates_presence_of :end_time
  validates_presence_of :user

  belongs_to :user
  belongs_to :metro_area

  attr_protected :user_id
  
  named_scope :upcoming, :order => 'start_time DESC'
  
  def time_and_date
    if spans_days?
      string = "#{start_time.strftime("%B %d")} to #{end_time.strftime("%B %d %Y")}"
    else
      string = "#{start_time.strftime("%B %d, %Y")}, #{start_time.strftime("%I:%M %p")} - #{end_time.strftime("%I:%M %p")}"
    end
  end

  def location
    metro_area ? metro_area.name : ''
  end
  
  def spans_days?
    (end_time - start_time) >= 86400
  end
  
  def create_rsvp(user)
    #harmless if user is already rsvp'd
    if !user.is_rsvp(self)
      #create RSVP
      rsvp = Rsvp.new
      rsvp.event = self
      rsvp.user = user
      rsvp.save
      #make associations
      self.add_rsvp(rsvp)
      user.add_rsvp(rsvp)
      self.save
    end
  end

  def remove_rsvp(user)
  end
  
  def add_cause(cause)
    causes << cause
  end
  
  def add_rsvp(rsvp)
    rsvps << rsvp
  end
 
  def add_buzz(user)
    if user.has_buzzed(self)
      return
    end
	
	buzz = Buzz.new
	user.add_buzz(buzz)
	buzzes << buzz
  end

  def remove_cause(cause)
    causes.delete(cause)
  end
  
  def remove_rsvp(rsvp)
    rsvps.delete(rsvp)
  end
  
  #######################Static Methods########################
  
  #def self.search_by_location(option, q)
    #Same method as for Charities
    #option can be zipcode, region, state
    #this will implement the google maps geocoding API, which I'll create a shared set of helper methods
  #end
  
  def self.find_events_by_promotor(name)
   @promoter = User.find(:first, :conditions => ["login= ? and role_id = ? ", name , 3])
   @promoter.events
  end
  
  def self.get_random_events(count)
    eventCount = Event.find(:all).length
    events = []
    while events.length < count
      randomEvent =Event.find( 1+rand(eventCount) )
      events << randomEvent
      events.to_set
      events = events.uniq
    end
    events
  end
  
  ####################get Methods############################
  
  def get_all_rsvps
    self.rsvps
  end
  
  def get_random_rsvps(count)
    totalRsvps = self.rsvps
    rsvps = []
    while rsvps.length < count && totalRsvps.length > 0
      rsvp = totalRsvps[ rand(totalRsvps.length-1) ]
      rsvps << rsvp
      totalRsvps = totalRsvps-[rsvp]
    end
    rsvps
  end  

  def find_random_rsvp_users(count)
    rsvps = self.get_random_rsvps(count)
    users = []    
    for rsvp in rsvps
      users << rsvp.user 
    end
  users   
  end
  
  def get_rsvps_by_day(day, month, year)
  end
  
  #################Helper Methods############################
  
  def portrait_photo_url(size = nil)
    if portrait
      portrait.public_filename(size)
    else
      case size
        when :thumb
          AppConfig.event_image['missing_thumb']
        else
          AppConfig.event_image['missing_medium']
      end
    end
  end
  
  #def isUserRsvp(user)
    
  #end

  protected
  def validate
    errors.add("start_time", " must be before end time") unless start_time && end_time && (start_time < end_time)
  end

end
