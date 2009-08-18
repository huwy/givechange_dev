class Dig < ActiveRecord::Base

  validates_uniqueness_of :dig

  belongs_to :event
  belongs_to :user
  belongs_to :venue  

end
