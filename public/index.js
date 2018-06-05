
var dreamButton = document.getElementsByClassName('modal-accept-button');
dreamButton[0].addEventListener('click', checkInput);

var clearButton = document.getElementsByClassName('modal-cancel-button');
clearButton[0].addEventListener('click', clearModal);
var dreamText = document.getElementById('dream-text-input');
var dreamAuthor = document.getElementById('dreamer-input');
var dreamContainer = document.getElementsByClassName('dream-container');


/*
when user clicks on log dream button and doesn't have required fields, alert
message displayed, otherwise posts dream
*/

function checkInput(event){
  console.log("Text: ", dreamText.value);
  console.log("Author: ", dreamAuthor.value);
 if(dreamText.value == "" || dreamAuthor.value ==""){
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
}

function logDream(event){
  console.log("In log dream function");
  console.log("Text: ", dreamText.value);
  console.log("Author: ", dreamAuthor.value);
  clearModal();
}
