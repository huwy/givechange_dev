class CreateVenues < ActiveRecord::Migration
  def self.up
    create_table :venues do |t|
      t.string    :name
      t.datetime  :created_at
      t.datetime  :updated_at
      t.integer   :user_id
      t.text    :description
      t.text    :quotation
      t.string    :homepage_url
      t.string    :address
      t.string    :city
      t.string    :state
      t.integer :zipcode
      t.float   :latitude
      t.float   :longitude
      t.string  :discount, :default => "No Discount at this Time"
      t.integer  :classification_id, :integer
      t.integer :favorite_count, :default => 0
      t.float   :yelp_rating
      t.float   :going_rating

      t.timestamps
    end
  end

  def self.down
    drop_table :venues
  end
end
