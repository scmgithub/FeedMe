class UsersController < ApplicationController
	protect_from_forgery with: :null_session

	def index 
		@users = User.all 
		respond_to do |format|
			format.html { render :index}
			format.json { render json: @users}
		end
	end
	
	def create
		user = User.create(name: params[:name], password: params[:password])
		session[:user_id] = user.id
		redirect_to "/subscriptions"
	end
end
