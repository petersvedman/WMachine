How to get icon URL
For code 501 - moderate rain icon = "10d"
URL is
http://openweathermap.org/img/w/10d.png

Switch to 10n.png if night time

var winky = [{
  "coord": {
    "lon": -122.09,
    "lat": 37.39
  },
  "sys": {
    "type": 3,
    "id": 168940,
    "message": 0.0297,
    "country": "US",
    "sunrise": 1427723751,
    "sunset": 1427768967
  },
  "weather": [{
    "id": 800,
    "main": "Clear",
    "description": "Sky is Clear",
    "icon": "01n"
  }],
  "base": "stations",
  "main": {
    "temp": 285.68,
    "humidity": 74,
    "pressure": 1016.8,
    "temp_min": 284.82,
    "temp_max": 286.48
  },
  "wind": {
    "speed": 0.96,
    "deg": 285.001
  },
  "clouds": {
    "all": 0
  },
  "dt": 1427700245,
  "id": 0,
  "name": "Mountain View",
  "cod": 200
}]
var weather = {
  location: "",
  skies: "",
  temp: 0,
  windSpeed: 0,
  windDirection: ""
}

function parseWinky() {
  // function to parse a winky
  // Make nicer strings
  var latString = '';
  var lonString = '';
  if (winky[0]['coord'].lat<0){latString = "South"}
  else {latString = "North"}
  if (winky[0]['coord'].lon<0){lonString = "West"}
  else {latString = "East"}

  //weather.location = String(Math.abs(winky[0]['coord'].lat)) + ' degrees '+ latString + ' ' + String(Math.abs(winky[0]['coord'].lon)) + ' degrees ' + lonString;
  weather.skies = winky[0]['weather'][0].description;
  weather.temp = Math.floor(winky[0]['main'].temp-273.15);
  weather.windSpeed = Math.round(winky[0]['wind'].speed);
  weather.windDirection = String(Math.floor(winky[0]['wind'].deg));
}


N, N by E, NNE, NE by N, NE, NE by E, ENE, E by N, E, E by S, ESE, SE by E, SE, SE by S, SSE, S by E, S, S by W, SSW, SW by S, SW, SW by W, WSW, W by S, W, W by N, WNW, NW by W, NW, NW by N, NNW, N by W, N



var geoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function geoSuccess(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  //call to getJSON data promises.

};

function geoError(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

// main start


if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
} else {
  /* geolocation IS NOT available */
  console.log("Sorry, no geolocation service Available")
}



//

var geoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var tempToggle = false;

var weatherUrl = "https://crossorigin.me/https://api.darksky.net/forecast/877c42bfced062f2b8e5cb98f65bb1ca/";

var wJson = {};

var winds = ['N', 'N by E', 'NNE', 'NE by N', 'NE', 'NE by E', 'ENE', 'E by N',
                    'E', 'E by S', 'ESE', 'SE by E', 'SE', 'SE by S', 'SSE', 'S by E',
                    'S', 'S by W', 'SSW', 'SW by S', 'SW', 'SW by W', 'WSW', 'W by S',
                    'W', 'W by N', 'WNW', 'NW by W', 'NW', 'NW by N', 'NNW', 'N by W' ];

// end global var section

//begin Skycon section



// begin AJAX section

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };
    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

function getJSON(url) {
  return get(url).then(JSON.parse);
}

function workItOut(data){

      wJson.temperature=Math.round((data.currently.temperature - 32) / 1.8);//temp to celsius
      wJson.windSpeed=Math.round(data.currently.windSpeed * (1609/3600)); //convert miles/hour to m/sec
      wJson.winds = winds[Math.floor(((data.currently.windBearing*1000)/11000))]; // find wind bearings
      wJson.summary=data.currently.summary;
      wJson.icon=data.currently.icon;
      console.log(wJson);

      document.getElementById("#temp").innerHTML = "Temperature " + String(wJson.temperature)+ "\u00B0" + " C";
      document.getElementById("#windSp").innerHTML = "Wind "+ String(wJson.windSpeed)+' m/sec'+ " from " + wJson.winds;
      document.getElementById("#skies").innerHTML = wJson.summary;

      var icons = new Skycons();
      icons.set('icon1', wJson.icon);
      icons.play();
}

function geoSuccess(pos) {
  var crd = pos.coords;
  // get cracking on the weather

  getJSON(weatherUrl+String(crd.latitude)+","+String(crd.longitude)).then(workItOut);

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  //call to getJSON data promises.

}

function geoError(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

// main start


if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
} else {
  /* geolocation IS NOT available */
  console.log("Sorry, no geolocation service Available");
}
