$(document).ready(function() {
  //If already logged in redirect to bracket
  $.get("/api/isLoggedIn")
    .done(function(data) {
      window.location.replace("bracket.html");
    });
  
  $("#signin").click(function() {
    $.post("/api/loginAccount", $("#accountData").serialize())
    .done(function(data) {
      window.location.replace("bracket.html");
    })
    .fail(function(err) {
      alert(err.responseText);
      console.log(err.responseText);
    });
  });
});