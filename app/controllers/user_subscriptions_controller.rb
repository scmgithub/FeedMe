class UserSubscriptionsController < ApplicationController
	protect_from_forgery with: :null_session

	def index
		@user_subscriptions = User_subsciption.all
