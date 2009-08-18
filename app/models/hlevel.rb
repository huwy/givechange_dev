class Hlevel < ActiveRecord::Base

  belongs_to  :headline,
              :class_name => "Hlevel",
              :foreign_key => "headline_id"

  has_many    :subheadlines,
              :class_name => "Hlevel",
              :foreign_key => "headline_id"


end
