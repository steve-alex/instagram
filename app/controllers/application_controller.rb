class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token

    private

    def after_sign_out_path_for(resource_or_scope)
        new_user_session_url
    end
end
