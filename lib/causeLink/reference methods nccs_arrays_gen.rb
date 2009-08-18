####  MAKE SURE stop_words and nccs FILES ARE IN /app/causeLink  ####

require 'lib/causeLink/modules/nccs_arrays_gen.rb'
require 'lib/causeLink/modules/csv_gen.rb'
require 'rubygems'
require 'fastercsv'

#create headlines and subheadlines arrays
both_arrays = Nccs_arrays.create_headlines_and_subheadlines_arrays
headlines = both_arrays[0]
subheadlines = both_arrays[1]

#create headlines csv doc (lib/causeLink/headlines_keywords.txt)
CSVGen.create_headlines_csv(headlines, "csv_headlines.txt")

#create subheadlines csv doc (lib/causeLink/subheadlines_keywords.txt)
CSVGen.create_subheadlines_csv(subheadlines, "csv_subheadlines.txt")


