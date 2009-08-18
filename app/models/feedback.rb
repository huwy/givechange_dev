class Feedback < ActiveRecord::Base
  
  belongs_to :charity

  validates_presence_of :body
  validates_presence_of :charity 

end
