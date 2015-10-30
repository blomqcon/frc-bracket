var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/frc-bracket');
var accounts = db.get("accounts");

//api
module.exports.getPredictions = function(req, res) {
  var loginServices = req.app.get('loginServices');
  if(! loginServices.requiresAuthentication(req, res)) {
    return false;
  } else {
    res.status(200).send("YOU ARE LOGGED IN");
    return true;
  }
}