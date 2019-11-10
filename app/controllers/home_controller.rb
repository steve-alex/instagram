class HomeController < ApplicationController
  def index
    @posts = current_user.get_all_posts
    render json: @posts
  end
end
