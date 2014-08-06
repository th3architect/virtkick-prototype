//= require vendor/jquery-2.1.0.min.js
//= require bootstrap
//= require vendor/bootstrap-combobox.js
//= require vendor/bootstrap-sortable.js

$(function() {
  var token = 'remember-dismiss';
  if(document.cookie.indexOf(token) == -1) {
    $('.prototype-alert').removeClass('hidden');
  }

  $('.dismiss').click(function() {
    document.cookie = token;
  });
});
