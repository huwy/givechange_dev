require 'lib/filters/Filters'

class CommunityController < BaseController

  layout 'application_community'

  def places
    @venues = Venue.find(:all)
    #random venue    
    @featured_venue = Venue.find(rand(Statistic.total_venue_count-1)+1)
    @classifications = Classification.find(:all)
    @current_user_location == FALSE
    if (@user = current_user) && !(@user.latitude.nil?)
      @current_user_location == TRUE
    end
  end

  def people
    if (@user = current_user) && !(@user.latitude.nil?)
      @featured_people = User.find(:all, :origin => [@user.latitude, @user.longitude] , :within => 5, :order => "created_at DESC", :limit => 3)
    else
      @featured_people = User.find(:all, :limit => 3)  
    end    
    #TODO this should find all people
    @people = User.find(:all)
    @causes = Cause.find(:all, :limit => 10)
  end

  def place
    @place = Venue.find(params[:id])
  end

  def person
    @person = User.find(params[:id])
  end

  def i_like_it
    if @user = current_user
      #create favorite object
    else
      #display popup the tells em to login/sign up
    end
  end

#FILTER ACTIONS

  def search_people
    search = params[:person_search]
    @people= User.filter_by_name(search,nil)
  end

  def filter_people
    #Collect all params
    #convert zipcode into int    
    if (params[:zipcode] != "") && (params[:zipcode].match(/^\d{5}$/))  #if zipcode aint empty, and it's 5 digits long:
      zipcode = zipcode.to_i
    else
      zipcode = 0
    end
    if params[:cause]
      causes_ids = params[:cause]
    else
      causes_ids = []
    end
    if current_user
      area = [!(params[:area].nil? || params[:area].empty?), current_user.zipcode]
    else
      area = [FALSE, nil]
    end
    if params[:type]
      type = params[:type]
    else
      type = []
    end
    #Filter all people objects
    @people = filter_people_helper(zipcode, causes_ids, area, type)
  end

  def filter_places
    #Collect all params:
    venues = Venue.find(:all)
    if (params[:zipcode] != "") && (params[:zipcode].match(/^\d{5}$/))  #if zipcode aint empty, and it's 5 digits long:
      zipcode = zipcode.to_i
    else
      zipcode = 0
    end
    if proximity = params[:proximity] 
        proximity.collect {|x| x.to_i }.sort {|x,y| y <=> x } #to_i and sorted DESC
        proximity = proximity[0]
    else
        proximity = 10
    end
    if classifications = params[:classification]
      []
    else 
      classifications = nil
    end
    if places = params[:place]
      []
    else 
      places = nil
    end
    #filter all venues
    @venues = filter_places_helper(zipcode, proximity, classifications, places)
  end

#SORTERS

#HOW TO IMPLEMENT????????????????????????????????

#HELPERS

  def filter_places_helper(zipcode, proximity, classifications, places)
    filtered = FALSE
    results = []    
  ####ANY ZIPCODE TO FILTER?####
    if !(zipcode == 0)
      filtered = TRUE
      unless results.empty? #unless the results array is empty, filter the array
        results = Filters.filter_for_zipcode(results, zipcode, proximity[0])
      else #results array is empty, so filter all venues
        results = Filters.filter_for_zipcode(Venue.find(:all), zipcode, proximity[0])
      end
    end
  ####ANY MY_PLACES OR FRIENDS_PLACES TO FILTER?####
    if !places.nil?
      filtered = TRUE
      places.each do |place|
        if place == "my_places" #if filtering by current_user favorite places
          unless results.empty? #unless the results array is empty, filter the array
            results = return_array_of_similar_elements(results, current_user.favorite_venues)
          else #results array is empty, so return all user's favorite places
            results = current_user.favorite_venues
          end          
        elsif place == "my_friends_places"
          unless results.empty? #unless the results array is empty, filter the array
            results = return_array_of_similar_elements(results, current_user.friends_favorite_venues)
          else #results array is empty, so return all user's friend's favorite places
            results = current_user.friends_favorite_venues
          end          
        end
      end
    end 
  ####ANY classifications TO FILTER WITH?####
    if !classifications.nil?
      filtered = TRUE
      unless results.empty? #unless the results array is empty, filter the array
          results = Filters.filter_venues_by_classification(results, classifications)#NOTE THAT THIS PASSES AN ARRAY OF STRINGS
      else #results array is empty, so return all venues filtered for classification
          results = Filters.filter_venues_by_classification(Venue.find(:all), classifications)
      end 
    end
  #if array hasn't been filtered, return all venues
    if filtered == FALSE
      return Venue.find(:all)
    end
    results   
  end

  def filter_people_helper(zipcode, causes, area, type)
    filtered = FALSE 
    results = []
  ####ANY ZIPCODE TO FILTER?####
    if !(zipcode == 0)
      filtered = TRUE
      unless results.empty? #unless the results array is empty, filter the array
        results = Filters.filter_for_zipcode(results, zipcode, nil)
      else #results array is empty, so filter all venues
        results = Filters.filter_for_zipcode(User.find(:all), zipcode, nil)
      end
    end  
    if !causes.empty?
      filtered = TRUE
      unless results.empty? #unless the results array is empty, filter the array
        results = Filters.filter_users_by_cause(results, causes)
      else #results array is empty, so filter all venues
        results = Filters.filter_users_by_cause(User.find(:all), causes)
      end
    end   
    if area[0]
      filtered = TRUE
      unless results.empty? #unless the results array is empty, filter the array
        results = Filters.filter_for_zipcode(results, area[1], proximity)
      else #results array is empty, so filter all venues
        results = Filters.filter_for_zipcode(User.find(:all), area[1], proximity)
      end
    end   
    if !type.empty?
      filtered = TRUE
      unless !current_user
        type.each do |type|
          if type == "my_friends"
            unless results.empty? #unless the results array is empty, filter the array
              results = return_array_of_similar_elements(results, current_user.return_friends)
            else #results array is empty, so filter all venues
              results = current_user.return_friends
            end
          elsif type == "similar_interests"
            unless results.empty? #unless the results array is empty, filter the array
              results = User.return_array_of_similar_elements(results, current_user.return_users_like_me)
            else #results array is empty, so filter all venues
              results = current_user.return_users_like_me
            end
          end
        end      
      end  
    end
    if filtered == FALSE
      return User.find(:all)
    end
    results
  end

end
