var express = require('express');
var mongoose = require('mongoose'); // ~ import lib
var bodyParser = require('body-parser');

var GirlModel = require('./models/girl');


var app = express();
app.use(bodyParser.json()); //

// mongodb://<dbuser>:<dbpassword>@ds121965.mlab.com:21965/hotgirl

// TODO 1. Connect

var mlabUri ="mongodb://admin:admin@ds121965.mlab.com:21965/hotgirl";
mongoose.connect(mlabUri, {useMongoClient: true});

// TODO 2. bump data

// var girl = new GirlModel({
//   name: 'Diệu Linh Nguyễn',
//   image: 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/22449743_1173744509393479_7956930171707907868_n.jpg?oh=ea3b1ad81bef49a3de4dd60fdd3193bc&oe=5A721F94',
//   yob: 5
// });
//
// girl.save();
// TODO 3. Use in GET /girl

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api', function(request, response){
  response.json({hello: 'world'});
});

app.get('/api/girl', function(req, res) {
  GirlModel.find(
    {},
    function(err, girls) {
      if (err) {
        res.json({success: 0, data: null});
      } else {
        res.json({success: 1, data: girls});
      }
    }
  );
});

app.post('/api/girl', function(req, res) {
  var body = req.body;
  var name = body.name;
  var image = body.image;
  var yob = body.yob;

  var girl = new GirlModel({
    name: name,
    image: image,
    yob: yob
    // it can be refactor when ten giong nhau :v
    // name,
    // image,
    // yob

  });

  girl.save(function(err, savedGirl) {
    if(err) {
      res.json({success: 0, data: null, message: "Error in save: " + err});
    }else {
      res.json({success: 1, data: savedGirl});
    }
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
