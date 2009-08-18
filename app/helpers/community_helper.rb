module CommunityHelper
  
  def person_information_helper(user)
    friends = user.friendships.length
    events = user.digs.length
    venues = user.favorites.length
    #fundraisers = user.fundraisers.length
    array = [friends, events, venues]
    render(:partial=> "person_information", :object => array)
  end

  def date_format(date)
    date.strftime("%b, %Y")
  end

end
