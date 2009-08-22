class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.column :name, :string
      t.column :created_at, :datetime
      t.column :updated_at, :datetime
      t.column :user_id, :integer
      t.column :start_time, :datetime
      t.column :end_time, :datetime
      t.column :description, :text
      t.column :metro_area_id, :integer
      t.column :location, :string
      t.column :cost, :float
      t.column :discount, :string, :default => "No Discount at this Time"
      

      #stats
      t.column :buzz_count, :integer, :default => 0
      t.column :rsvp_count, :integer, :default => 0
    end
  end

  def self.down
    drop_table :events
  end
end
