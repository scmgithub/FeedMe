class SubscriptionsController < ApplicationController 
	protect_from_forgery with: :null_session

	def index
		@subscriptions = Subscription.all
		respond_to do |format|
			format.html { render :index}
			format.json { render json: @subscriptions}
		end
	end

	def show 
		@subscription = Subscription.find_by(id: params[:id])
		if @subscription
			render json: @tweet
		else
			render status: 400, nothing: true
		end
	end

	def create 
		@subscription = Subscription.create(subscription_params)
		if @subscription.save
			render json: @subscription
		else
			render status: 400, nothing: true
		end
	end

	def update 
		@subscription = Subscription.find_by(id: params[:id])
		if @subscription.update(subscription_params)
			render json: @subscription
		else
			render status: 400, nothing: true
		end
	end

	def destroy 
		@subscription = Subscription.find_by(id: params[:id])
		if @subscription.destroy
			render json: {}
		else
			render status: 400, nothing: true
		end
	end

	private 
	def subscription_params
		params.require(:subscription).permit(:name, :keyword, :url)
	end
end






