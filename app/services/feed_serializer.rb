class FeedSerializer
  include Rails.application.routes.url_helpers

  def initialize(posts_object)
    @posts = posts_object
  end

  def to_serialized_json

  end

  private
    
  def get_image_url
    url_for(@post.image)
  end

end