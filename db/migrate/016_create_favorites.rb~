class CreateFavorites < ActiveRecord::Migration
  def self.up
    #drop CommEng favorites table
    drop_table :favorites

    create_table :favorites do |t|
      t.column :user_id, :integer
      t.column :venue_id, :integer
      t.column :created_at, :datetime
    end
  end

  def self.down
    drop_table :favorites
  end
end
