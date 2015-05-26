class Subscription < ActiveRecord::Base
	has_many :user_subscriptions
	had_many :users, through :user_subscriptions

end
