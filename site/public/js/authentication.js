var userInfo;
function init() {
  //if (window.localStorage.getItem("userInfo")) {
  if ($.cookie("userInfo")) {
    //userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    userInfo = JSON.parse($.cookie("userInfo"));
  }
}
init();


function login(userName, password) {
  $.post("/api/loginAccount", { userName: userName, password: password })
  .done(function(result) {
    userInfo = {
      accessToken: result.access_token,
      userName: result.userName
    };
    //window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    $.cookie("userInfo", JSON.stringify(userInfo), { expires : 1 });
    
  })
  .fail(function(err) {
    alert("login failed");
  });
}