class CreateCauses < ActiveRecord::Migration
  def self.up
    create_table :causes do |t|
      t.column :cause, :string
      t.column :created_at, :datetime
    end
    create_table :causes_charities, :id => false do |t|
      t.column :cause_id, :integer
      t.column :charity_id, :integer
    end
    create_table :causes_events, :id => false do |t|
      t.column :cause_id, :integer
      t.column :event_id, :integer
    end
    
  end

  def self.down
    drop_table :causes
    drop_table :causes_charities
    drop_table :causes_events
  end
  
end
