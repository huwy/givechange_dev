class CreateStatistics < ActiveRecord::Migration

  def self.up
    create_table :statistics do |t|
      t.column :total_charity_count, :integer
      t.column :total_venue_count, :integer
    end

    create_table :top_twenties do |t|
      t.column :popular_charities, :integer
      t.column :featured_charities, :integer
      t.column :alphabetical_charities, :integer
      t.column :popular_venues, :integer
      t.column :featured_venues, :integer
      t.column :alphabetical_venues, :integer
    end 

    #add column to charity and venue => TRUE if donated/favorited today, FALSE otherwise  
    #to be zeroed nightly
    add_column :charities, :any_action_today, :boolean, :default => 0
    add_column :venues, :any_action_today, :boolean, :default => 0
      
  end

  def self.down
    drop_table :statistics
    drop_table :top_twenties
    remove_column :charities, :any_action_today
    remove_column :venues, :any_action_today
  end

end
