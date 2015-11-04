module.exports.index = function(req, res) {
  var authenticationAPI = req.app.get('authenticationAPI');
  var loggedIn = authenticationAPI.isLoggedIn(req, res);
  res.render('layouts/index.hbs', {loggedIn: loggedIn});
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