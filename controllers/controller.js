
var express = require('express');
var router = express.Router();
var Article = require('../models/Article.js');



// This will display the ReactJS application.
router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// components will use this to query MongoDB for all saved articles.
router.get("/api/saved", function(req, res) {
  
  // Query Mongo for the Articles
   Article.find({}, function(err, docs){
      if (err){
        console.log(err);
      } 
      else {
        res.json(docs);
      }
   });

});


//components will use this to save an article to the database.
router.post("/api/saved", function(req, res) {
  
  
  var entry = new Article (req.body);

  // Save the entry
  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});


// components will use this to delete a saved article in the database
router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
    
      res.sendStatus(200);
    }
  });

});


// redirect user to the "/" route for any unknown cases
router.get("*", function(req, res) {
  res.redirect("/");
});

module.exports = router;