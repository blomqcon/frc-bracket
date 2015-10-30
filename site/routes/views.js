module.exports.index = function(req, res) {
  res.render('layouts/index.hbs');
};

module.exports.signin = function(req, res) {
  res.render('layouts/default.hbs', {whichPartial: 'signin_body'});
};

module.exports.createaccount = function(req, res) {
  res.render('layouts/default.hbs', {whichPartial: 'createaccount_body'});
}

module.exports.verifyaccount = function(req, res) {
  res.render('layouts/default.hbs', {whichPartial: 'verifyaccount_body'});
};

module.exports.bracket = function(req, res) {
  res.render('layouts/default.hbs', {whichPartial: 'bracket_body'});
};