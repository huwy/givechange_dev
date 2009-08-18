require 'ym4r/google_maps/geocoding'

class Venue < ActiveRecord::Base

  has_many :favorites
  has_many :events
  has_many :favorite_customers, :through => :favorites, :source => :user

  has_enumerated :classification
  acts_as_mappable :default_units => :miles, 
                   :default_formula => :sphere, 
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  
  validates_length_of :discount, :maximum => 50
  validates_length_of :name, :maximum => 50
  validates_presence_of :zipcode, :with => /^\d{5}$/
  
  before_save :generate_location_data

  def add_event(event)
    if !self.has_event(event)
      events << event
    end
  end

  def has_event(event)
	  return events.include?(event)
  end

  def self.featured_venues_random
    #for TESTING PURPOSES ONLY
    venue_count = Statistic.total_venue_count
    venues = []
    counter = 1
    while counter <=2
      venues << Venue.find(rand(venue_count-1)+1)
      counter+=1
    end
    venues
  end

  #FILTER METHODS

  #if you don't want to use venue_array param, use nil
  def self.get_all_within_proximity(location, radius, venue_array)
    #:origin can be [lat,long] or 'address', or mappable object
    near_venues = Venue.find(:all, :origin => location, :within => radius)
    filtered_venues = []
    if venue_array.nil?
      return near_venues
    else
      venue_array.each do |v|      
        if near_venues.include?(v)
          filtered_venues << v
        end
      end
    end
    filtered_venues
  end

  def self.filter_by_classification(type, venue_array)
    #type can be the classification primary ID, or a string (corresponding with :name column)
    if venue_array.empty?
      return []
    end
    venues = []    
    venue_array.each do |v|
      if v.classification == classification[type]
        venues << v
      end
    end
    venues
  end

  def self.filter_by_name(name, venue_array)
    if venue_array.nil?
      venues = User.find(:all, :conditions => ["name like ?", "%"+name+"%"])
      return venues
    elsif venue_array.empty?
      return []
    else
      venues = []
      venue_array.each do |v|
        if v.name.match(name)
          venues << v
        end
      end
      return venues
    end
  end

protected
  
  def generate_location_data
    location = Geocoding::get("#{self.address}, #{self.city}, #{self.state}"  )
    if location.status == Geocoding::GEO_SUCCESS
      lat = location[0].latitude
      long = location[0].longitude
      self.latitude = lat
      self.longitude = long    
    else
      #TODO log error
      location = Zipcode.find_by_zipcode(self.zipcode)
      lat = location.latitude
      long = location.long
      self.latitude = lat
      self.longitude = long 
    end
  end



end
