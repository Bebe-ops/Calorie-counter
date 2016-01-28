'use strict';


var url = 'http://localhost:3000';
var mainTitle = document.querySelector('.main-title');
var listOfMeals = document.querySelector('.meal-list');
var mealEntry = document.querySelector('.meal-entry');
var mealName = document.querySelector('.meal-name');
var mealCalorie = document.querySelector('.meal-calorie');
var mealDate = document.querySelector('.meal-date');
var submitButton = document.querySelector('.submit-button');
var deleteButton = document.querySelector('.delete-button');
var filterInput = document.querySelector('.filter-input');
var filterButton = document.querySelector('.filter-button');
var calorieDatabaseMeals = document.querySelector('.calorie-database-meals');
var calorieDatabaseCalories = document.querySelector('.calorie-database-calories');
var calorieDatabaseMetrics = document.querySelector('.calorie-database-metrics');
var mealDatabase = {};
var elementId = 0;

function getRequest(addition, callback) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('GET',url + addition);
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send();
  myRequest.onreadystatechange = function() {
    if (myRequest.readyState === 4) {
      callback(myRequest.response);
    }
  }
}

function postRequest(data, callback) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('POST', url + '/meals');
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send(data);
  myRequest.onreadystatechange = function () {
    if (myRequest.readyState === 4 && callback !== undefined) {
      callback(myRequest.responseText);
    }
  };
}

function deleteRequest(id, callback) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('DELETE', url + '/meals/' + id);
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send();
  myRequest.onreadystatechange = function () {
    if (myRequest.readyState === 4) {
      callback(id);
    }
  }
}

function listing(response) {
  var mealsArray = JSON.parse(response);
  listOfMeals.innerHTML = '';
  mealsArray.forEach(function(onemeal) {
    var listelement = document.createElement('p');
    listelement.innerHTML = onemeal.name + '    ' + onemeal.calorie + '   ' + onemeal.date.split('T')[0];
    listelement.setAttribute('id', onemeal.id);
    listOfMeals.appendChild(listelement);
  });
  console.log('sikerult a listazas', response);
}


function listFiltered(response) {
  var mealsArray = JSON.parse(response);
  listOfMeals.innerHTML = '';
  mealsArray.forEach(function(onemeal) {
    if (filterInput.value === onemeal.date.split('T')[0]) {
      var listelement = document.createElement('p');
      listelement.innerHTML = onemeal.name + '    ' + onemeal.calorie;
      listelement.setAttribute('id', onemeal.id);
      listOfMeals.appendChild(listelement);
    }
  });
  console.log('listFiltered eredmenye', response);
}


function calorieSelection(response) {
  var mealsArray = JSON.parse(response);
  mealDatabase = mealsArray;
  mealsArray.forEach(function(onemeal) {
    var listelement = document.createElement('option');
    listelement.innerHTML = onemeal.Item;
    listelement.setAttribute('id', onemeal.ID);
    calorieDatabaseMeals.appendChild(listelement);
  });
  // console.log('calorieSelection eredmenye', response);
}



function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

submitButton.addEventListener('click', function() {
  postRequest(JSON.stringify({name: mealName.value, calorie: mealCalorie.value, date: mealDate.value}))
  getRequest(listing);
});

getRequest('/meals', listing);
getRequest('/calorie', calorieSelection);

listOfMeals.addEventListener('click', function() {
  elementId = event.target.id;
});

deleteButton.addEventListener('click', function() {
  deleteRequest(elementId, removeElement);
});

filterButton.addEventListener('click', function() {
  getRequest(listFiltered);
  console.log(filterInput.value);
});

calorieDatabaseMeals.addEventListener('click', function() {
  mealDatabase.forEach(function(onemeal) {
    if (calorieDatabaseMeals.value === onemeal.Item) {
      calorieDatabaseMetrics.value = onemeal.Quantity + '  ' + onemeal.Metrics;
      calorieDatabaseCalories.value = onemeal.Calories;
    }
  });
});
