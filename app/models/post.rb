class Post < ApplicationRecord
  belongs_to :user

  has_many :likes
  has_many :likers, through: :likes, source: :user

  has_one_attached :image

  validate :image_presence
  # validate :description length

  def image_presence
    errors.add(:image, "can't be blank") unless image.attached?
  end

end