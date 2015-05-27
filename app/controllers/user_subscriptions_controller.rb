class UserSubscriptionsController < ApplicationController
	protect_from_forgery with: :null_session

	def index
		@user_subscriptions = UserSubscription.all
		respond_to do |format|
			format.html { render :index }
			format.json { render json: @user_subscriptions }
		end
	end

	def show
		@user_subscription = UserSubscription.where("user_id = ?", params[:id])
		if @user_subscription
			render json: @user_subscription
		else
			render status: 400, nothing: true
		end
	end

	# create
	# update
	# destroy

	private
	def user_subscription_params
		params.require(:user_subscription).permit(:user_id, :subscription_id)
	end

end
