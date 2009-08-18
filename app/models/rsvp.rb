class Rsvp < ActiveRecord::Base

  belongs_to :event
  belongs_to :user

  validate :rsvp_is_unique
  after_save :increase_event_rsvp_count

  protected
  
  def increase_event_rsvp_count
    e = self.event
    e.rsvp_count += 1
    e.save
  end

  def rsvp_is_unique
    if ( rsvps = Rsvp.find_all_by_event_id(event.id) )
      rsvps.each do |rsvp|
        return false if rsvp.user == user
      end
    end
  end

end
