class CreateCoupons < ActiveRecord::Migration
  def self.up
    create_table :coupons, :force => true do |t|
      
      #coupon (original) data      
      t.column :original, :boolean, :default => true
      t.column :venue_id, :integer
      t.column :cost, :integer
      t.column :discount, :string
      t.column :description, :text

      #coupon_for_user data
      t.column :original_coupon_id, :integer
      t.column :user_id, :integer
      t.column :coupon_pin, :integer
      t.column :validation_pin, :integer
      t.column :redeemed, :boolean, :default => 0

      t.column :updated_at, :datetime
      t.column :created_at, :datetime

    end
  end

  def self.down
    drop_table :coupons
  end

end
