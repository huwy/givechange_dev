require 'ym4r/google_maps/geocoding'

class Venue < ActiveRecord::Base

  has_many :favorites
  has_many :events
  has_many :favorite_customers, :through => :favorites, :source => :user

  has_enumerated :classification
  has_enumerated :region

  acts_as_mappable :default_units => :miles, 
                   :default_formula => :sphere, 
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  
  validates_length_of :discount, :maximum => 50
  validates_length_of :name, :maximum => 50
  validates_presence_of :zipcode, :with => /^\d{5}$/
  
  after_create :generate_location_data

  def coordinates
    if !self.latitude.nil?
      return [self.latitude, self.longitude]
    else
      return []
    end
  end

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
