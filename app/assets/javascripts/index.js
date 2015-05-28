document.addEventListener('DOMContentLoaded', function() {


id = 2; // eventually this id will be defined by the login authentication


  var addAllSubs = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/subscriptions.json');
    xhr.addEventListener('load', function() {
      var subs = JSON.parse(xhr.responseText);
      var response;
     
      var xhr2 = new XMLHttpRequest();
      xhr2.open('GET', 'http://localhost:3000/user_subscriptions/'+ id);
      xhr2.addEventListener('load', function() {
        response = JSON.parse(xhr2.responseText);
        subs.forEach(function(sub) {
          addSub(sub, response);
        })
      });
      xhr2.send();
    });
    xhr.send();
  }

  var refreshNews = function() {
    var ul = document.getElementById('newsFeed')
    ul.innerHTML="";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/user_subscriptions/stories/' + id);
    xhr.addEventListener('load', function() {
      var sublist = JSON.parse(xhr.responseText);
       sublist.forEach(function(story) {
          addStoryToDOM(story, ul);
       });
    });
    xhr.send();
  }

  var addStoryToDOM = function(story, ul) {
    var li = document.createElement('li');
    setLiToStory(li, story);
    ul.appendChild(li);
  }

  var setLiToStory = function(li, story) {
    li.innerHTML = "";
    var storyText = story
    var storyTextNode = document.createTextNode(storyText);
    li.appendChild(storyTextNode);
  }

  addAllSubs();
  refreshNews();

  var deleteSub = function() {
    var li = this.parentNode;
    var id = li.id.substring(3);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/subscriptions/' + id);
    xhr.addEventListener('load', function() {
      if(JSON.parse(xhr.status === 200)) {
        li.remove();
      }
    });

    xhr.send();
  };

  var addSub = function(sub, sublist) {
    var li = document.createElement('li');
    setLiToSub(li, sub, sublist); // go to line 37
    var ul = document.getElementById('subsList')
    ul.appendChild(li);
  }

  var setLiToSub = function(li, sub, sublist) {
    li.setAttribute('id', 'sub' + sub.id);
    li.innerHTML = "";

    var subCheck = document.createElement('input');
    subCheck.type = "checkbox";
    subCheck.checked = false;
    for (var i=0; i<sublist.length; i++) {
      if (sublist[i].subscription_id === sub.id) {
        subCheck.checked= true;
      }
    }

    subCheck.addEventListener('change', function() {
      if (subCheck.checked) {
        var xhr= new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/user_subscriptions');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.addEventListener('load', function() {
          if(JSON.parse(xhr.status !== 200)) {
            console.log("Unable to add user_subscription!");
            console.log("sub.id:")
            console.log(sub.id)
          } else {
            refreshNews();            
          }
        });
        var newUserSub = { user_id: 2, subscription_id: sub.id }
        xhr.send(JSON.stringify(newUserSub));
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost:3000/user_subscriptions/' + sub.id);
        xhr.addEventListener('load', function() {
          if(JSON.parse(xhr.status !== 200)) {
            console.log("Unable to remove user_subscription!");
          } else {
            refreshNews();            
          }
        });
        xhr.send();
      }
    });
    
    var subText = sub.name + ": "+ sub.keyword;
    var subTextNode = document.createTextNode(subText);
    li.appendChild(subCheck);
    li.appendChild(subTextNode);
    

    // var edit = document.createElement('button');
    // edit.innerHTML = "Edit";
    // edit.addEventListener('click', function() {
    //   editSub(li, sub.name); // go to line 58
    // });
    // li.appendChild(edit);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', deleteSub); //go to line 16
    li.appendChild(deleteButton);
  }

  


  // var editSub = function(li, name, type) {
  //   li.innerHTML = '';
  //   var id = li.id.substring(3);

  //   //sub name input textbox
  //   var nameField = document.createElement('input');
  //   nameField.setAttribute('type', 'text');
  //   nameField.value = name;
  //   li.appendChild(nameField);

  //   //pet type input textbox
  //   // var typeField = document.createElement('input');
  //   // typeField.setAttribute('type', 'text');
  //   // typeField.value = type;
  //   // li.appendChild(typeField);

  //   var updateButton = document.createElement('button');
  //   updateButton.innerHTML = 'Update';
  //   updateButton.addEventListener('click', function() {
  //     var newName = nameField.value;
  //     //var newType = typeField.value;
  //     updateSub(li, newName); //go to line 88
  //   });
  //   li.appendChild(updateButton);
  // };

  // var updateSub = function(li, newName) {
  //   var id = li.id.substring(3);
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('PUT', 'http://localhost:3000/pets/' + id);
  //   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //   xhr.addEventListener('load', function() {
  //     var returnedPet = JSON.parse(xhr.responseText);
  //     setLiToPet(li, returnedPet); //go to line 37
  //   });

  //   var updatedPet = {pet: { name: newName, pet_type: newType }};
  //   xhr.send(JSON.stringify(updatedPet));
  // }

  var addNewSubButton = document.getElementById('addNewSub');
  addNewSubButton.addEventListener('click', function() {
    var newName = document.getElementById('newSubName');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/subscriptions');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener('load', function() {
      var returnedSub = JSON.parse(xhr.responseText);
      addSub(returnedSub);
      newName.value = '';
    });

    var newSub = { sub: {name: newName.value} };
    xhr.send(JSON.stringify(newSub));
  });
});