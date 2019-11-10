class PostSerializer
    include Rails.application.routes.url_helpers

    def initialize(post_object)
        @post = post_object
    end

    def to_serialized_json
      {
        post: {
        user_id: @post.user.id,
        username: @post.user.username,
        image_url: get_image_url(),
        description: @post.description,
        created_at: @post.created_at
        }
      }.to_json()
    end

    private
    
    def get_image_url
        url_for(@post.image)
    end
end