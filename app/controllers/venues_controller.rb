class VenuesController < BaseController

  layout 'application_community'

  def show
    @venue = Venue.find(params[:id])  
  end

  def photos_and_videos
    @venue = Venue.find(params[:id])
  end

  def who_likes_it
    @venue = Venue.find(params[:id])
  end  


end
