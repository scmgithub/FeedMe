# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: 'bruce', password: 'password')
User.create(name: 'alfred', password: 'password')


# Subscription.create(name: "Twitter", keyword: "joker", url: "www.joker.org/")
# Subscription.create(name: "Twitter", keyword: "celine dion", url: "www.canadarox.org/")
# Subscription.create(name: "Twitter", keyword: "winston churchill", url: "www.winston.org/")
# Subscription.create(name: "NYTimes", keyword: "pugs", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=pugs&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")


Subscription.create(name: "NYTimes", keyword: "taylor swift", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=taylor+swift&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
Subscription.create(name: "NYTimes", keyword: "batman", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=batman&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
Subscription.create(name: "NYTimes", keyword: "joker", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=joker&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
#Subscription.create(name: "NYTimes", keyword: "celine dion", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=celine+dion&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
Subscription.create(name: "NYTimes", keyword: "winston churchill", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=winston+churchill&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
Subscription.create(name: "Google", keyword: "bucky ball", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='nachos'")
#Subscription.create(name: "Google", keyword: "freedom tower", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='freedom tower'")
Subscription.create(name: "Google", keyword: "nachos", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nachos")
# Subscription.create(name: "NYTimes", keyword: "taylor swift", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=taylor+swift&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
# Subscription.create(name: "NYTimes", keyword: "batman", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=batman&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
# Subscription.create(name: "NYTimes", keyword: "joker", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=joker&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
Subscription.create(name: "NYTimes", keyword: "celine dion", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=celine+dion&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
# Subscription.create(name: "NYTimes", keyword: "winston churchill", url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=winston+churchill&fl=web_url,snippet,source,headline,pub_date&api-key=aa1260c72c4d669a7ecd0d1aa8725430:6:8505067")
# Subscription.create(name: "Google", keyword: "bucky ball", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='nachos'")
Subscription.create(name: "Google", keyword: "freedom tower", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='freedom tower'")
# Subscription.create(name: "Google", keyword: "nachos", url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nachos")





UserSubscription.create(user_id: 1, subscription_id: 1)
UserSubscription.create(user_id: 1, subscription_id: 2)
# UserSubscription.create(user_id: 1, subscription_id: 1)
UserSubscription.create(user_id: 2, subscription_id: 1)
UserSubscription.create(user_id: 2, subscription_id: 2)
# UserSubscription.create(user_id: 2, subscription_id: 2)
# UserSubscription.create(user_id: 2, subscription_id: 1)
