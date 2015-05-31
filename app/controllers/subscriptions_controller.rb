class SubscriptionsController < ApplicationController 
	protect_from_forgery with: :null_session

	def index
		@subscriptions = Subscription.all
		respond_to do |format|
			format.html { render :index }
			format.json { render json: @subscriptions}
		end
	end

	def show 
		@subscription = Subscription.find_by(id: params[:id])
		if @subscription
			render json: @subscription
		else
			render status: 400, nothing: true
		end
	end

	def create
		if params[:name] === "NYTimes"
			@subscription = Subscription.create(name: params[:name], keyword: params[:keyword], url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=#{params[:keyword]}&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
		elsif params[:name] === "google"
			@subscription = Subscription.create(name: params[:name], keyword: params[:keyword], url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=#{params[:keyword]}")
		elsif params[:name] === "twitter"
			@subscription = Subscription.create(name: params[:name], keyword: params[:keyword], url: params[:keyword])
		end
		if @subscription.save
			@user_sub = UserSubscription.create(user_id: session[:user_id], subscription_id: @subscription.id)
			if @user_sub.save
				"render json: (@subscription) and return"
			else
				render status: 400, nothing: true
			end
		else
			render status: 400, nothing: true
		end
		redirect_to '/subscriptions'
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






