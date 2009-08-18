##BEFORE RUNNING THIS:
###require libraries
###run this command: Watir::Browser.start("https://adwords.google.com/select/KeywordToolExternal")
###fill out captcha, hit submit

require 'rubygems'
require 'hpricot'
require 'watir'
require 'lib/causeLink/modules/keyword_gen'
require 'lib/causeLink/modules/csv_gen'

#global vars
keyword_count = 20

levels_array = Hlevel.find(:all, :conditions=> id >10)

KeywordGen.run_keyword_gen(keyword_count, levels_array)

#create a csv record of current Hlevels table
levels = Hlevel.find(:all)
CSVGen.create_levels_csv(levels, "csv_levels_table_7.8.09.txt")


