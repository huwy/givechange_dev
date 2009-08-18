class ProfileController < BaseController

  #before_filter :require_current_user

  layout 'application_profile'
  
  def charity_updates
    #for testing purposes ONLY!
    @user = User.find(params[:id])
    @updated_charities = @user.get_charities_sorted_by_feedback_date
    @updated_charities_for_filter = @updated_charities
    @updated_charities_for_filter.slice!(3)
    @updates = []
    @updated_charities.each do |c|
      @updates << c.get_latest_feedback(1)
    end
    @updates.flatten!
  end

  def inbox_messages
    #for testing purposes ONLY!
    @link_inbox_messages = url_for(:controller => 'profile', :action => 'inbox_messages')
    @link_inbox_friendships = url_for(:controller => 'profile', :action => 'inbox_friendships')
    @user = User.find(params[:id])
    @unread_messages = Message.find(:all, :conditions => "read_at is null", :order => "created_at DESC")
    @read_messages = Message.find(:all, :conditions => "read_at is not null", :order => "created_at DESC")
    @all_messages = @unread_messages + @read_messages
    @total_inbound_messages = @all_messages.length
    @sent_messages = Message.find_all_by_sender_id(@user.id, :order => "created_at DESC")
    @pending_friendships= @user.pending_friendships
  end

  def inbox_friendships
    @link_inbox_messages = url_for(:controller => 'profile', :action => 'inbox_messages')
    @link_inbox_friendships = url_for(:controller => 'profile', :action => 'inbox_friendships')
    @user = User.find(params[:id])
    @unread_messages = Message.find(:all, :conditions => "read_at is null", :order => "created_at DESC")
    @pending_friendships= @user.pending_friendships
  end

  def venues
    #for testing purposes ONLY!
    @user = User.find(params[:id])
    #@venues = @user.dug_venues
    @venues = [Venue.find(2), Venue.find(6)]
    puts @venues
    @featured_venues = Venue.featured_venues_random
  end

  def friends
    #for testing purposes ONLY!
    @user = User.find(params[:id])
    friend_ids = @user.friends_ids
    friends = []
    friend_ids.each do |id|
      friends << User.find(id)
    end
    @friends = friends
    #TODO
    @people_like_me = []
  end

  def account_history
    #for testing purposes ONLY!
    @user = User.find(params[:id])
  end

  def show
    #for testing purposes ONLY!
    @user = User.find(params[:id])
    @redemptions = Coupon.find(:all, :conditions=>['user_id=?',@user], :order => "created_at DESC", :limit=>3)
  end
  

protected

  def verify_login
    unless current_user
      redirect_to :controller => 'sessions'
    end
  end

end


