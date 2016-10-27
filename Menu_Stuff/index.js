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

//fetch a random quote from quoteList.txt
router.get('/getquote', function(req,res,next) {
        fs.readFile(__dirname + '/quoteList.txt',function(err,data) {
                if (err) throw err;
                var citationReturn = data.toString().split("\n");
                var citeIndex = req.query.q - 1;
                var jsonresult = [];
                jsonresult.push({words:citationReturn[citeIndex]});
                res.status(200).json(jsonresult);
        });
});
//fetch a random nickname from nicknames.txt
router.get('/getnickname', function(req,res,next) {
        fs.readFile(__dirname + '/nicknames.txt',function(err,data){
                if (err) throw err;
                var nameReturn = data.toString().split("\n");
                var nameIndex = req.query.q - 1;
                var jsonName = [];
                jsonName.push({names:nameReturn[nameIndex]});
                res.status(200).json(jsonName);
        });
});


router.post('/people', function(req, res) {
    console.log("In People Post");
    console.log(req.body);
    people.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


module.exports = router;
