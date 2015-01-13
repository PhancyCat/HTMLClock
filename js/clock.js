window.onload = function() {
  getTime();
};

function getTime() {
   var d = new Date();

   document.getElementById("time").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
   setTimeout(function() {getTime();}, 1000);
}

