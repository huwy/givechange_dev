class CreateScopes < ActiveRecord::Migration
  def self.up
    create_table :scopes do |t|
      t.column :name, :string
    end

    Scope.enumeration_model_updates_permitted = true
    Scope.create(:name => 'local')    
    Scope.create(:name => 'national')    
    Scope.create(:name => 'international')               
    Scope.enumeration_model_updates_permitted = false
  end

  def self.down
    drop_table :scopes
  end

end
