window.onload = function() {
  getTime();
  getTemp();
};

function getTemp() {
   $.getJSON( "https://api.forecast.io/forecast/fed31c96894876831452babdf8d14d2b/35.300399,-120.662362?callback=?", function( result ) {
      $("#forecastLabel").html(result.daily.summary);
      $("#forecastIcon").attr("src", "img/" + result.daily.icon + ".png");
      if (result.daily.data[0].temperatureMax < 60) {
         $("body").addClass("cold");
      } else if (result.daily.data[0].temperatureMax < 70) {
         $("body").addClass("chilly");
      } else if (result.daily.data[0].temperatureMax < 80) {
         $("body").addClass("nice");
      } else if (result.daily.data[0].temperatureMax < 90) {
         $("body").addClass("warm");
      } else {
         $("body").addClass("hot");
      }

   });
}

function getTime() {
   var d = new Date();

   document.getElementById("time").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
   setTimeout(function() {getTime();}, 1000);
   
}

