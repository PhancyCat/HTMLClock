var client_id;
var type;
var callback_function

function theCallback() {
   $.ajax({
   url: 'https://api.imgur.com/3/account/me',
   type: 'GET',
   beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + 
       window.localStorage.token);
   },
   data: {},
   success: function (data) {
      alert(data.data.url);
   }});
}

function init(jObj) {
   client_id = jObj['client_id'];
   type = jObj['type'];
   callback_function = jObj['callback_function'];
}

function login() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id=" + 
    client_id + "&response_type=" + type + "&state=" + 'someString', "Window");
}

$(document).window.ready(function() {
   init({
      client_id : "cfacebdde8b4858",
      type : "token",
      callback_function : theCallback
   });
});
