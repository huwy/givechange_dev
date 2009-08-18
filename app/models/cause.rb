class Cause < ActiveRecord::Base
  validates_uniqueness_of :cause

  has_and_belongs_to_many :charities
  has_and_belongs_to_many :events

  has_many :contributions

  has_many :contributors, :through => :contributions, :source => :user
  
  def find_highest_ranked_charity(count)
    puts "find_highest_ranked_charities for this cause:"
    puts self.cause
    @charities = self.charities
    puts "Charities for this cause:"
    for charity in @charities
      puts charity.name
    end
    @charities.sort_by { |charity| charity.rating_gc }
    highest_ranked_charities = @charities.slice(0,count)    
    highest_ranked_charities 
  end
  
#  def getRandomEvents(count)
#    totalEvents = self.events
#    #numberOfTotalEvents= totalEvents.length
#    totalEvents.sort_by { rand }
#    totalEvents.slice(0,count)
#  end   
  
  def self.returnAllCauses
    @causes = Cause.find(:all)
  end
  
  def addCharity(charity)
    charities << charity
  end
  
  def addEvent(event)
    events << event
  end
  

  

end
