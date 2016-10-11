// a winky is a JSON object from OpenWeather
// lat positive = North
// lat negative = South
// lon positive = West
// lon negative = East
// To DO : parse out NSEW for lon/lat

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

//get IP-based location Object

var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://ip-api.com/json/",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

console.log('DEBUG', json.city);
// call OpenWeather with getIp['lat'], getIp['lon']

var iconToDisplay = String(winky[0]['weather'][0].icon)
console.log(iconToDisplay);
var imageURL = 'http://openweathermap.org/img/w/'+iconToDisplay+'.png';

 // call DOM manipulate icon URL




parseWinky();
console.log(weather.location, weather.skies, weather.temp, weather.windSpeed, weather.windDirection);
