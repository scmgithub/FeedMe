document.addEventListener('DOMContentLoaded', function() {
  var id;
  var getId = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin + '/session')
    xhr.addEventListener('load', function() {
      var user = JSON.parse(xhr.responseText);
      id = user.id;
      addAllSubs();
    });
    xhr.send();
  }

  getId();

  var addAllSubs = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin + '/subscriptions.json');
    xhr.addEventListener('load', function() {
      var subs = JSON.parse(xhr.responseText);
      var response;

      var xhr2 = new XMLHttpRequest();
      xhr2.open('GET', location.origin + '/user_subscriptions/' + id);
      xhr2.addEventListener('load', function() {
        response = JSON.parse(xhr2.responseText);
        subs.forEach(function(sub) {
          addSub(sub, response);
        })
        refreshNews();
      });
      xhr2.send();
    
    });
    xhr.send();
  }

  var addStoryToDOM = function(story, ul, subid) {
    var li = document.createElement('li');
    $(li).addClass("story");
    $(li).addClass("subid-"+subid);
    setLiToStory(li, story);
    ul.appendChild(li);
  }

  var refreshNews = function() {
    var ul = document.getElementById('newsFeed');

    // clear all stories
    var stories = document.getElementsByClassName('story');
    var numstories = stories.length;
    for (var i = numstories-1; i>=0; i--) {
      stories[i].parentNode.removeChild(stories[i]);
    }

    // get list of stories for subscriptions
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin + '/user_subscriptions/stories/' + id);
    xhr.addEventListener('load', function() {

      var storylist = JSON.parse(xhr.responseText);
      for (var i = 0; i < storylist.length; i++) {
        var storytext = '';

        // Twitter feed
        if (storylist[i].subname === 'twitter') {
            var thisStory = storylist[i].data;
            var link = thisStory.text.split(" ");
            for(l=0; l<link.length; l++) {
              if (link[l].search('http://t.co') != -1) {
                link[l] = "<a href='" + link[l] + "'>" + link[l] + "</a>";
                storytext = link.join(' ');
              }
            }
            var tweetText = "<p><b>" + thisStory.user.screen_name + ":</b> " + storytext + "</p";
            addStoryToDOM(tweetText, ul, storylist[i].subid);

        // Google feed
        } else if (storylist[i].subname === 'google') {
          var thisStory = JSON.parse(storylist[i].data).responseData;
          for (var k = 0; k < thisStory.results.length; k++) {
            storytext = "<p><b>" + thisStory.results[k].title + "</b><br> " + thisStory.results[k].content + "<a href='" + thisStory.results[k].unescapedUrl + "'>...more</a></p>";
            addStoryToDOM(storytext, ul, storylist[i].subid);
          }

        // NYTimes feed
        } else if (storylist[i].subname === 'NYTimes') {
          storylist[i].data.response.docs.forEach(function(story) {
            storytext = "<p><b>" + story.headline.main + "</b><br> " + story.snippet + "<a href='" + story.web_url + "'>...more</a></p>";
              addStoryToDOM(storytext, ul, storylist[i].subid);
          });

        } else {
          console.log("Unrecognized subscription name: "+storylist[i].subname);
        }
      }
      
    });
    xhr.send();
  }

  var setLiToStory = function(li, story) {
    li.innerHTML = story;
  }

  var deleteSub = function() {
    var li = this.parentNode;
    var id = li.id.substring(3);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', location.origin + '/subscriptions/' + id);
    xhr.addEventListener('load', function() {
      if (JSON.parse(xhr.status === 200)) {
        li.remove();
        refreshNews();
      }
    });
    xhr.send();
  };

  var addSub = function(sub, sublist) {
    var li = document.createElement('li');
    setLiToSub(li, sub, sublist);
    var ul = document.getElementById('subsList')
    ul.appendChild(li);
  }

  var setLiToSub = function(li, sub, sublist) {
    li.setAttribute('id', 'sub' + sub.id);
    li.innerHTML = "";

    var subCheck = document.createElement('input');
    subCheck.type = "checkbox";
    subCheck.checked = false;
    for (var i = 0; i < sublist.length; i++) {
      if (sublist[i].subscription_id === sub.id) {
        subCheck.checked = true;
      }
    }

    subCheck.addEventListener('change', function() {
      if (subCheck.checked) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', location.origin + '/user_subscriptions');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.addEventListener('load', function() {
          if (JSON.parse(xhr.status !== 200)) {
            console.log("Unable to add user_subscription!");
            console.log("sub.id:")
            console.log(sub.id)
          } else {
            refreshNews();
          }
        });
        var newUserSub = {
          user_id: id,
          subscription_id: sub.id
        }
        xhr.send(JSON.stringify(newUserSub));
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', location.origin + '/user_subscriptions/' + sub.id);
        xhr.addEventListener('load', function() {
          if (JSON.parse(xhr.status !== 200)) {
            console.log("Unable to remove user_subscription!");
          } else {
            refreshNews();
          }
        });
        xhr.send();
      }
    });

    var subText = sub.name + ": " + sub.keyword;
    var subTextNode = document.createTextNode(subText);
    li.appendChild(subCheck);
    li.appendChild(subTextNode);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', deleteSub);
    li.appendChild(deleteButton);
  }

  var refreshArticlesButton = document.getElementById('refreshStoriesButton');
  refreshStoriesButton.addEventListener('click', function() {
    refreshNews();
  });

});