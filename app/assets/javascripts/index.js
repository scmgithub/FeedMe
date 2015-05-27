document.addEventListener('DOMContentLoaded', function() {
  var addAllSubs = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/subscriptions.json');
    xhr.addEventListener('load', function() {
      var subs = JSON.parse(xhr.responseText);
      
      checkedStatus = isChecked();
      console.log(checkedStatus);

      subs.forEach(function(sub) {
        addSub(sub); //go to line 30
      })
    });
    xhr.send();
  }

  addAllSubs(); //go to line 1

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

   var isChecked = function(){
      id = 1; // eventually this id will be defined by the login authentication
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/user_subscriptions/'+ id);
      xhr.addEventListener('load', function() {
        
          var response = JSON.parse(xhr.responseText);
          console.log(response);
        
      });
      xhr.send();
  }

  var addSub = function(sub) {
    
    var li = document.createElement('li');
    setLiToSub(li, sub); // go to line 37
    var ul = document.getElementById('subsList')
    ul.appendChild(li);
  }

  var setLiToSub = function(li, sub) {
    li.setAttribute('id', 'sub' + sub.id);
    li.innerHTML = "";

    var subCheck = document.createElement('input');
    subCheck.type = "checkbox";
    var subText = sub.keyword;
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
      addSub(returnedSub); //go to line 30
      newName.value = '';
    });

    var newSub = { sub: {name: newName.value} };
    xhr.send(JSON.stringify(newSub));
  });
});