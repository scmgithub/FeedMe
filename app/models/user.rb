class User < ActiveRecord::Base
  has_secure_password
  
	has_many :user_subscriptions
	has_many :subscriptions, through: :user_subscriptions
end
