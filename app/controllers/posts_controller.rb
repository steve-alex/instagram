class PostsController < ApplicationController
    def new
        @post = Post.new
    end

    def create
        Post.create(post_params)
        redirect_to user_path(current_user)
    end

    def index
        @posts = Post.all
        render json: @posts
    end


    def show
        post = Post.find(params[:id])
        render json: PostSerializer.new(post, current_user, post.likes).to_serialized_json
    end

    def like
        Like.create!(user_id: current_user.id, post_id: params["post_id"])
    end

    def unlike
        Like.find_by(user_id: current_user.id, post_id: params["post_id"]).destroy!
    end

    private

    def post_params
        params.require(:post).permit(:user_id, :description, :image)
    end
end