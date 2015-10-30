$(document).ready(function() {
  $("#create").click(function() {
    $.post("/api/createAccount", $("#accountData").serialize())
    .done(function(data) {
      //window.location.replace("verifyaccount.html");
    })
    .fail(function(err) {
      var response = JSON.parse(err.responseText);
      alert(response.message);
      console.log(response);
    });
  });
});