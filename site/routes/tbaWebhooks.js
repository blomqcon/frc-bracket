var Q = require('q');
var request = require('request');
var request_promise = Q.denodeify(request);
var fs = require('fs');
var jwt = require('jwt-simple');
var mongo = require('mongodb');
var monk = require('monk');
var jwt = require('jwt-simple');
var _ = require('underscore');

var passwords = fs.readFileSync(__dirname + '/../passwords.txt', 'utf-8').split('\r\n');
var db = monk(passwords[1] + ':' + passwords[2] + '@localhost:27017/frc-bracket');
var tba_teams = db.get("tba_teams"); //The Blue Alliance



module.exports.updateTeams = function(req, res) {
  console.log(req.body);
  res.status(200).send("done");
}

