class Donation < Contribution


  after_save :update_charity_attributes_new_donation
  before_destroy :update_charity_attributes_destroy_donation

  def pay_donation
    if self.followed_up != 1
      self.followed_up = 1
      self.followed_up_at = Time.now
      self.save
    else
      #TODO
      #record an error, display a flash
    end
  end
  
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
  
  def update_charity_attributes_new_donation
    charity = self.charity
    charity.donation_count +=1
    charity.donation_total_amount += self.amount
    charity.save
  end

  def update_charity_attributes_destroy_donation
    charity = self.charity
    charity.donation_count -=1
    charity.donation_total_amount -= self.amount
    charity.save
  end


end