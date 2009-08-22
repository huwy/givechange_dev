class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      #personal info
      t.column :login, :string
      t.column :first_name, :string
      t.column :last_name, :string
      t.column :email, :string
      t.column :address, :string
      t.column :city, :string
      t.column :state, :string
      t.column :zipcode, :integer
      t.column :latitude, :float
      t.column :longitude, :float
      t.column :birthday, :date
      t.column :gender, :string
      t.column :about_me, :text
      t.column :telephone_number, :integer

      #GC stuff
      t.column :created_at, :datetime
      t.column :activated_at, :datetime
      t.column :updated_at, :datetime
      t.column :avatar_id, :integer
      t.column :login_slug, :string
      t.column :crypted_password, :string, :limit => 40
      t.column :salt, :string, :limit => 40
      t.column :remember_token, :string
      t.column :remember_token_expires_at, :datetime
      t.column :activation_code, :string, :limit=>40
      t.column :activated_at, :datetime
      t.column :last_login_at, :datetime
      t.column :profile_public, :boolean, :default => 1
      t.column :role_id, :integer, :default => 5
      t.column :sb_last_seen_at, :datetime

      #GC stats
      t.column :points, :integer, :default => 0
      t.column :donations_total, :float, :default => 0
      t.column :donation_count, :integer, :default => 0
      
      #API stuff
      t.column :youtube_token, :string     
    end
  end

  def self.down
    drop_table :users
  end

end
