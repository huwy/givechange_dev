class SocialCategory < ActiveRecord::Base

  has_many :events
  has_many :venues

end
