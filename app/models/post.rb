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

  def imageURL
    rails_blob_path(self.image, only_path: true) if self.image.attached?
  end

  def image_filename
    self.image.filename.to_s if image.attached?
  end

end