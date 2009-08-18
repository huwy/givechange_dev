class CreateContributions < ActiveRecord::Migration
  def self.up
    create_table :contributions, :force => true do |t|
      #commons
      t.column :type, :string
      t.column :user_id, :integer
      t.column :charity_id, :integer
      t.column :cause_id, :integer
      t.column :article_id, :integer
      t.column :created_at, :datetime

      #pledge
      t.column :amount, :float, :default => 0.0 
      t.column :followed_up, :integer, :default => 0
      t.column :followed_up_at, :datetime  
      t.column :payed, :integer, :default => 0

      #volunteer
      t.column :hours, :integer, :default => 0
    end
  end

  def self.down
    drop_table :donations
  end
end
