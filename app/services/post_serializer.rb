class PostSerializer
    def initialize(post_object)
        @post = post_object
    end

    def to_serialized_json
        @post.to_json(:include => {
            :user => {:only => [:name]},
            :likes => {:only => [:user_id, :post_id]}
        })
    end
end