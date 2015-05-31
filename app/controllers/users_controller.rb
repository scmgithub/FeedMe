class UsersController < ApplicationController
	protect_from_forgery with: :null_session
	before_action :authenticate, except: [:create]

	def index 
		@users = User.all 
		respond_to do |format|
			format.html { render :index}
			format.json { render json: @users}
		end
	end
	
	def create
		@user = User.create(name: params[:name], password: params[:password])

		if @user.save
			session[:user_id] = @user.id
			redirect_to "/subscriptions"
		else
			@sign_up_errors = "That username is already taken.  Please choose another."
			render "sessions/new"
		end
	end
end
