class CreateClassImages < ActiveRecord::Migration
  def self.up
    create_table :class_images do |t|
        t.column :type, :string
    
      #common attributes
      
        t.column :filename, :string
        t.column :width, :integer
        t.column :height, :integer
        t.column :content_type, :string
        t.column :size, :integer
        t.column :attachable_type, :string
        t.column :attachable_id, :integer
        t.column :updated_at, :datetime
        t.column :created_at, :datetime
        t.column :thumbnail, :string
        t.column :parent_id, :integer
        
      # attributes for type=eventImage
        t.column :event_id, :integer
        
      #attributes for type = charityImage
        t.column :charity_id, :integer
        
    end
  end

  def self.down
    drop_table :class_images
  end
end

