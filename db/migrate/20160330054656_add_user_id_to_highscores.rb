class AddUserIdToHighscores < ActiveRecord::Migration
  def change
    add_column :highscores, :user_id, :integer
  end
end
