class SessionsController < ApplicationController
	def new
		render :new
	end

	def create
		
		user = User.find_by(name: params[:user_name])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			redirect_to "/secret"
		else
			@error = true
			render :new
		end
	end
	def destroy
		reset_session
		redirect_to "/session/new"
	end


end
