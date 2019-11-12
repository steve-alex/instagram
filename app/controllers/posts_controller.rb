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
        render json: PostSerializer.new(post, current_user).to_serialized_json
    end

    private

    def post_params
        params.require(:post).permit(:user_id, :description, :image)
    end
end