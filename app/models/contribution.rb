class Contribution < ActiveRecord::Base

  validates_presence_of :user_id, :charity_id
  
  belongs_to :charity
  belongs_to :user
  belongs_to :cause
  belongs_to :article

  before_save :add_cause
  after_save :update_charity_supporter_count
  after_save :update_user

  def self.get_latest_activity(count)
    #get (count) latest contributions
    #TODO
    #add condition => followed_up = 1 (for payed donations)
    contributions = Contribution.find(:all, :order => "created_at DESC", :limit => count)
    contributions
  end

  protected

  def update_charity_supporter_count
    #update_supporter_count increases self.supporter_count by one if user has never created a donation to self.  Nothing
    #happens if user has prior donation.
    id = self.user_id
    charity = self.charity
    contributions = charity.contributions
    contributions.each do |contribution|
      if contribution.user_id = id
        return
      end
    end
    charity.supporter_count = charity.supporter_count + 1
    charity.save
  end

  #In case contribution has no specified cause, this adds a cause to every donation, to assist in associating users with
  #particular causes
  def add_cause
    if self.cause.nil?
      charity= self.charity
      #gets a random cause from charity's list of causes
      if cause = charity.get_one_cause
        self.cause = cause
      else
        puts "charity has no cause"
      end
    end
  end
  
  def update_user
    user = self.user
    cause = self.cause
    if !user.causes.include?(cause)
      user.causes << cause
    end
  end


end
