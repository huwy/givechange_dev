require 'fastercsv'

class CreateZipcodes < ActiveRecord::Migration
  def self.up
    create_table :zipcodes do |t|
      t.column  :zipcode, :integer
      t.column  :city, :string
      t.column  :state, :string
      t.column  :latitude, :float
      t.column  :longitude, :float 
      t.column  :timezone, :integer
      t.column  :dst, :integer
    end
  
  #add zipcode data
    FasterCSV.foreach("lib/zipcodes/zipcode_california.csv") do |zip|
      array = zip
      Zipcode.create(:zipcode => array[0].to_i, :city => array[1].to_s, :state => array[2].to_s, :latitude => array[3].to_f, :longitude => array[4].to_f, :timezone => array[5].to_i, :dst => array[6].to_i)
    end

  end

  def self.down
    drop_table :zipcodes
  end

end
