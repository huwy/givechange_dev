class CreateCharities < ActiveRecord::Migration
  def self.up
    create_table :charities do |t|
      t.column :name, :string
      t.column :created_at, :datetime
      t.column :updated_at, :datetime
      t.column :user_id, :integer

      t.column :homepage_url, :string
      t.column :address, :string
      t.column :city, :string
      t.column :state, :string
      t.column :zipcode, :string
      t.column :latitude, :float
      t.column :longitude, :float
      t.column :phone_number, :integer
      t.column :contact_email, :string
      
      t.column :mission, :text
      t.column :programs, :text
      t.column :income, :integer
      t.column :scope_id, :integer
      t.column :category_id, :integer
      
      t.column :rating_gc, :float, :default => 0.0
      t.column :rating_great_np, :float, :default => 0.0
      t.column :rating_guidestar, :float, :default => 0.0
      
      #Stats
      t.column :latest_feedback_date, :datetime
      t.column :unfinished_pledge_count, :integer, :default => 0
      t.column :unfinished_pledges_total_amount, :integer, :default => 0
      t.column :donation_count, :integer, :default => 0
      t.column :donation_total_amount, :integer, :default => 0
      t.column :volunteer_request_count, :integer, :default => 0
      t.column :supporter_count, :integer, :default => 0
      
      #Youtube Info
      t.column :youtube_username, :string
      t.column :youtube_password, :string
      
      #Twitter Info
      t.column :twitter_username, :string
      t.column :twitter_password, :string
    end   
  end
      

  def self.down
    drop_table :charities
  end
end
