var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var jwt = require('jwt-simple');
var _ = require('underscore');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('jwtTokenSecret', 'TestSecretKey2522');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


var loginServices = require('./routes/loginServices');
app.set('loginServices', loginServices);
var predictionServices = require('./routes/predictionServices');


var views = require('./routes/views');
app.get('/', views.index);
app.get('/signin', views.signin);
app.get('/createaccount', views.createaccount);
app.get('/verifyaccount', views.verifyaccount);
app.get('/bracket', views.bracket);

//api
app.post('/api/createAccount', loginServices.createAccount);
app.post('/api/loginAccount', loginServices.loginAccount);
app.post('/api/logoutAccount', loginServices.logoutAccount);
app.get('/api/isLoggedIn', loginServices.isLoggedIn);
app.get('/api/getPredictions', predictionServices.getPredictions);

//debug
app.get('/debug/tokens', loginServices.printTokens);
app.get('/debug/cleanTokens', loginServices.removeDuplicateExpiredTokens);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});