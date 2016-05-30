// a winky is a JSON object from OpenWeather
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
  temp: 0
}

function parseWinky() {
  // function to parse a winky
  weather.location = String(winky[0]['coord'].lon) + ' ' + String(winky[0]['coord'].lat);
  weather.skies = winky[0]['weather'][0].main;
  weather.temp = winky[0]['main'].temp;
}

parseWinky();
console.log(weather.location, weather.skies, weather.temp)