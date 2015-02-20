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


function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm (time, alarmName) {
	var div = $("<div/>"), div2 = $("<div id='div2' class='name'/>"), div3 = $("<div id='div3' class='time'/>");
	div.addClass("flexable");
	div.append(div2, [div3]);
	div2.html(alarmName);
	div3.html(time); 
	$("#alarms").append(div);
	div.id = alarmName;
}

function addAlarm() {
	var hours, mins, ampm, alarmName, time;
	hours = $("#hours option:selected").text();
	mins = $("#mins option:selected").text();
	ampm = $("#ampm option:selected").text();
	alarmName = $('#alarmName').val();
	time = hours + ":" + mins + ampm;
	
	var AlarmObject = Parse.Object.extend("Alarm");
	 var alarmObject = new AlarmObject();
		alarmObject.save({"alarmName": alarmName, "times" : time}, {
		success: function(object) {
		 	insertAlarm(time, alarmName);
			hideAlarmPopup();
		}
	 });
}

function deleteAlarm() {
	var al;
	al = $('deleter').val();
	deleteAl(al);
}

function deleteAl(alName) {
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.find({
	  success: function(results) {
		 for (var i = 0; i < results.length; i++) { 
		   if (results[i].get("alarmName") == alName) {
		   	result[i].destroy({});
		   }
		 }
	  }
	});
}

function getAllAlarms() {
	Parse.initialize("o0FiB6B8rRr6Gjpl96APRyugNxMrkVB23dbAatB3", "wTPmE1UZcLDX05KR3YLMwi8yKMIg1VDWt3v6r5AG");
	
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.find({
	  success: function(results) {
		 for (var i = 0; i < results.length; i++) { 
		   insertAlarm(results[i].get("times"), results[i].get("alarmName"));
		 }
	  }
	});

}


function signinCallback(authResult) {
	if (authResult['status']['signed_in']) {
   	document.getElementById('signinButton').setAttribute('style', 'display: none');
      getAllAlarms();
   	gapi.auth.setToken(authResult);
   	gapi.client.load('plus', 'v1').then(makeRequest);
 		
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function makeRequest() {
	var request = gapi.client.plus.people.get(
	{
		 'userId': 'me'
	});
	request.execute(function (res)
	{
		 var str = "Name:" + res['displayName'];
		 document.getElementById("userName").innerHTML = str;
   });
}










