class HomeSerializer
  include Rails.application.routes.url_helpers

  def initialize(home_object)
    @posts = home_object
  end

  def to_serialized_json
  end

  private
    
  def get_image_url
    url_for(@post.image)
  end

end