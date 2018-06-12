
var dreamButton = document.getElementsByClassName('modal-accept-button');
if(dreamButton[0])
{
  dreamButton[0].addEventListener('click', checkInput);
}

var clearButton = document.getElementsByClassName('modal-cancel-button');
if(clearButton[0])
{
  clearButton[0].addEventListener('click', clearModal);
}
var dreamContainer = document.getElementsByClassName('dream-container');

var publicButton = document.getElementById('dream-public');
var privateButton = document.getElementById('dream-private');
var dreamText = document.getElementById('dream-text-input');
var dreamAuthor = document.getElementById('dreamer-input');
var dreamTitle = document.getElementById('dream-title-input');


/*
when user clicks on log dream button and doesn't have required fields, alert
message displayed, otherwise posts dream
*/

function checkInput(event){

 if(dreamText.value == "" || dreamAuthor.value =="" || dreamTitle.value ==""){
   alert("All fields must contain content to post!");
 }
 else {
   console.log("All fields present and ready to post!");
   logDream();
 }
}


/*
clears text boxes for author and dream content when clear button clicked
*/

function clearModal (event){
 console.log("in clearModal function");
 dreamText.value = "";
 dreamAuthor.value = "";
 dreamTitle.value = "";
}

function logDream(event){

  var request = new XMLHttpRequest();
  var url = "/addDream";
  request.open("POST", url);

  if (publicButton.checked)
  {
    var dreamContext = {
    dream_text: dreamText.value,
    dreamer: dreamAuthor.value,
    dream_title: dreamTitle.value,
    public: "true"
    };
    var requestBody = JSON.stringify(dreamContext);

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        var dreamHTML =  Handlebars.templates.dreamTemplate(dreamContext);
        var dreamContainer = document.querySelector('.dream-container');
        dreamContainer.insertAdjacentHTML('beforeend',dreamHTML);
      } else {
        alert("Error storing dream: " + event.target.response);
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
/*
    var dreamHTML =  Handlebars.templates.dreamTemplate(dreamContext);
    var dreamContainer = document.querySelector('.dream-container');
    dreamContainer.insertAdjacentHTML('beforeend',dreamHTML);*/
 }
  else if (privateButton.checked)
  {
    var dreamContext = {
    dream_text: dreamText.value,
    dreamer: dreamAuthor.value,
    dream_title: dreamTitle.value,
    public: ""
    };
    var requestBody = JSON.stringify(dreamContext);

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        var dreamHTML =  Handlebars.templates.dreamTemplate(dreamContext);
        var dreamContainer = document.querySelector('.dream-container');
        dreamContainer.insertAdjacentHTML('beforeend',dreamHTML);
      } else {
        alert("Error storing photo: " + event.target.response);
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
  }

  clearModal();
}



var searchBar = document.getElementById('navbar-search-input');
var searchButton = document.getElementById('navbar-search-button');
var dreams = document.getElementsByClassName('dream');
var allDreams = [];


for (var i = 0; i < dreams.length; i++){
  allDreams.push(dreams[i]);
}

var title = document.getElementsByClassName('dream-title');
var text = document.getElementsByClassName('dream-text');
var author =  document.getElementsByClassName('dreamer');

if(searchButton)
{
  searchButton.addEventListener('click', searchDreams);
}



/*
  Function checks to see if searched text is found in any dreams.
  If not found, removed from DOM
*/



function searchDreams(event){

  console.log("==in searchDreams function");
  console.log("length:", dreams.length);

  console.log("==title for first dream:", title[0]);
  console.log("==text for first dream:", text[0]);
  console.log("==author for first dream:", author[0]);

  var searchThis = searchBar.value;
  console.log("==searchThis", searchThis);
  searchBar.value = "";

  for (var i = 0; i < allDreams.length; i++){
      if (text[i].textContent.indexOf(searchThis) >= 0){
      }
      else if (author[i].textContent.indexOf(searchThis) >= 0){
      }
      else if (title[i].textContent.indexOf(searchThis) >= 0){
      }
      else{
        removeDream(i);
        i--;
      }
  }
}


/*
  Removes dreams sub index value where searched text wasn't found.
*/


function removeDream(index){
  console.log("in removeDream function!!!!!!!!!!!!!!!!!!!");
  console.log("index to be removed:", index);
  dreams[index].remove();
}
