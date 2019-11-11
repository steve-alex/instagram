class PostSerializer
    include Rails.application.routes.url_helpers

    def initialize(post_object)
      @post = post_object
    end

    def to_serialized_json
      {
        post: {
        user_id: @post[0].user.id,
        username: @post[0].user.username,
        image_url: get_image_url(),
        description: @post[0].description,
        created_at: @post[0].created_at,
        likes: @post[0].likes,
        likes_count: @post[0].likes.length,
        current_user_likes: current_user_likes()
        },
        user: {
          id: @post[0].user.id,
          username: @post[0].user.username,
          avatar: get_avatar_url(),
        }
      }.to_json()
    end

    private
    
    def get_image_url
      url_for(@post[0].image)
    end

    def get_avatar_url
      url_for(@post[0].user.avatar)
    end

    def current_user_likes
      user_id_array = @post[0].likes.map{|like| like.user_id}
      user_id_array.include?(@post[1].id)
    end
end