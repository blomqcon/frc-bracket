var jwt = require('jwt-simple');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('user:password@localhost:27017/frc-bracket');
var accounts = db.get("accounts");
var serviceAccounts = db.get("serviceAccounts");
var jwt = require('jwt-simple');
var _ = require('underscore');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter;

serviceAccounts.findOne({user: "support@royalrobotics.org"}, function (err, doc) {
  console.log(err);
  console.log(doc.password);
  transporter = nodemailer.createTransport(smtpTransport({
    host: 'firstwa.net',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'support@royalrobotics.org',
        pass: doc.password
    },
    tls: {
        rejectUnauthorized: false
    }
  }));
});


var loginTokens = [];

/*************** API ***************/
module.exports.createAccount = function(req, res) {
  if(!validateCreateAccount(req.body)) {
    res.status(400).send({code: 41, message: 'one or more parameters is not well formed'});
    return false;
  }
  //check if the email exists
  accounts.find({ email: {$exists: true, $in: [new RegExp('^' + req.body.email + '$', 'i')]}, verified: true}, function (err, docs) {
    if(err) {
      console.log("Database error when checking if account exists");
      res.status(500).send({code: 51, message: '" + err + "'});
      return false;
    } else if(docs.length > 0) {
      console.log("Account already exisits");
      res.status(400).send({code: 42, message: 'account with this email already exisits'});
      return false;
    }
    //insert the account
    var newAccount = req.body;
    delete newAccount['confirmPassword'];
    newAccount.created = Date.now();
    newAccount.predictions = [];
    newAccount.verified = false;
    newAccount.verificationCode = sendVerificationEmail(newAccount.email, req.app.get('jwtTokenSecret'));
    accounts.update({email: newAccount.email}, newAccount, {upsert: true}); //Fix: passwords are currently stored in the clear
    console.log("Account created");
    res.status(200).send({code: 0, message: 'account created'});
    
  });
  return true;
}

module.exports.loginAccount = function(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;
  
  accounts.findOne({email: userName, password: password, verified: true}, function (err, docs) {
    if(err) {
      console.log("Database error when checking if account exists");
      res.status(500).send({code: 51, message: '" + err + "'});
    } else if(!docs) {
      console.log("Failed login : " + userName + " - " + password);
      res.status(401).send("Invalid credentials");
    } else {
      console.log('Login: ' + userName);
      var now = new Date();
      var token = jwt.encode({
        userName: userName,
        expires: now.setDate((now).getDate() + 3)
      }, req.app.get('jwtTokenSecret'));
      console.log(token);
      addToTokens(loginTokens, token, userName, req.app.get('jwtTokenSecret'));
      res.status(200).send({ access_token: token, userName: userName });
    }
  });
}

module.exports.logoutAccount = function(req, res) {
    if(req.cookies.userInfo && isJsonString(req.cookies.userInfo)
          && JSON.parse(req.cookies.userInfo).accessToken) {
      var token = JSON.parse(req.cookies.userInfo).accessToken;
      console.log(token);
      var decodedToken = jwt.decode(token, req.app.get('jwtTokenSecret'));
      console.log('Logout: ' + decodedToken.userName);
      removeFromTokens(token);
    }
    res.status(200).send();
}

module.exports.requiresAuthentication = function(req, res) {
  if (req.cookies.userInfo && isJsonString(req.cookies.userInfo) && JSON.parse(req.cookies.userInfo).accessToken) {
    var token = JSON.parse(req.cookies.userInfo).accessToken;
    if (_.where(loginTokens, token).length > 0) {
      var decodedToken = jwt.decode(token, req.app.get('jwtTokenSecret'));
      if (decodedToken.expires > Date.now()) {
        return true;
      } else {
        removeFromTokens(token);
        res.status(401).send("Your session is expired");
        return false;
      }
    } else {
      res.status(401).send("Access token not found on server");
      return false;
    }
  } else {
    res.status(401).send("No access token found in the request");
    return false;
  }
}

module.exports.verifyAccount = function(req, res) {
  var code = req.params.code;
  accounts.update({verificationCode: code}, {$set: {verified: true}}, function(err, doc) {
    if(err) {
      console.log("Database error while verifying account");
      res.status(500).send({code: 51, message: '" + err + "'});
    } else if(doc < 1){
      console.log('invalid verification token');
    } else {
      console.log('account verified');
    }
  });
  res.redirect('/signin');
}

/***** private *****/
module.exports.isLoggedIn = function(req, res) {
  if (req.cookies.userInfo && isJsonString(req.cookies.userInfo) &&
        JSON.parse(req.cookies.userInfo).accessToken) {
    var token = JSON.parse(req.cookies.userInfo).accessToken;
    if (_.where(loginTokens, token).length > 0) {
      var decodedToken = jwt.decode(token, req.app.get('jwtTokenSecret'));
      if (decodedToken.expires > Date.now()) {
        return true;
      } else {
        removeFromTokens(token);
      }
    }
  }
  return false;
}

function sendVerificationEmail(address, secretToken) {
  
  var verificationCode = jwt.encode(address, secretToken);
  
  var mailOptions = {
    from: 'FRC Bracket Verification <support@royalrobotics.org>',
    to: address,
    subject: 'FRC Bracket Account Verification', 
    text: 'Verifiy FRC Bracket Account:\nTo finish setup please click on the following link or paste it in a web browser: http://192.99.169.9:3001/api/verifyaccount/' + verificationCode
  };
   
  transporter.sendMail(mailOptions, function(error, info) {
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
   
  });
  
  return verificationCode;
}

/*************** Util ***************/
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function addToTokens (loginTokens, newToken, userName, tokenSecret) {
  //This wont scale well but will keep active login tokens clean.
  for(var i = 0; i < loginTokens.length; i++) {
    var token = loginTokens[i];
    var decodedToken = jwt.decode(token, tokenSecret);
    if(decodedToken.userName = userName) {
      loginTokens.splice(i, 1); i--;
      break;//Should only be 1 token for each user
    }
  }
  loginTokens.push(newToken);
}

function removeFromTokens(token) {
  for (var counter = 0; counter < loginTokens.length; counter++) {
    if (loginTokens[counter] === token) {
      loginTokens.splice(counter, 1);
      break;
    }
  }
}

function validateCreateAccount(body) {
  if(body.firstName == null || body.firstName == "") return false;
  if(body.lastName == null || body.lastName == "") return false;
  if(body.email == null || body.email == "") return false;
  if(!body.email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)) return false;
  if(body.password.length < 6) return false;
  if(body.password !== body.confirmPassword) return false;
  //if(isNaN(body.teamNum) || !Number.isInteger(Number(body.teamNum))) return false;
  if(isNaN(body.teamNum)) return false;
  if(Number(body.teamNum) < 1 || Number(body.teamNum) > 10000) return false;
  return true;
}

/*************** DEBUG ***************/
module.exports.printTokens = function(req, res) {
  console.log(loginTokens);
  res.status(200).send("Printed tokens to console");
}


module.exports.removeDuplicateExpiredTokens = function(req, res) {
  var loggedInUsers = [];
  
  _.each(loginTokens, function(token, index) {
    var decodedToken = jwt.decode(token, req.app.get('jwtTokenSecret'));
    if((Date.now() > decodedToken.expires) || _.contains(loggedInUsers, decodedToken.userName)) {
        loginTokens.splice(index, 1);
        console.log("removed");
    } else {
      loggedInUsers.push(decodedToken.userName);
    }
  });
  console.log(loginTokens);
  res.status(200).send("Duplicate and expired tokens removed");
}