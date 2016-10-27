var express = require('express');
var router = express.Router();
var request = require('request');

var people = [
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'public' });
});

router.get('/people', function(req, res) {
        console.log("In people");
        res.send(people);
});

var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
router.get('/politics', function(req,res) {
  console.log("In politics");
  request(politics).pipe(res);
});

router.post('/people', function(req, res) {
    console.log("In People Post");
    console.log(req.body);
    people.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


module.exports = router;
