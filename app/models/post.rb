class Post < ApplicationRecord
  validates :picture, null: false

  mount_uploader :picture, PictureUploader
end
