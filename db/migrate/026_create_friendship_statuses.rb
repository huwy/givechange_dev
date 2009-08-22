class CreateFriendshipStatuses < ActiveRecord::Migration

  def self.up
    create_table :friendship_statuses, :force => true do |t|
      t.column :name, :string
    end
  end

  def self.down
    drop_table :friendship_statuses
  end

end
