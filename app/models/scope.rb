class Scope < ActiveRecord::Base
  acts_as_enumerated
  validates_presence_of :type
end

