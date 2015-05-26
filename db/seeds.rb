# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: 'bruce', password: 'password')
User.create(name: 'alfred', password: 'password')

Subscription.create(name: "twitter", keyword: "taylor swift", url: "www.testUrl.org/")
Subscription.create(name: "twitter", keyword: "batman", url: "www.testUrl.org/")
Subscription.create(name: "twitter", keyword: "joker", url: "www.testUrl.org/")
Subscription.create(name: "twitter", keyword: "celine dion", url: "www.testUrl.org/")
Subscription.create(name: "twitter", keyword: "winston churchill", url: "www.testUrl.org/")

UserSubscription.create(user_id: 0, subscription_id: 2)
UserSubscription.create(user_id: 0, subscription_id: 1)
UserSubscription.create(user_id: 0, subscription_id: 0)
UserSubscription.create(user_id: 1, subscription_id: 4)
UserSubscription.create(user_id: 1, subscription_id: 3)
UserSubscription.create(user_id: 1, subscription_id: 0)
UserSubscription.create(user_id: 1, subscription_id: 2)