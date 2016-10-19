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
