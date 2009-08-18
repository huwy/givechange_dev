class Volunteer < Contribution

  after_save :update_volunteer_related_attributes

  protected
  
  def update_volunteer_related_attributes
    charity = self.charity    
    charity.volunteer_request_count += 1
    charity.save
  end  

end
