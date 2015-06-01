# require 'HTTParty'
# require 'json'
# require 'twitter'

class UserSubscriptionsController < ApplicationController
	protect_from_forgery with: :null_session

	skip_before_filter :verify_authenticity_token

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

	def stories
		@content = []

		client = Twitter::REST::Client.new do |config| #Peter's Twitter developer credentials
		  config.consumer_key        = Rails.application.secrets.consumer_key
		  config.consumer_secret     = Rails.application.secrets.consumer_secret
		  config.access_token        = Rails.application.secrets.access_token
		  config.access_token_secret = Rails.application.secrets.access_token_secret
		end

		@user_subscriptions = UserSubscription.where("user_id = ?", params[:id])
		if @user_subscriptions
			@user_subscriptions.each do |sub|
				if sub.subscription.name == 'Twitter'
					client.search(sub.subscription.url).take(10).map(&:attrs).each do |tweet|
						@content.push( {
							subname: sub.subscription.name,
							subid: sub.subscription_id,
							data: tweet
						} )
					end
				else
					@content.push( {
						subname: sub.subscription.name,
						subid: sub.subscription_id,
						data: HTTParty.get(sub.subscription.url)
					} )
				end
			end
			render json: @content
		else
			render status: 400, nothing: true
		end
	end

	def create
		@user_subscription = UserSubscription.create(user_subscription_params)
		if @user_subscription.save
			render json: @user_subscription
		else
			render status: 400, nothing: true
		end
	end

	# update
	
	def destroy
		user_id = User.find(session['user_id'])

		@user_subscription = UserSubscription.where("subscription_id = ? and user_id = ?",params[:id], user_id.id)

		if @user_subscription.length > 1
			puts "More than one user subscription.  I'm scared."
		end
		if @user_subscription[0].destroy
			render json: {}
		else
			render status: 400, nothing: true
		end
	end

	private
	def user_subscription_params
		params.require(:user_subscription).permit(:user_id, :subscription_id)
	end

end
