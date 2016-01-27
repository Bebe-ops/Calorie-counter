'use strict';


var url = 'http://localhost:3000';
var mainTitle = document.querySelector('.main-title');
var listOfMeals = document.querySelector('.meal-list');
var mealEntry = document.querySelector('.meal-entry');
var mealName = document.querySelector('.meal-name');
var mealCalorie = document.querySelector('.meal-calorie');
var mealDate = document.querySelector('.meal-date');
var submitButton = document.querySelector('.submit-button');
var elementId = 0;

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

function postRequest(data) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('POST', url + '/meals');
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send(data);
}


function listing(response) {
  var mealsArray = JSON.parse(response);
  listOfMeals.innerHTML = '';
  mealsArray.forEach(function(onemeal) {
    var listelement = document.createElement('p');
    listelement.innerHTML = onemeal.name + '    ' + onemeal.calorie;
    listelement.setAttribute('id', onemeal.id);
    listOfMeals.appendChild(listelement);
  });
  console.log('sikerult a listazas', response);
}


submitButton.addEventListener('click', function() {
  postRequest(JSON.stringify({name: mealName.value, calorie: mealCalorie.value, date: mealDate.value}))
  getRequest(listing);
});




getRequest(listing);
