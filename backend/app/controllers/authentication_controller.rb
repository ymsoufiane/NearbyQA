
class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    # try catch
    begin 
    @user = User.find_by(email:params[:email])
    rescue 
      render json: { error: 'User not found' }, status: :unauthorized
      return
    end
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id,name: @user.name,email: @user.email)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     name: @user.name, user_id:@user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
