var Q = require('q');
var request = require('request');
var request_promise = Q.denodeify(request);
var fs = require('fs');
var jwt = require('jwt-simple');
var mongo = require('mongodb');
var monk = require('monk');
//var MongoClient = mongo.MongoClient;
var jwt = require('jwt-simple');
var _ = require('underscore');

var passwords = fs.readFileSync(__dirname + '/../passwords.txt', 'utf-8').split('\r\n');
var dbURL = passwords[1] + ':' + passwords[2] + '@localhost:27017/frc-bracket';
var db = monk(dbURL);
var tba_teams = db.get("tba_teams"); //The Blue Alliance
var tba_events = db.get("tba_events"); //The Blue Alliance


module.exports.updateTeams = function(req, res) {
    updateTeamsHelp("0");
    res.status(200).send("done");
}

module.exports.updateEvents = function(req, res) {
  var year = "2016";
  getEvents(year).then(function(eventData) {
    for(var i = 0; i < eventData.length; i++) {
      var event = eventData[i];
      getEventTeams(event.key).then(function(event, eventTeamData) {
          event.teams = eventTeamData; // Need to delete null teams
          event.start_date = new Date(event.start_date);
          tba_events.update({key: event.key}, event, {upsert: true});
      }.bind(null, event));
    }
  });
    res.status(200).send("done");
}


function updateTeamsHelp(page) {
  getTeams(page).then(function(team_data) {
    for(var i = 0; i < team_data.length; i++) {
      var team = team_data[i];
      if(team.name) {
        tba_teams.update({key: team.key}, team, {upsert: true});
      }
    }
    console.log(team_data.length);
    if(team_data.length > 0) {
      updateTeamsHelp((Number(page) + 1).toString());
    }
  });
}


function getTeams(page) {
  var endpoint = 'api/v2/teams/' + page;
  var outputPromise = apiRequest(endpoint).then(promiseDone, promiseError);
  return outputPromise;
}

function getEvents(year) {
  var endpoint = 'api/v2/events/' + year;
  var outputPromise = apiRequest(endpoint).then(promiseDone, promiseError);
  return outputPromise;
}

function getEventTeams(eventKey) {
  var endpoint = 'api/v2/event/' + eventKey + '/teams';
  var outputPromise = apiRequest(endpoint).then(promiseDone, promiseError);
  return outputPromise;
}

function promiseDone(response, eventKey) {
  return JSON.parse(response[0].body);
}

function promiseError(error) {
  console.log(error);
  return {};
}

function apiRequest(endpoint) {
  var options = {
    url: 'https://thebluealliance.com/' + endpoint,
    headers: {
    'X-TBA-App-Id': 'frc2522:bracket-challenge:v0'
    }
  };
  return request_promise(options);
}