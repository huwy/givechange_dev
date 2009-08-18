require 'test_helper'

#tests charity creation, create pledge and volunteer, associate cause

class CharityTest < ActiveSupport::TestCase

  fixtures :charities
  fixtures :users
  fixtures :causes

  def setup
    @user = users(:rseawell1_donor)
    @charity = charities(:alliance_for_school_choice)
    @valid_amount = 5
    @invalid_amount = 4
    @cause = causes(:humanities)
  end

  test "unique title" do  
    charity= Charity.new( :name     =>    @charity.name,
                          :user_id  =>    1,
                          :mission  =>    "Improves our nation's K-12 education by advancing systemic and sustainable public policy that empowers low-income parents to choose the best education for their children.",
                          :programs =>    "Facilitating an innovative development operation to cultivate funding for effective school choice models")
    assert !charity.save
    #refers to list of rails validations in lib/ruby/gems/1.8/activerecord-<VERSION MAY DIFFER>/lib/active_record/validations.rb
    assert_equal I18n.translate('activerecord.errors.messages.taken'), charity.errors.on(:name)
  end

  test "create valid pledge for charity" do
    donation = @charity.create_pledge(@user, @valid_amount)
    assert donation.valid?
    assert_equal @user, donation.user
    assert_equal @charity, donation.charity
    assert_equal 1, @charity.unfinished_pledge_count
    assert_equal @valid_amount, @charity.unfinished_pledges_total_amount
  end

  test "create invalid pledge for charity" do
    donation = @charity.create_pledge(@user,@invalid_amount)
    assert_nil(donation)
    assert_not_equal 1, @charity.unfinished_pledge_count
    assert_not_equal @invalid_amount, @charity.unfinished_pledges_total_amount
  end

  test "create valid volunteer for charity" do
    donation = @charity.create_volunteer(@user)
    assert_not_nil(donation)
    assert_equal @user, donation.user
    assert_equal @charity, donation.charity
    assert_equal 1, @charity.volunteer_request_count
  end

  test "add valid cause to charity" do
    result = @charity.add_cause(@cause)
    
    assert_not_nil(result)    
    assert_equal @cause, result
  end      

  test "add valid cause to charity already associated with that cause" do
    @charity.add_cause(@cause)
    result = @charity.add_cause(@cause)
    assert_nil(result, "result is nil")
  end


end
