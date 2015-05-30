class SessionsController < ApplicationController
	protect_from_forgery with: :null_session

	def new
		render :new
	end

	def create
		@user = User.find_by(name: params[:user_name])
		if @user && @user.authenticate(params[:password])
			session[:user_id] = @user.id
			redirect_to "/subscriptions"
		else
			@error = true
			render :new
		end
	end

	def show
		user_id = User.find(session['user_id']) if (session['user_id'])
		if user_id
			render json: user_id
		else
			render status: 400, nothing: true
		end
	end

	def destroy
		reset_session
		redirect_to "/session/new"
	end
end
