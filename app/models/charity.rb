require 'ym4r/google_maps/geocoding'

class Charity < ActiveRecord::Base
  
  validates_uniqueness_of :name
  validates_presence_of :name, :identifier => 'validates_presence_of_name'
  validates_presence_of :zipcode, :with => /(^\d{5}$)|(^\d{5}-\d{4}$)/

  belongs_to :user
  
  has_many  :images, :as => :attachable, :dependent => :destroy, :class_name => "CharityImage"
  has_many :contributions
  has_many :contributors, :through => :contributions, :source => :user
  
  has_and_belongs_to_many :causes
  belongs_to :category
  
  has_one :portrait, :class_name =>'CharityImage',:dependent => :destroy
  has_many :feedbacks

  has_enumerated  :scope
  
  acts_as_mappable :default_units => :miles, 
                   :default_formula => :sphere, 
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  after_create :generate_location_data

#DONATION RELATED
  
  def get_all_contributions_by_causes(cause_array)
    contributions =[]    
    cause_array.each do |cause|
      contributions << Contribution.find(:all, :conditions=> ["charity_id = :charity_id and cause_id= :cause_id",{:charity_id => self.id, :cause_id => cause.id}])
    end
    contributions.flatten!
    contributions.uniq!
    contributions
  end

  def get_followed_up_contributions
    donations = self.contributions.find(:all, :conditions => "followed_up = 1")
    donations
  end  

  def get_donations_by_date_descending
    donations = self.donations
    donations.sort_by {|d| d.created_at }
    donations
  end
  
  def find_random_contributors(count)
    users = []
    number_of_total_contributors = self.contributors.length
    while (users.length < count) & (users.length < number_of_total_contributors)
      users << self.contributors[rand]
      users.uniq!
    end
    users      
  end

#CAUSE RELATED

  def add_cause(cause)
    if self.cause_is_not_already_associated(cause)
      causes << cause
      return cause
    end
  end
  
  def remove_cause(cause)
    causes.delete(cause)
  end
  
 def has_causes(causes)
    for cause in causes
      if not self.causes.include?(cause)
        return false
      end
    end
    true
  end

#CONTRIBUTION RELATED
  
  def create_volunteer(user)
    #create volunteer object
    contribution = Volunteer.new(:user => user, :charity => self)
    if contribution.save
      #create associations
      user.add_contribution(contribution)
      self.add_contribution(contribution)
      return contribution
    end
  end

  def create_donation(user, amount)
    #create donation object
    contribution = Donation.new(:user => user, :charity => self, :amount => amount)
    if contribution.save
      #create associations
      user.add_contribution(contribution)
      self.add_contribution(contribution)
      return contribution
    end
  end

#FEEDBACK RELATED

  def get_latest_feedback(count)
    f = self.feedbacks
    f = f.sort_by{|d| d.updated_at }
    f.slice!(count-1)
    f
  end

#SORTING METHODS

  #to sort, while in the controller, append this to your charities_array
  ## .sort_by { |c| c.attribute }

 ##########################Helper Methods#################################

  def return_array_of_similar_elements(a1, a2)
    array = []
    a1.each do |item|
      if a2.include?(item)
        array << item
      end
    end
    array.uniq!
    array
  end

  def portrait_photo_url(size = nil)
    if portrait
      portrait.public_filename(size)
    else
      case size
        when :thumb
          AppConfig.charity_image['missing_thumb']
        else
          AppConfig.charity_image['missing_medium']
      end
    end
  end

  def get_one_cause
    if self.causes
      return causes.rand
    else
      return nil
    end
  end

protected

  def add_contribution(contribution)
    contributions << contribution
  end
  
  def remove_contribution(contribution)
    contributions.delete(contribution)
  end

  def cause_is_not_already_associated(cause_to_be_added)
    causes = self.causes
    causes.each do |cause|
      return FALSE if (cause == cause_to_be_added) 
    end
    return TRUE
  end

  def generate_location_data
    location = Zipcode.find_by_zipcode(self.zipcode)
    if !location.nil?
      lat = location.latitude
      long = location.longitude
      self.latitude = lat
      self.longitude = long    
    else
      location = Geocoding::get("#{self.address}, #{self.city}, #{self.state}")
      if location.status == Geocoding::GEO_SUCCESS
:GEO_SUCCESS
        self.latitude = location[0].latitude
        self.longitude = location[0].longitude
      else
        #TODO create error message if geocoding call doesn't go thru
      end
    end
  end


end
