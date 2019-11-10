class UserSerializer
    include Rails.application.routes.url_helpers

    def initialize(user_object)
      @user = user_object
    end

    def to_serialized_json
      {   
        user: {
          id: @user.id,
          email: @user.email,
          username: @user.username,
          name: @user.name,
          website: @user.website,
          bio: @user.bio,
          phone: @user.phone,
          gender: @user.gender,
          avatar: get_avatar_url()
        }
      }.to_json()
    end

    private

    def get_avatar_url
      url_for(@user.avatar)
    end
end