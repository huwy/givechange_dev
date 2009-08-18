module CharitiesHelper

  def get_contribution_user(donation)
    donation.user
  end

  def get_contribution_charity(donation)
    donation.charity
  end

  def format_time(donation)
    date_time = donation.created_at.getlocal
    string = date_time.strftime("%H")
    if string.to_i > 12
      hour = string.to_i - 12
      string = "#{hour}pm" + date_time.zone
    elsif string.to_i == 12
      string = "Noon " + date_time.zone
    elsif string.to_i == 0
      string = "Midnight " + date_time.zone
    else
      string = string + "am " + date_time.zone
    end
    string
  end    

end
