module KeywordGen

require 'rubygems'
require 'hpricot'
require 'watir'
require 'lib/causeLink/modules/csv_gen'

  def self.run_keyword_gen(keyword_count, levels_array)
    ff = Watir::Browser.start("https://adwords.google.com/select/KeywordToolExternal")
    puts "Have you filled out the captcha (y)?"
    STDOUT.flush()
    if 'y' == STDIN.gets.chomp
      levels_array.each do |level|
        expand_level_keywords_and_save_object(level,ff,keyword_count)
      end
    end
  end

  def expand_level_keywords_and_save_object(level, ff, keyword_count)
    puts "Beginning to find keywords for level: '#{level.nccs_code}'..."
    #turn keyword string into array
    original_keyword_array = level.keywords.scan(/\w+/)
    new_keyword_array = []
    final_keyword_array = []
    original_keyword_array.each do |keyword|
      new_keyword_array << self.return_related_keywords(ff,keyword, keyword_count)
    end
    new_keyword_array = return_array_without_digits(new_keyword_array)
    final_keyword_array << original_keyword_array
    final_keyword_array << new_keyword_array
    level.keywords = final_keyword_array.join(" ")
    level.save!
    puts "Level '#{level.nccs_code}' (db id# #{level.id}) has been saved!"
  end

  def self.return_related_keywords(ff, keyword, count)
    ff.refresh()
    #this method requires watir to have opened the keyword site already w/this command (and filled out captcha):
    #ff = Watir::Browser.start("https://adwords.google.com/select/KeywordToolExternal")
    ff.text_field(:id, "kpVariationsTool-keyword").set("#{keyword}")
    puts "seed keyword: #{keyword.upcase}"
    #click on submit button
    ff.button(:id, "kpKeywordPlanner-getKeywordsButton").click
    puts "Submit button pressed, waiting 10 secs to load"
    sleep 10
    puts "Scraping for keywords related to: #{keyword.upcase}"
    keyword_orig = keyword
    #Inhale HTML with Hpricot
    parsed = Hpricot(ff.html)
    #look for the 4th occurence of tr class="notKeyword" and make note of its xpath.
    #for debugging purposes, here is every occurence of tr.notKeyword:
    #############
    #parsed.search("tr.notKeyword").each do |key|
    #   puts "== Found a tr.notKeyword =="
    #   puts "xpath: "+ key.xpath.to_s
    #   puts "inner_html: \n" + key.inner_html
    #end
    #############
    results = parsed.search("tr.notKeyword")
    #grab xpath of 4th result (which is the last row prior to desired keywords)
    #if that 4th result doesn't exist...
    if results[3].nil?
      puts "\n---------------Couldn't find xpath: tr.notKeyword---------------"
      puts "Close all FireFox windows and open a new window, type 'enter', then press enter"
      STDOUT.flush()
      if 'enter' == STDIN.gets.chomp
        puts "Opening Google Keyword Generator Site..."
        ff = Watir::Browser.start("https://adwords.google.com/select/KeywordToolExternal")
        puts "Fill out Captcha, submit it, type 'enter', then press enter"
        STDOUT.flush()
        if 'enter' == STDIN.gets.chomp
          return_related_keywords(ff, keyword_orig, count)
        end
      end
    else
      xpath = results[3].xpath
    end
    #grab the tr number from the last row prior: xpath => scan array[0] => .to_i 
    xpath_row_prior = xpath.scan(/\d+/)[0].to_i
    counter = 1
    keywords = []
    #while loop to grab inner_html from each row we desire, and add it to keywords array
    puts "******Grabbing the keywords******"
    while counter <= count
      #rowNumber of interest = xpath_row + counter
      rowNumber = counter + xpath_row_prior
      #replace "rowNumber" in xpath_dynamic with var rowNumber
      current_xpath = xpath.sub(/\d+/, rowNumber.to_s)
      #append current_xpath with further xpath
      current_xpath = current_xpath + "/td.c0"
      keyword = (parsed/current_xpath).inner_html
      puts keyword
      keywords << keyword
      counter += 1
    end
    puts "******Finished grabbing keywords related to: #{keyword_orig.upcase}*******"
    keywords
  end

  def create_keywords_from_paragraph(stop_words, paragraph)
    hotWords = []
    words = paragraph.scan(/\w+/)
    for word in words
      word = word.downcase
      unless stop_words.include?(word) 
        hotWords << word
      end
    end
    hotWords
  end

  def return_array_without_digits(array)
    array.each do |word|    
      word_orig = word  
      word = word_orig.gsub(/\d+/, "")
    end
    array
  end

end
