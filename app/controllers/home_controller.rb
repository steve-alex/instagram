class HomeController < ApplicationController
  def index
    @posts = current_user.get_users_post_feed
    render json: @posts
  end
end