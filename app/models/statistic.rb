class Statistic < ActiveRecord::Base

  def self.total_charity_count
    #return get_statistic_object.total_charity_count
    return Charity.count
  end

  def self.total_venue_count
    #return get_statistic_object.total_venue_count
    return Venue.count
  end

  def self.get_statistic_object
    return Statistic.find(1)
  end

end
