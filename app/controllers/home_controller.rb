class HomeController < ApplicationController
  def index
    @posts = Post.all.where(user_id: current_user.id).order(created_at: :desc)
  end
end
