require 'active_record/fixtures'

class AddData < ActiveRecord::Migration
  def self.up
    directory = File.join(File.dirname(__FILE__), "data")
    Fixtures.create_fixtures(directory, "events")
    Fixtures.create_fixtures(directory, "charities")
    Fixtures.create_fixtures(directory, "users")
    Fixtures.create_fixtures(directory, "causes")
    Fixtures.create_fixtures(directory, "venues")
    Fixtures.create_fixtures(directory, "categories")
    Fixtures.create_fixtures(directory, "coupons")
    Fixtures.create_fixtures(directory, "feedbacks")
  
    
    
    #causes
    cEducation=Cause.find_by_cause('education')
    cArts=Cause.find_by_cause('arts')
    cCulture=Cause.find_by_cause('culture')
    cHumanities=Cause.find_by_cause('humanities')
    cHealth=Cause.find_by_cause('health')
    cOverfishing=Cause.find_by_cause('overfishing')
    cConservation=Cause.find_by_cause('conservation')
    
    #charities
    c1=Charity.find_by_name("Alliance For School Choice")
    c2=Charity.find_by_name("San Francisco Education Fund")
    c3=Charity.find_by_name("National Foundation for Advancement in the Arts")
    c4=Charity.find_by_name("San Francisco Girls Chorus")
    c5=Charity.find_by_name("Society For Womens Health Research")
    c6=Charity.find_by_name("Haight Ashbury Free Clinics")
    c7=Charity.find_by_name("American Fisheries Society")
    c8=Charity.find_by_name("San Francisco Estuary Project")
    c9=Charity.find_by_name("Grassroots International")
    c10=Charity.find_by_name("The Bay Institute")
    
    #users
    user1 = User.find_by_login("alevin3")
    user2 = User.find_by_login("eunji")
    user3 = User.find_by_login("jrgoodner")
    user4 = User.find_by_login("jbryant2")
    user5 = User.find_by_login("jnguyen5")
    user6 = User.find_by_login("kking4")
    user7 = User.find_by_login("mericsson")
    user8 = User.find_by_login("pssamant")
    user9 = User.find_by_login("rseawell1")
    user10 = User.find_by_login("shiv10")
    user11 = User.find_by_login("ramy11")
    
    #events
    event1 = Event.find_by_name("Carnaval")
    event2 = Event.find_by_name("KamiNational Foundation for Advancement in the Artskaze Heart by City Circus")
    event3 = Event.find_by_name("Giants Game")
    event4 = Event.find_by_name("Makossa")
    event5 = Event.find_by_name("Happy Hour and Fundraiser to Save Senior Lunch")
    event6 = Event.find_by_name("SF International Arts Festival")
    event7 = Event.find_by_name("Sprite Slam Dunk Showdown 2009")
    event8 = Event.find_by_name("We Resist")
    
  
    #associate causes with charities
    c1.add_cause(cEducation)
    c2.add_cause(cEducation)
    c3.add_cause(cArts)
    c3.add_cause(cCulture)
    c3.add_cause(cHumanities)
    c4.add_cause(cArts)
    c4.add_cause(cCulture)
    c4.add_cause(cHumanities)
    c5.add_cause(cHealth)    
    c6.add_cause(cHealth)
    c7.add_cause(cOverfishing)
    c8.add_cause(cOverfishing)
    c9.add_cause(cConservation)
    c10.add_cause(cConservation)

    #create donations
    users = User.find(:all)
    charities = Charity.find(:all)
    donationCount = 0
    while (donationCount <= 50)    
      user = users[ rand(users.length)-1 ]
      charity = charities[ rand(charities.length)-1 ]
      p = charity.create_donation(user, 5 + rand(51))
      p.followed_up = 1
      p.payed = 1
      p.save
      donationCount +=1
    end
       
    #create RSVPs
    users = User.find(:all)
    events = Event.find(:all)
    for user in users
      rsvpCount = 0
        while rsvpCount < 4
          event = events[ rand(events.length)-1 ]
          event.create_rsvp(user)
          rsvpCount +=1
        end
    end

    #update location info for charities and venues    
    venues = Venue.find(:all)
    #if it hasn't been filled in 
    if venues[0].latitude.nil?
      venues.each do |v|
        coord = Geocoding::get("#{v.address}, #{v.city}, #{v.state}")[0].latlon
        v.latitude = coord[0]
        v.longitude = coord[1]
        v.save
      end
    end

    charities = Charity.find(:all, :conditions => 'id >1')  
    #if it hasn't been filled in      
    if charities[0].latitude.nil?
      charities.each do |c|
        coord = Geocoding::get("#{c.address}, #{c.city}, #{c.state}")[0].latlon
        c.latitude = coord[0]
        c.longitude = coord[1]
        c.save
      end
    end

    #add coupons to each user
    users = User.find(:all)
    coupons = Coupon.find(:all)
    coupons_length = coupons.length
    users.each do |u|
      count = 1
      while count <= 3 
        random_coupons_index = rand(coupons_length - 1)
        c = coupons[random_coupons_index]
        u.purchase_coupon(c.id)
        count +=1
      end
    end
    
    #generate login_slugs and location data for Users
    users=User.find(:all)
    users.each do |u|
      u.password = "whatever"
      u.password_confirmation = "whatever"
      u.generate_location_data
      u.generate_login_slug
      u.save
    end
  
  end
  

  def self.down
  end
end
