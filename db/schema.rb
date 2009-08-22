# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 51) do

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at"
  end

  create_table "causes", :force => true do |t|
    t.string   "cause"
    t.datetime "created_at"
  end

  create_table "causes_charities", :id => false, :force => true do |t|
    t.integer "cause_id"
    t.integer "charity_id"
  end

  create_table "causes_events", :id => false, :force => true do |t|
    t.integer "cause_id"
    t.integer "event_id"
  end

  create_table "charities", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "homepage_url"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "phone_number"
    t.string   "contact_email"
    t.text     "mission"
    t.text     "programs"
    t.integer  "income"
    t.integer  "scope_id"
    t.integer  "category_id"
    t.float    "rating_gc",                       :default => 0.0
    t.float    "rating_great_np",                 :default => 0.0
    t.float    "rating_guidestar",                :default => 0.0
    t.datetime "latest_feedback_date"
    t.integer  "unfinished_pledge_count",         :default => 0
    t.integer  "unfinished_pledges_total_amount", :default => 0
    t.integer  "donation_count",                  :default => 0
    t.integer  "donation_total_amount",           :default => 0
    t.integer  "volunteer_request_count",         :default => 0
    t.integer  "supporter_count",                 :default => 0
    t.string   "youtube_username"
    t.string   "youtube_password"
    t.string   "twitter_username"
    t.string   "twitter_password"
    t.boolean  "any_action_today",                :default => false
  end

  create_table "class_images", :force => true do |t|
    t.string   "type"
    t.string   "filename"
    t.integer  "width"
    t.integer  "height"
    t.string   "content_type"
    t.integer  "size"
    t.string   "attachable_type"
    t.integer  "attachable_id"
    t.datetime "updated_at"
    t.datetime "created_at"
    t.string   "thumbnail"
    t.integer  "parent_id"
    t.integer  "event_id"
    t.integer  "charity_id"
  end

  create_table "classifications", :force => true do |t|
    t.string "name"
  end

  create_table "contributions", :force => true do |t|
    t.string   "type"
    t.integer  "user_id"
    t.integer  "charity_id"
    t.integer  "cause_id"
    t.integer  "article_id"
    t.datetime "created_at"
    t.float    "amount",         :default => 0.0
    t.integer  "followed_up",    :default => 0
    t.datetime "followed_up_at"
    t.integer  "payed",          :default => 0
    t.integer  "hours",          :default => 0
  end

  create_table "coupons", :force => true do |t|
    t.boolean  "original",           :default => true
    t.integer  "venue_id"
    t.integer  "cost"
    t.string   "discount"
    t.text     "description"
    t.integer  "original_coupon_id"
    t.integer  "user_id"
    t.integer  "coupon_pin"
    t.integer  "validation_pin"
    t.boolean  "redeemed",           :default => false
    t.datetime "updated_at"
    t.datetime "created_at"
  end

  create_table "digs", :force => true do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.integer  "venue_id"
    t.datetime "created_at"
  end

  create_table "events", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.text     "description"
    t.integer  "metro_area_id"
    t.string   "location"
    t.float    "cost"
    t.string   "discount",      :default => "No Discount at this Time"
    t.integer  "buzz_count",    :default => 0
    t.integer  "rsvp_count",    :default => 0
  end

  create_table "favorites", :force => true do |t|
    t.integer  "user_id"
    t.integer  "venue_id"
    t.datetime "created_at"
  end

  create_table "feedbacks", :force => true do |t|
    t.integer  "charity_id"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "friendship_statuses", :force => true do |t|
    t.string "name"
  end

  create_table "friendships", :force => true do |t|
    t.integer  "friend_id"
    t.integer  "user_id"
    t.boolean  "initiator",            :default => false
    t.datetime "created_at"
    t.integer  "friendship_status_id"
    t.text     "body"
  end

  add_index "friendships", ["friendship_status_id"], :name => "index_friendships_on_friendship_status_id"
  add_index "friendships", ["user_id"], :name => "index_friendships_on_user_id"

  create_table "hlevels", :force => true do |t|
    t.string  "nccs_code"
    t.text    "keywords"
    t.integer "count",       :default => 0
    t.integer "headline_id"
  end

  create_table "invitations", :force => true do |t|
    t.string   "email_addresses"
    t.string   "message"
    t.string   "user_id"
    t.datetime "created_at"
  end

  create_table "messages", :force => true do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.boolean  "sender_deleted",    :default => false
    t.boolean  "recipient_deleted", :default => false
    t.string   "subject"
    t.text     "body"
    t.datetime "read_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "regions", :force => true do |t|
    t.string "name"
  end

  create_table "roles", :force => true do |t|
    t.string "name"
  end

  create_table "rsvps", :force => true do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at"
  end

  create_table "scopes", :force => true do |t|
    t.string "name"
  end

  create_table "sessions", :force => true do |t|
    t.string   "sessid"
    t.text     "data"
    t.datetime "updated_at"
    t.datetime "created_at"
  end

  add_index "sessions", ["sessid"], :name => "index_sessions_on_sessid"

  create_table "statistics", :force => true do |t|
    t.integer "total_charity_count"
    t.integer "total_venue_count"
  end

  create_table "top_twenties", :force => true do |t|
    t.integer "popular_charities"
    t.integer "featured_charities"
    t.integer "alphabetical_charities"
    t.integer "popular_venues"
    t.integer "featured_venues"
    t.integer "alphabetical_venues"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "zipcode"
    t.float    "latitude"
    t.float    "longitude"
    t.date     "birthday"
    t.string   "gender"
    t.text     "about_me"
    t.integer  "telephone_number"
    t.datetime "created_at"
    t.datetime "activated_at"
    t.datetime "updated_at"
    t.integer  "avatar_id"
    t.string   "login_slug"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.string   "activation_code",           :limit => 40
    t.datetime "last_login_at"
    t.boolean  "profile_public",                          :default => true
    t.integer  "role_id",                                 :default => 5
    t.datetime "sb_last_seen_at"
    t.integer  "points",                                  :default => 0
    t.float    "donations_total",                         :default => 0.0
    t.integer  "donation_count",                          :default => 0
    t.string   "youtube_token"
  end

  create_table "venues", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.text     "description"
    t.text     "quotation"
    t.string   "homepage_url"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "zipcode"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "region_id"
    t.string   "discount",          :default => "No Discount at this Time"
    t.integer  "classification_id"
    t.integer  "integer"
    t.integer  "favorite_count",    :default => 0
    t.float    "yelp_rating"
    t.float    "going_rating"
    t.boolean  "any_action_today",  :default => false
  end

  create_table "zipcodes", :force => true do |t|
    t.integer "zipcode"
    t.string  "city"
    t.string  "state"
    t.float   "latitude"
    t.float   "longitude"
    t.integer "timezone"
    t.integer "dst"
  end

end
