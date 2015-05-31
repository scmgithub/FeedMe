class Subscription < ActiveRecord::Base
	has_many :user_subscriptions, dependent: :destroy
	has_many :users, through: :user_subscriptions

	validates :keyword, :name, presence: true, uniqueness: true

end
