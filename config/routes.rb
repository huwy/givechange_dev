ActionController::Routing::Routes.draw do |map|

  #map.resources :donations

 #map.resources :charities

  #map.resources :venues
  
  #map.resources :profile

  map.home '',
           :controller => "homepage",
           :action => "index"
  
  # Profile mappings
  
  map.profile "profile/",
            :controller => "profile",
            :action => "show"
  map.profile_nonprofit_updates "profile/non_profit_updates",
            :controller => "profile",
            :action => "charity_updates"
  map.profile_account_history "profile/account_history",
            :controller => "profile",
            :action => "account_history"
  map.profile_friends "profile/friends",
            :controller => "profile",
            :action => "friends"
  map.profile_venues "profile/favorite_venues",
            :controller => "profile",
            :action => "venues"
  map.profile_inbox "profile/inbox",
            :controller => "profile",
            :action => "inbox_messages"
  map.profile_inbox_friends "profile/friend_requests",
            :controller => "profile",
            :action => "inbox_friendships"  

  #Give mappings
  
  map.give_non_profits "give/non_profits",
            :controller => "charities",
            :action => "index"
  map.give_non_profit "give/non_profits/:id",
            :controller => "charities",
            :action => "show"
  map.give_non_profit_supporters "give/non_profits/supporters/:id",
            :controller => "charities",
            :action => "supporters"
  map.give_non_profit_media "give/non_profits/media/:id",
            :controller => "charities",
            :action => "photos_videos"
  map.give_non_profit_offers "give/non_profits/offers/:id",
            :controller => "charities",
            :action => "needs_offers"
  map.give_non_profit_updates "give/non_profits/updates/:id",
            :controller => "charities",
            :action => "charity_updates"

  #Community mappings

  map.community_people "community/people",
            :controller => "community",
            :action => "people"
  map.community_places "community/places",
            :controller => "community",
            :action => "places"
  map.community_person "community/people/:id",
            :controller => "community",
            :action => "person"
  map.community_place "community/place/:id",
            :controller => "venues",
            :action => "show"
  map.community_place_media "community/place/media/:id",
            :controller => "venues",
            :action => "photos_and_videos"
  map.community_place_who_likes_it "community/place/media/who_digs_it/:id",
            :controller => "venues",
            :action => "who_likes_it"
  
  #Resource mappings

  map.resources :users, :only => [:new, :create, :update, :destroy]

  map.resources :charities, :only => [:new, :create, :update, :destroy]

  map.resources :venues, :only => [:new, :create, :update, :destroy]

  #map.resources :events, :only => [:new, :create, :update, :destroy]






  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing the them or commenting them out if you're using named routes and resources.
  

  
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
