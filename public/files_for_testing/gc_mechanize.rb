
#returns an array of strings containing user info for first page.  Input parameters must be strings.
def create_array_of_user_info(amount, comments, fname, lname, address1, address2, city, state, zipcode, phone, email)
  info = [amount, comments, fname, lname, address1, address2, city, state, zipcode, phone, email]
  info
end

#returns an array of strings containing user payment info for second page.  Input parameters must be strings. ccExpMo must be the integer value of the month.  ccExpYr is the last two digits of the expire year.
def create_array_of_payment_info(ccNumber, cwNumber, ccType, ccExpMo, ccExpYr, billingAdd1, billingAdd2, billingCity, billingState, billingZip)
  info = [ccNumber, cwNumber, ccType, ccExpMo, ccExpYr, billingAdd1, billingAdd2, billingCity, billingState, billingZip]
  info
end

def icaFormFirst(array_of_info)

  agent = WWW::Mechanize.new

  page = agent.get('https://www.givedirect.org/give/givefrm.asp?CID=8501')

  d_form = page.form('donation')

  d_form.amt = donation_amount
  d_form.Comments= array_of_info[1]
  d_form.dnrfirst = array_of_info[2]
  d_form.dnrlast = array_of_info[3]
  d_form.dadd1 = array_of_info[4]
  d_form.dadd2 = array_of_info[5]
  d_form.dcity = array_of_info[6]
  d_form.dstate = array_of_info[7]
  d_form.dzip = array_of_info[8]
  #As for the "country " input form, for now, we'll stick to the U.S.
  d_form.dphone = array_of_info[9]
  d_form.demail = array_of_info[10]
  page = d_form.submit
  pp page
end

def icaFormSecond(array_of_info)

  agent = WWW::Mechanize.new
  page = agent.get('https://www.givedirect.org/give/givefrm.asp?sb=2&CID=11314&AVS=')

  d_form = page.form('donation')
  
  d_form.ccard = array_of_info[1]
  d_form.csc = array_of_info[2]
  #to choose user's credit card option:
  case array_of_info[3]
    when "visa"
      option = "Visa"
    when "mastercard"
      option = "MasterCard"
    when "americanexpress"
      option = "AmericanExpress"
  end
  d_form.field_with(:name => 'ccard').options[option].select
  d_form.field_with(:name => 'ExpMon').options[ccExpMo].select
  d_form.field_with(:name => 'ExpYear').options[ccExpYr].select
  d_form.CC_Addr = array_of_info[6]
  d_form.CC_Addr2 = array_of_info[7]
  d_form.CC_CC_city = array_of_info[7]
  d_form.CC_State = array_of_info[7]
  d_form.CC_Zip = array_of_info[7]
  d_form.CC_Country = "United States"
  
  page = d_form.submit
  pp page
end

#Now, for the tests.

require 'rubygems'
require 'mechanize'

#set the user info
amount =    "10"
comments =  "givechange"
fname =     "Jared"
lname =     "Goodner"
address1=   "283 24th ave"
address2=   ""
city=       "San Francisco"
state=      "CA"
zipcode=    "94121"
phone=      "3059786705"
email=      "jrgoodner@igivechange.org"

ccNumber=     "1111111111111111"
cwNumber=     "123"
ccType=       "visa"
ccExpMo=      "3"
ccExpYr=      "10"
billingAdd1=  "283 24th ave"
billingAdd2=  ""
billingCity=  "San Francisco"
billingState= "CA"
billingZip=   "94121"

#create the first form's info array
first_form_info = create_array_of_user_info(amount, comments, fname, lname, address1, address2, city, state, zipcode, phone, email)

#create the second form's info array
second_form_info = create_array_of_payment_info(ccNumber, cwNumber, ccType, ccExpMo, ccExpYr, billingAdd1, billingAdd2, billingCity, billingState, billingZip)

#fill and submit the first form
page = icaFormFirst(first_form_info)

#fill and submit the second form
#icaFormSecond(second_form_info)




