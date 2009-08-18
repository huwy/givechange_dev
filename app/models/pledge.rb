class Pledge < Donation

  validates_numericality_of :amount
  validate :donation_must_be_greater_than_or_equal_to_floor

  protected
    def donation_must_be_greater_than_or_equal_to_floor
      errors.add(:amount, 'must be greater than $5') if amount.nil? || amount < AppConfig.donation_floor
    end
  

end
