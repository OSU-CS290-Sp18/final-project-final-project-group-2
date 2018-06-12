var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME || "cs290_zaragozu";
var mongoPassword = process.env.MONGO_PASSWORD || "cs290_zaragozu";
var mongoDBName = process.env.MONGO_DB_NAME || "cs290_zaragozu";
var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

  var mongoDB = null;


var port = 3000 || process.env.PORT;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));
/*
app.get('/', function (req, res, next){
  res.status(200).render('publicPage', {dream: dreamData});
}); */


app.get('/', function (req, res, next){

  var dreamsCollection = mongoDB.collection('dreams');
  dreamsCollection.find().toArray(function(err, dreamsDocs) {
    if(err)
    {
      res.status(500).send("Error fetching dream from DB.");
    }
    else if(dreamsDocs.length > 0)
    {
      res.status(200).render('publicPage', {dream: dreamsDocs});
    }
    else{
      next();
    }
  })

});


app.get('/personalPage', function (req, res, next){

    var dreamsCollection = mongoDB.collection('dreams');
    dreamsCollection.find().toArray(function(err, dreamsDocs) {
      if(err)
      {
        res.status(500).send("Error fetching dream from DB.");
      }
      else if(dreamsDocs.length > 0)
      {
        res.status(200).render('personalPage', {dream: dreamsDocs});
      }
      else{
        next();
      }
    })

  });

/*
var person = req.params.person.toLowerCase();
if (req.body && req.body.caption && req.body.photoURL) {
  var photo = {
    caption: req.body.caption,
    photoURL: req.body.photoURL
  };
  var peopleCollection = mongoDB.collection('people');
  peopleCollection.updateOne(
    { personId: person },
    { $push: { photos: photo } },
    function (err, result) {
      if (err) {
        res.status(500).send("Error inserting photo into DB.")
      } else {
        console.log("== mongo insert result:", result);
        if (result.matchedCount > 0) {
          res.status(200).end();
        } else {
          next();
        }
      }
    }
  );
} else {
  res.status(400).send("Request needs a JSON body with caption and photoURL.")
}*/


app.post('/addDream', function (req, res, next) {
  if (req.body && req.body.dreamer && req.body.dream_text && req.body.dream_title) {
    var dream = {
      dreamer: req.body.dreamer,
      dream_text: req.body.dream_text,
      dream_title: req.body.dream_title,
      public: req.body.public
    };
    var dreamsCollection = mongoDB.collection('dreams');

    dreamsCollection.insertOne(dream, function (err, db) {
          if (err)
          {
            res.status(500).send("Error inserting photo into DB.")
          }
          else
          {
            res.status(200).end();
          }
    });

  //  res.status(200).send("Dream successfully added");

  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with dreamer, dream-title, & dream-text " +
      "fields.");
  }
});

/*
app.post('/addDream', function (req, res, next) {
  if (req.body && req.body.dreamer && req.body.dream_text && req.body.dream_title) {
    console.log("== Client added the following dream:");
    console.log("  - person:", req.params.dreamer);
    console.log("  - url:", req.body.url);
    console.log("  - caption:", req.body.dream_text);

    var dream = {
      dreamer: req.body.dreamer,
      dream_text: req.body.dream_text,
      dream_title: req.body.dream_title,
      public: req.body.public
    };
    dreamData.push(dream);
    res.status(200).end();

  //  res.status(200).send("Dream successfully added");

  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with dreamer, dream-title, & dream-text " +
      "fields.");
  }
});*/

app.get('*', function (req, res) {
  res.status(404).render('404');
});


MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
















//
