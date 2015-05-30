class User < ActiveRecord::Base
  has_secure_password
  
	has_many :user_subscriptions
	has_many :subscriptions, through: :user_subscriptions
	validates :name, presence: true
	validates :name, uniqueness: true
end
