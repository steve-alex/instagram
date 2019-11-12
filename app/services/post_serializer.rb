class PostSerializer
    include Rails.application.routes.url_helpers

    def initialize(post, current_user, likes)
      @post = post
      @current_user = current_user
      @likes = likes
    end

    def to_serialized_json
      {
        post: {
          id: @post.id,
          image_url: get_image_url(),
          description: @post.description,
          created_at: @post.created_at,
          current_user_likes: current_user_likes()
        },
        user: {
          id: @post.user.id,
          username: @post.user.username,
          avatar: get_avatar_url(),
        },
        likes: {
          likes: @post.likes,
          likes_count: @post.likes.length
        }
      }.to_json()
    end

    private
    
    def get_image_url
      url_for(@post.image)
    end

    def get_avatar_url
      url_for(@post.user.avatar)
    end

    def current_user_likes
      user_id_array = @post.likes.map{|like| like.user_id}
      user_id_array.include?(@current_user.id)
    end
end