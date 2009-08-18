class AddBodyToFriendship < ActiveRecord::Migration
  def self.up
    add_column :friendships, :body, :text
  end

  def self.down
    remove_column :friendships, :body
  end

end
