class ChangeDataPicture < ActiveRecord::Migration[6.0]
  def change
    change_column :posts, :picture, :text
  end
end
