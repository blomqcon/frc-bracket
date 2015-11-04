$(document).ready(function() {
  //If already logged in redirect to bracket
  /*$.get("/api/isLoggedIn")
    .done(function(data) {
      window.location.replace("bracket.html");
    });*/
  
  $("#signin").click(function() {
    var userName = $("#userName").val();
    var password = $("#password").val();
    login(userName, password, "bracket");
  });
  
});