class CreateRegions < ActiveRecord::Migration
  def self.up
    create_table :regions do |t|
      t.column :name, :string
    end

    Role.enumeration_model_updates_permitted = true
    Role.create(:name => 'sf')
    Role.create(:name => 'stl')    
    Role.create(:name => 'la')
    Role.create(:name => 'nyc')
    Role.create(:name => 'chi')
    Role.create(:name => 'mia')                 
    Role.enumeration_model_updates_permitted = false
  end

  def self.down
    drop_table :regions
  end

end
