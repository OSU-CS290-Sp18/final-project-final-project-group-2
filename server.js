
var http = require('http');
var fs = require('fs');

console.log("== Reading in index.html ==");
var dreamIndex = fs.readFileSync('public/index.html', 'utf8');

console.log("== Reading in index.js ==");
var dreamJS = fs.readFileSync('public/index.js', 'utf8');

console.log("== Reading in style.css ==");
var dreamCSS = fs.readFileSync('public/style.css', 'utf8');

console.log("== Reading in 404.html ==");
var dreamError = fs.readFileSync('public/404.html', 'utf8');


function requestHandler (request, response){
  console.log("== Got a request");
  console.log("  -- method:", request.method);
  console.log("  -- url:", request.url);
  if (request.url === '/index.html' || request.url === '/'){
    response.statusCode = 200;
    console.log("status code:", response.statusCode);
    response.write(dreamIndex);
  }
  else if (request.url === '/index.js'){
    response.statusCode = 200;
    console.log("status code:", response.statusCode);
    response.write(dreamJS);
  }
  else if (request.url === '/style.css'){
    response.statusCode = 200;
    console.log("status code:", response.statusCode);
    response.write(dreamCSS);
  }
  else{
    response.statusCode = 404;
    console.log("status code:", response.statusCode);
    response.write(dreamError);
  }
  response.end();
}

var server = http.createServer(requestHandler);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log("== Server is listening on port " + port);
});
