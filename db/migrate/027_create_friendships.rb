class CreateFriendships < ActiveRecord::Migration
  def self.up
    create_table :friendships, :force => true do |t|
      t.column :friend_id, :integer
      t.column :user_id, :integer
      t.column :initiator, :boolean, :default => false
      t.column :created_at, :datetime
      t.column :friendship_status_id, :integer
      t.column :body, :text    
    end
    add_index :friendships, ["friendship_status_id"], :name => "index_friendships_on_friendship_status_id"
    add_index :friendships, ["user_id"], :name => "index_friendships_on_user_id"
  end

  def self.down
    drop_table :friendships
    remove_index :friendships, ["friendship_status_id"], :name => "index_friendships_on_friendship_status_id"
    remove_index :friendships, ["user_id"], :name => "index_friendships_on_user_id"    
  end

end
