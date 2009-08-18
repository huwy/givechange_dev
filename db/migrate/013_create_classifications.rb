class CreateClassifications < ActiveRecord::Migration
  def self.up
    create_table :classifications do |t|
      t.column :name, :string
    end

    Classification.enumeration_model_updates_permitted = true
    Classification.create(:name => 'Art Gallery')
    Classification.create(:name => 'Bar')    
    Classification.create(:name => 'Comedy Club')
    Classification.create(:name => 'LGBT')
    Classification.create(:name => 'Music')   
    Classification.create(:name => 'Lounge')
    Classification.create(:name => 'Museum')    
    Classification.create(:name => 'Nightclub')
    Classification.create(:name => 'Active')
    Classification.create(:name => 'Spa/Salon')  
    Classification.create(:name => 'Yoga')
    Classification.create(:name => 'Restaurant')              
    Classification.enumeration_model_updates_permitted = false

  end

  def self.down
    drop_table :classifications
  end
end
