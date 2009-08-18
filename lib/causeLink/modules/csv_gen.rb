module CSVGen

  require 'fastercsv'
  
  #create hlevels csv from levels array
  def self.create_levels_csv(levels, filename)
    FasterCSV.open("#{RAILS_ROOT}/lib/causeLink/#{filename}", "w")  do |csv|
      levels.each do |level|          
        csv << [level.id, level.nccs_code, level.keywords]
      end
    end
  end

  #create headlines csv from array of headlines
  def self.create_headlines_csv(headlines)
    FasterCSV.open("#{RAILS_ROOT}/lib/causeLink/csv_headlines.txt", "w")  do |csv|
      headlines.each do |headline|
        string = ""    
        headline.each do |index|
          string += index.to_s + ","
        end
        string.sub!(/,$/, "")
        csv << string
      end
    end
  end

  #create subheadlines csv from array of subheadlines
  def self.create_subheadlines_csv(subheadlines)
    FasterCSV.open("#{RAILS_ROOT}/lib/causeLink/csv_subheadlines.txt", "w")  do |csv|
      subheadlines.each do |subheadline|
        subheadline.each do |letter|
          string = ""
          letter.each do |index|
            string += index.to_s + ","
          end
          string.sub!(/,$/, "")
          csv << string
        end
      end
    end
  end

end

