class Category < ActiveRecord::Base

  has_many :charities
  belongs_to :parent, :class_name => "Category"
  acts_as_enumerated

  validates_presence_of :name

  #if category has a parent, returns parent, otherwise, returns false
  def has_parent?
    if !self.parent.nil?
      return self.parent
    else
      return false
    end
  end  

  def cascade_parents_by_eldest
    cascade = []
    category = self
    while !category.parent.nil?
      cascade << category
      category = category.parent
    end
    cascade << category
    cascade.reverse
  end

  
    

    
end
