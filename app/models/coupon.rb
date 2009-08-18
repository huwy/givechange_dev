class Coupon < ActiveRecord::Base
  
  belongs_to :venue
  validates_presence_of :venue
  validates_presence_of :discount

  def self.return_coupons_by_venue(venue)
    self.find_by_venue_id(venue.id)
  end

  #return copy of original coupon in memory (needs  to be saved)
  #this is for use when creating a CouponForUser
  def return_copy_for_user(user_id)
    #find original coupon
    coupon = self
    #create empty couponForUser object
    c = CouponForUser.new
    #fill it up
    c.original = FALSE
    c.venue_id = coupon.venue_id
    c.cost =  coupon.cost
    c.original_coupon_id = coupon.id
    c.discount = coupon.discount
    c.description = coupon.description
    c.user_id = user_id
    c
  end

end
