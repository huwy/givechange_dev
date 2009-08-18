class Zipcode < ActiveRecord::Base

  def self.get_coordinates_from_zipcode(zipcode)
    location = Zipcode.find_by_zipcode(self.zipcode)
    if !location.nil?
      lat = location.latitude
      long = location.long
      coords = [lat, long] 
    else
      #TODO log error
      coords = []
    end
    coords
  end
  

end
