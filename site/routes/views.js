var Q = require('q');
var request = require('request');
var request_promise = Q.denodeify(request);
var fs = require('fs');
var mongo = require('mongodb');
var monk = require('monk');


var passwords = fs.readFileSync(__dirname + '/../passwords.txt', 'utf-8').split('\r\n');
var dbURL = passwords[1] + ':' + passwords[2] + '@localhost:27017/frc-bracket';
var db = monk(dbURL);
var tba_teams = db.get("tba_teams"); //The Blue Alliance teams
var tba_events = db.get("tba_events"); //The Blue Alliance events

module.exports.index = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  
  tba_events.find({},{limit: 6, sort: {start_date: 1}}, function(err, result) {
    for(var i = 0; i < result.length; i++)
      console.log(result[i].name);
    res.render('layouts/index.hbs', {loggedIn: loggedIn});
  });
  
};

module.exports.signin = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  res.render('layouts/default.hbs', {whichPartial: 'default/signin_body', loggedIn: loggedIn});
};

module.exports.createaccount = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  res.render('layouts/default.hbs', {whichPartial: 'default/createaccount_body', loggedIn: loggedIn});
}

module.exports.verifyaccount = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  res.render('layouts/default.hbs', {whichPartial: 'default/verifyaccount_body', loggedIn: loggedIn});
};

module.exports.bracket = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  res.render('layouts/default.hbs', {whichPartial: 'default/bracket_body', loggedIn: loggedIn});
};