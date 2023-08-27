class ApplicationController < ActionController::API
    def not_found
        render json: { error: 'not_found' }
    end
    
    def authorize_request
        header = request.headers['token']
        begin
          @decoded = JsonWebToken.decode(header)
          @current_user = User.find(@decoded[:user_id])
        rescue Mongoid::Errors::DocumentNotFound => e
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          render json: { errors: e.message }, status: :unauthorized
        end
    end
end
