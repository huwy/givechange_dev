class CreateMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.column :sender_id, :integer
      t.column :recipient_id, :integer
      t.column :sender_deleted, :boolean, :default => false
      t.column :recipient_deleted, :boolean, :default => false  
      t.column :subject, :string
      t.column :body, :text
      t.column :read_at, :datetime
      t.column :created_at, :datetime
      t.column :updated_at, :datetime
    end
  end

  def self.down
    drop_table :messages
  end

end
