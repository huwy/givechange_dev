class HomepageController < BaseController

  layout 'application_home'

  def index
    @image = randomly_choose_illustration
    @give_button_link = url_for(give_non_profits_url)
    @community_button_link = url_for(community_places_url)
    #find the first 10 charities in our db
    @charities = Charity.find(:all, :order => "name", :limit => 6)
    #find the first 10 venues in our db
    @venues = Venue.find(:all, :limit => 6)
    
    #instantiate map object
    @map_venues = GMap.new("map_venues_div", "map_venues")
    #instantiate map controls
    @map_venues.control_init(:small_zoom => true)
    #create markers for venues and center location for map (see helper methods)
    marker_array = create_markers(@venues)
    center_of_map = marker_array[1]
    puts "Center of map: [#{center_of_map.lat},#{center_of_map.lng}]"
    markers = marker_array[0]
    @zoom = 12
    @map_venues.center_zoom_init(center_of_map, @zoom)
    @map_venues.overlay_init(markers[0])  #temporarily initialize marker
    @map_venues.record_init(@map_venues.clear_overlays)#clear overlays and add markers by JS
    markers.each do |m| #add all markers
      @map_venues.record_init(@map_venues.add_overlay(m))
    end
  end

  def update_charities_by_alpha
    @charities = Charity.find(:all, :order => "name", :limit => 6)
  end

  def update_charities_by_popularity
    #@charities = TopTwenty.charities_by_popularity
    @charities = Charity.find(:all, :limit => 6, :order => "donation_count")
  end

  def update_charities_by_featured
    #Should return 6 featured charities
    #BUT it returns 6 random charities, until we get NIGHTLY STATISTIC UPDATES running (TOP 20 FEATURED ROW)
    charities = []
    #generate 6 random charities
    while charities.length < 6
      charities << Charity.find( rand(Charity.count-1) +1 )
      charities.uniq!
    end  
    @charities = charities
  end

  def update_venues_by_alpha
    @map_venues = Variable.new("map_venues")
    @venues = Venue.find(:all, :limit => 6, :order => "name")
    @zoom = 12
    marker_array = create_markers(@venues)
    @center_of_map = marker_array[1]
    @markers = marker_array[0]
  end

  def update_venues_by_popularity
    @map_venues = Variable.new("map_venues")
    @venues = Venue.find(:all, :limit => 6, :order => "favorite_count")
    @zoom = 12
    marker_array = create_markers(@venues)
    @center_of_map = marker_array[1]
    @markers = marker_array[0]
  end

  def update_venues_by_featured
    #Should return 6 featured charities
    #BUT it returns 6 random charities, until we get NIGHTLY STATISTIC UPDATES running (TOP 20 FEATURED ROW)
    venues = []
    #generate 6 random charities
    while venues.length < 6
      venues << Venue.find( rand(Venue.count-1) +1 )
      venues.uniq!
    end  
    @venues = venues
    @map_venues = Variable.new("map_venues")
    @zoom = 12
    marker_array = create_markers(@venues)
    @center_of_map = marker_array[1]
    @markers = marker_array[0]
  end

  protected
  
  def randomly_choose_illustration
    #to choose display image:
    image_id = rand(3)+1
    case image_id
      when 1
        #image = image1_path
      when 2
        #image = image2_path
      when 3
        #image = image3_path
      else
        #image = image4_path
    end    
    #image
  end  

  def create_markers(array)
    #takes array of anything with lat/long coords (and name attribute) and returns array = [markers_array, center]
    markers = []
    array.each do |item|
      marker = GMarker.new([item.latitude, item.longitude], :info_window => "#{item.name}", :title => "#{item.name}")
      markers << marker
    end
    center = GLatLng.new(bounding_box_center(markers))
    return [markers, center]    
  end

  def bounding_box_center(markers)
    maxlat, maxlng, minlat, minlng = -Float::MAX, -Float::MAX, Float::MAX, Float::MAX
    markers.each do |marker|
      coord = marker.point
      maxlat = coord.lat if coord.lat > maxlat
      minlat = coord.lat if coord.lat < minlat
      maxlng = coord.lng if coord.lng > maxlng
      minlng = coord.lng if coord.lng < minlng
    end
    return [(maxlat + minlat)/2,(maxlng + minlng)/2]
  end

  def update_venue_map(array)
    begin
      puts "within update_map controller method"
      unless array.empty?
        @map_venues = Variable.new("map_venues_div","map_venues")
        @venue_markers = []
        array.each do |venue|
          marker = GMarker.new([venue.latitude, venue.longitude], :info_window => "#{venue.name}", :title => "#{venue.name}")
          @venue_markers << marker
        end
        #creating center of map coordinate
        @center = GLatLng.new(bounding_box_center(@venue_markers))
      else
        puts "There are no venues in your @venues array"
        @message = "No Venues Found"
      end
    rescue Exception => exception
      @message = "Service momentarily unavailable"
    end
  end

  def update_venue_list(array)
    @venues = array
  end

  def update_charity_list(array)
    @charities = array
  end

end
