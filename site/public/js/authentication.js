var userInfo;
function init() {
  if ($.cookie("userInfo")) {
    userInfo = JSON.parse($.cookie("userInfo"));
  }
}
init();

function login(userName, password, redirect) {
  $.post("/api/loginAccount", { userName: userName, password: password })
  .done(function(result) {
    userInfo = {
      accessToken: result.access_token,
      userName: result.userName
    };
    $.cookie("userInfo", JSON.stringify(userInfo), { expires : 3 });
    if(redirect) {
      window.location.replace(redirect); 
    }
  })
  .fail(function(err) {
    alert(err.responseText);
    console.log(err.responseText);
  });
}


function logout(redirect) {
  $.post("/api/logoutAccount", {})
  .done(function(result) {
    $.cookie("userInfo", JSON.stringify(userInfo), { expires : -1 });
    userInfo = undefined;
    if(redirect) {
      window.location.replace(redirect); 
    }
  })
  .fail(function(err) {
    alert(err.responseText);
    console.log(err.responseText);
  });
}