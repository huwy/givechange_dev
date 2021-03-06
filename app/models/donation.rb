class Donation < Contribution

  validates_presence_of :amount
  
  #FIXME WHY ISN'T THIS WORKING? WON'T ENTER follow_up METHOD AT ALL.
  after_initialize :follow_up

  after_save :update_user_donations_total
  after_save :update_user_donation_count
  #after_save :update_user_points
  after_save :update_charity_donation_count
  after_save :update_charity_donation_total_amount
  after_save :save_charity
  after_save :save_user

  after_destroy :update_user_donations_total_upon_destroy
  after_destroy :update_user_donation_count_upon_destroy
  #after_destroy :update_user_points_upon_destroy
  after_destroy :update_charity_donation_count_upon_destroy
  after_destroy :update_charity_donation_total_amount_upon_destroy
  after_destroy :save_user
  after_destroy :save_charity

  def self.filter_donations_by_causes(donations, causes, count)
    for donation in donations
	    for cause in causes
          if donation.cause == cause
            donationsToReturn.push(donation)
		      end
	    end
    end
    donations.slice(0,count)
  end

  def self.filter_donations_by_user(donations, user)
    donationsToReturn = []
    for donation in donations
      if donation.user == user
	    donationsToReturn.push(donation)
	  end
	end
	donationsToReturn
  end

  def self.sort_donations_by_date_descending(donations)
    donations.sort_by {|d| d.created_at }
  end

  def self.sort_donations_by_date_ascending(donations)
    sort_donations_by_amt_descending(donations).reverse!
  end

  def self.sort_donations_by_amt_descending(donations)
    donations.sort_by {|d| d.amount }
  end

  def self.sort_donations_by_amt_ascending(donations)
    sort_donations_by_amt_descending(donations).reverse!
  end

  protected

  def follow_up
    puts "within follow_up"
    self.followed_up = 1
    self.followed_up_at = Time.now
  end

  def save_user
    self.user.save
  end

  def save_charity
    self.charity.save
  end

  #UPON CREATE
  
  def update_user_donations_total
    self.user.donations_total = self.user.donations_total + self.amount
  end
  
  def update_user_donation_count
    self.user.donation_count = self.user.donation_count + 1
  end

  #TODO what will be points value?
  #def update_user_points
  #  self.user
  #end

  def update_charity_donation_count
    self.charity.donation_count = self.charity.donation_count + 1
  end

  def update_charity_donation_total_amount
    self.charity.donation_total_amount = self.charity.donation_total_amount + self.amount
  end

  #UPON DESTROY

  def update_user_donations_total_upon_destroy
    self.user.donations_total = self.user.donations_total - self.amount
  end
  
  def update_user_donation_count_upon_destroy
    self.user.donation_count = self.user.donation_count - 1
  end

  #TODO what will be points value?
  #def update_user_points_upon_destroy
  #  self.user
  #end

  def update_charity_donation_count_upon_destroy
    self.charity.donation_count = self.charity.donation_count - 1
  end

  def update_charity_donation_total_amount_upon_destroy
    self.charity.donation_total_amount = self.charity.donation_total_amount - self.amount
  end

end
