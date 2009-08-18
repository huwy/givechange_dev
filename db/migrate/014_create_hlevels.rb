class CreateHlevels < ActiveRecord::Migration
  def self.up
    create_table :hlevels do |t|
      t.column :nccs_code, :string
      t.column :keywords, :text
      t.column :count, :integer, :default => 0    
      t.column :headline_id, :integer
    end   
  end
      

  def self.down
    drop_table :hlevels
  end
end
