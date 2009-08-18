class Classification < ActiveRecord::Base
 
  acts_as_enumerated
  validates_presence_of :name  

  has_many :events
  has_many :venues

end
