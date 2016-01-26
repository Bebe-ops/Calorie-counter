'use strict';


var url = 'http://localhost:3000';
var mainTitle = document.querySelector('.main-title');
var listOfMeals = document.querySelector('.meal-list');

function getRequest(callback) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('GET',url + '/meals');
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send();
  myRequest.onreadystatechange = function() {
    if (myRequest.readyState === 4) {
      callback(myRequest.response);
    }
  }
}


function listing(response) {
  var mealsArray = JSON.parse(response);
  for (var i = 0; i < mealsArray.length; i ++) {
    var listelement = document.createElement('p');
    listelement.innerHTML = mealsArray[i].name + '    ' + mealsArray[i].calorie;
    listOfMeals.appendChild(listelement);
  }
  console.log("sikerult a listazas", response);
}


getRequest(listing);
