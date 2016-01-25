'use strict';


var url = 'http://localhost:3000';
var mainTitle = document.querySelector('.main-title');

function getRequest(callback) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('GET',url);
  myRequest.setRequestHeader('Content-Type', 'application/json');
  myRequest.send();
  myRequest.onreadystatechange = function() {
    if (myRequest.readyState === 4) {
      callback(myRequest.response);
    }

}


function listing(response) {
  var mealsArray = JSON.parse(response);
  mealsArray = document.createElement('p');
  console.log(sikerult a listazas);
}
