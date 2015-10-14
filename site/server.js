var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3001);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
//var routes = require('./routes/index');
//app.get('/', routes.index);
//app.get('/api/update_org/:org', routes.update_org);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});