class CreateCategories < ActiveRecord::Migration
  def self.up
    
    create_table :categories do |t|
      t.column :name, :string
      t.column :parent_id, :integer
      t.column :created_at, :datetime
    end
  end

  def self.down
    drop_table :categories
  end
end
