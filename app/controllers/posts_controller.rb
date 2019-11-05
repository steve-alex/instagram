class PostsController < ApplicationController
    def new
        @post = Post.new
    end

    def create
        Post.create(post_params)
        redirect_to user_path(current_user)
    end

    def show
    end

    def index
        @posts = Post.all
    end

    private

    def post_params
        params.require(:post).permit(:description, :user_id, :image)
    end
end