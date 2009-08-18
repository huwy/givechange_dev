class WidgetController < BaseController

  def firstPage
    #########use some ajax to enable submit button based on whether charitybox checked, email filled, pledge/vol checked.
    puts "inside widget controller"
    #@user needs to be assigned to the true user!!!!!!!!!!!!
    @user = "jrgoodner"
    @causes = []
    if (params[:url])
      puts "params[:url] are in!!!!!!!!!!!"
      doc = Hpricot(open(params[:url]))
      causeTags = doc.at("meta[@name='keywords']")['content'].split(',') #+ (doc/"title").first.inner_html.split(' ')
      for causeTag in causeTags
        puts causeTag
        causes = Cause.find_all_by_cause(causeTag)
        if causes
          @causes.concat(causes)
        end
      end
    end
    puts "@causes:"
    puts  @causes
    @chosenCause =rand_with_range(@causes)
    puts "@chosenCause=" 
    puts @chosenCause
    #find 2 highest ranked charities associated with @chosenCause
    @charities = @chosenCause.find_highest_ranked_charity(2)
    render(:layout => "layouts/widget")
  end
  
  def secondPage
    #testing params
    puts "inside widgetSubmit action"
    puts "email: " + params[:email].to_s
    puts "chosenCharity: " + params[:chosenCharity].to_s
    if params[:volunteer]    
      puts "volunteerin!"
    end
    if params[:pledge] 
      puts "pledgein!"
    end
    #begin method
    @email = params[:email].to_s
    @donor = User.find_by_email(@email)
    @chosenCause = params[:cause]
    @cause = Cause.find_by_cause(@chosenCause)
    @volunteer = 0
    @donate = 0
    @charityName = params[:chosenCharity].to_s
    @chosenCharity = Charity.find_by_name(@charityName)
    if params[:pledge] 
      #create pledge to @chosenCharity
    end
    if params[:volunteer]
      #create volunteer object for @chosenCharity
    end
    events = Event.get_random_events(2)
    puts events
    @event1 = events[1]
    @event2= events[0]
	  render(:layout => "layouts/widget")
  end

#helper methods

   def rand_with_range(values = nil)
     if values.respond_to? :sort_by
       values.sort_by { rand }.first
     else
       rand(values)
     end
   end

end
