class CreateCategories < ActiveRecord::Migration
  def self.up
    #drop CommEng's categories table--related to forums (posts belong to categories)
    drop_table :categories
    
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
