class CreateDigs < ActiveRecord::Migration
  def self.up
    create_table :digs do |t|
      t.column :user_id, :integer
      t.column :event_id, :integer
      t.column :venue_id, :integer
      t.column :created_at, :datetime
    end
  end

  def self.down
    drop_table :digs
  end
end
