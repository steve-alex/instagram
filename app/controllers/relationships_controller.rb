class RelationshipsController < ApplicationController
    def index
        @relationships = Relationship.all
        render json: @relationships
    end

    def create
        @user = User.find(params[:id])
        current_user.follow!(@user)
        render json: @user
    end
end