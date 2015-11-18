var Q = require('q');
var request = require('request');
var request_promise = Q.denodeify(request);
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/frc-bracket');
var accounts = db.get("thebluealliance");

//api
module.exports.getPredictions = function(req, res) {

}

/*setInterval(function() {
  getTeam('frc2522').then(function(team_data) {
      console.log(team_data);
    })
  
}, 5000);*/




function getTeams(group) {
  var endpoint = 'api/v2/teams/' + group;
  var outputPromise = apiRequest(endpoint).then(promiseDone, promiseError);
  return outputPromise;
}

function getTeam(team) {
  var endpoint = 'api/v2/team/' + team;
  var outputPromise = apiRequest(endpoint).then(promiseDone, promiseError);
  return outputPromise;
}

function promiseDone(response) {
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