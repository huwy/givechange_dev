class CreateCauselinkData < ActiveRecord::Migration

  require 'fastercsv'

  def self.up
    #create array from csv file in lib/causeLink/csv
    levels_array = FasterCSV.read("#{RAILS_ROOT}/lib/causeLink/csv/csv_levels_table_7.8.09.txt")
    levels_array.each do |level|
      new_level = Hlevel.new
      new_level.nccs_code = level[1]
      new_level.keywords = level[2]
      if new_level.nccs_code.length > 1
        headline_id = level[1].match(/./).to_s
        #find parent headline
        parent = Hlevel.find_by_nccs_code(headline_id)
        new_level.headline_id = parent.id
      end
      new_level.save!
    end
  end

  def self.down
    Hlevel.delete_all
  end

end

