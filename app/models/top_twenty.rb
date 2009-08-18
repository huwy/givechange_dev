class TopTwenty < ActiveRecord::Base  

  def self.charities_by_popularity
    charity_ids = []
    self.find(:all).each {|row| charity_ids << row.popular_charities }
    turn_ids_into_charities(charity_ids)
  end

  def self.charities_by_featured
    charity_ids = []
    self.find(:all).each {|row| charity_ids << row.featured_charities }
    turn_ids_into_charities(charity_ids)
  end

  def self.charities_by_alphabetical
    charity_ids = []
    self.find(:all).each {|row| charity_ids << row.alphabetical_charities }
    turn_ids_into_charities(charity_ids)
  end

  def self.venues_by_popularity
    venue_ids = []
    self.find(:all).each {|row| venue_ids << row.popular_venues }
    turn_ids_into_venues(venue_ids)
  end

  def self.venues_by_featured
    venue_ids = []
    self.find(:all).each {|row| venue_ids << row.featured_venues }
    turn_ids_into_venues(venue_ids)
  end

  def self.venues_by_alphabetical
    venue_ids = []
    self.find(:all).each {|row| venue_ids << row.alphabetical_venues }
    turn_ids_into_venues(venue_ids)
  end

protected
 
  def turn_ids_into_charities(id_array)
    charities = []
    id_array.each do |id|
      charities << Charity.find(id)
    end
    charities
  end

  def turn_ids_into_venues(id_array)
    venues = []
    id_array.each do |id|
      venues << Venue.find(id)
    end
    venues
  end
  

end
