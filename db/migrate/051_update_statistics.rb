class UpdateStatistics < ActiveRecord::Migration
  def self.up
    charity_count = Charity.find(:all).length
    venue_count = Venue.find(:all).length
    s = Statistic.create(:total_charity_count => charity_count, :total_venue_count => venue_count)
  end

  def self.down
  end
 
end
