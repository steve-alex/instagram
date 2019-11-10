class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end

    def edit
        @user = User.find(params[:id])
    end

    def update
        current_user.update(user_params)
        redirect_to current_user
    end

    def followers
        byebug
        @user = User.find(params[:id])
        render json: @user.followers
    end

    def followed_users
        @user = User.find(params[:id])
        render json: @user.followed_users
    end

    # def posts
    #     @posts = Post.where(user_id: params[:id])
    #     render json: @posts
    # end

    private

    def user_params 
        params.require(:user).permit(:username, :name, :website, :bio, :email, :phone, :gender, :avatar)
    end
end