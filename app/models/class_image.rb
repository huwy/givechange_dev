class ClassImage < ActiveRecord::Base

  belongs_to :attachable, :polymorphic => true  
  has_attachment :content_type => ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/gif', 'image/png', 'image/x-png'],
                 :storage => :file_system,
                 :max_size =>3.megabytes,
                 :thumbnails => { :thumb=> '100', :medium => '400' },
                 :processor => 'ImageScience'

  validates_as_attachment
  belongs_to :user
 
end
