class CreateRsvps < ActiveRecord::Migration
  def self.up
    create_table :rsvps do |t|
      t.column :user_id, :integer
      t.column :event_id, :integer
      t.column :created_at, :datetime
    end
  end

  def self.down
    drop_table :rsvps
  end
end
