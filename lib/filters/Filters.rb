module Filters

  #zipcode is integer, as is proximity.  if proximity.nil?, default to 10mi. radius
  def self.filter_for_zipcode(array, zipcode, proximity)
    if (proximity == 0 || proximity.nil?)
      proximity = 10
    end
    location = Zipcode.find_by_zipcode(zipcode)
    location = [location.latitude, location.longitude]
    class_name = array[0].class
    if class_name == User
      near_objects = User.find(:all, :origin => location, :within => proximity)
    elsif class_name == Venue
      near_objects = Venue.find(:all, :origin => location, :within => proximity)
    elsif class_name == Charity
      near_objects = Charity.find(:all, :origin => location, :within => proximity)
    else
      []
    end
    filtered_objects = return_array_of_similar_elements(near_objects, array)
  end

#USER FILTERS

  #DEFAULTS TO MAX OF 50 RETURNED USERS
  def self.filter_users_by_cause(array, cause_ids)
    unless cause_ids.nil? || cause_ids.empty?
      max = 50
      users =[]
      cause_ids.each do |c|
        cause = Cause.find(c.to_i)
        users << cause.contributors
      end
      users.uniq!
      users.flatten!
      users = users.slice(0,max)
      return Filters.return_array_of_similar_elements(users, array)
    else
      return array
    end
  end

#CHARITY FILTERS

  #causes is array of integers representing cause_id's
  def self.filter_charities_by_cause(array, causes)
    charities=[]    
    causes.each do |cause|
      charities << Cause.find(cause).charities
    end
    charities.flatten!
    charities.uniq!
    filtered_charities = return_array_of_similar_elements(charities, array)
  end

  #if you want to filter all charities, charity_array = []
  def self.filter_charities_by_rating(charity_array, ratings)
    filtered_charities = []
    unless charity_array == []    
      charity_array.each do |c|
        if ratings.include?(c.rating_gc.to_i)
          filtered_charities << c
        end
      end
    else
      ratings.each do |r|
        filtered_charities << Charity.find(:all, :conditions => ["rating_gc >= ? and rating_gc < ?", r.to_s, (r+1).to_s])
      end
      filtered_charities.flatten!
      filtered_charities.uniq!
    end
    filtered_charities
  end

  #if don't want to use charity_array, use empty array [].  scope_array should be string (names) or id (ints)
  def self.filter_charities_by_scope(scope_array, charity_array)  
    scoped_charities = []
    scope_array.each do |s|
      scoped_charities << Charity.find(:all, :conditions => ['scope_id = ?',Scope[s].id])
    end
    scoped_charities.flatten!
    scoped_charities.uniq!
    if charity_array.empty?
      return scoped_charities
    else
      filtered_charities = return_array_of_similar_elements(scoped_charities, charity_array)
    end
    filtered_charities
  end

  #return charities from charity_array with income less than parameter
  def self.filter_charities_by_organizational_income(charity_array, income)
    charities_filtered =[]   
    unless charity_array.empty?  
      charity_array.each do |c|
        if c.income < income
          charities_filtered << c
        end
      end
    else
      charity_filtered = Charity.find(:all, :conditions=> ["income < ?", income])
    end
    charity_filtered
  end

  def self.filter_charities_by_category(charity_array, categories)
    charities_filtered = []
    unless charity_array.empty?
      charity_array.each do |c|
        if categories.include?(c.category_id)
          charities_filtered << c
        end
      end
      charities_filtered.flatten!
      charities_filtered.uniq!
    else
      categories.each do |cat_id|
        charities_filtered << Charity.find(:all, :conditions => ["category_id = ?",cat_id])
      end
      charities_filtered.flatten!
      charities_filtered.uniq!
    end
    charities_filtered
  end

#VENUE FILTERS

  def self.filter_venues_by_classification(array, classifications)
    unless classifications.nil? || classifications.empty?
      venues = []    
      array.each do |v|
        if classifications.include?(v.classification_id.to_s) #.to_s is a hack to conform to classifications string array
          venues << v
        end
      end
      return venues
    else
      return array
    end
  end
  
#HELPERS

  def self.return_array_of_similar_elements(a1, a2)
    array = []
    a1.each do |item|
      if a2.include?(item)
        array << item
      end
    end
    array.uniq!
    array
  end

  def return_array_of_similar_elements_for_many_arrays(array)
      if array.empty?
        return []
      end
      length = array.length
      if length%2 == 0 #even
        #find 2 middle arrays
        low_c_index = length/2 -1
        high_c_index = length/2
      else #odd
        #find 2 first arrays
        low_c_index = 0
        high_c_index = 1
      end
      low_c = array[low_c_index]
      high_c = array[high_c_index]
      #create array with similar elements
      similar_array =  return_array_of_similar_elements(low_c, high_c)
      #delete 2 middle arrays
      array.delete_at(low_c_index)
      array.delete_at(high_c_index-1) 
      unless array.empty?
        #replace em with your similar_array
        new_array = array << similar_array
        #run the method again with new_array
        return_array_of_similar_elements_for_many_arrays(new_array)
      else
        return similar_array
      end
  end



end
