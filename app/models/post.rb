class Post < ApplicationRecord
  validates :picture, presence: true
end