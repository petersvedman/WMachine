var tempToggle = false;

$(document).ready(function(){
//get IP-based location Object
 //True = fahrenheit, false = celsius
var locJson = (function () {
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
console.log(locJson);
// get weather at location
var wJson = {};
$.ajax({
    url: "https://api.darksky.net/forecast/877c42bfced062f2b8e5cb98f65bb1ca/" + String(locJson.lat) + "," + String(locJson.lon),
    jsonp: "callback",
    dataType: "jsonp",
    success: function(data) {
      wJson['temperature']=data.currently.temperature;
      wJson['windSpeed']=Math.round(data.currently.windSpeed * (1609/3600)); //convert miles/hour to m/sec
      wJson['windCearing']=data.currently.windBearing;
      wJson['summary']=data.currently.summary;
      wJson['icon']=data.currently.icon;
      var winds = ['N', 'N by E', 'NNE', 'NE by N', 'NE', 'NE by E', 'ENE', 'E by N',
                    'E', 'E by S', 'ESE', 'SE by E', 'SE', 'SE by S', 'SSE', 'S by E',
                    'S', 'S by W', 'SSW', 'SW by S', 'SW', 'SW by W', 'WSW', 'W by S',
                    'W', 'W by N', 'WNW', 'NW by W', 'NW', 'NW by N', 'NNW', 'N by W' ];
      wJson['winds'] = winds[Math.floor(((wJson.windCearing*1000)/11000))];
      if (!tempToggle){
        wJson.temperature = Math.round((wJson.temperature - 32) / 1.8);
      }
      $('#location').text(locJson.city);
      //$('#locLat').text(String(locJson.lat));
      //$('#locLon').text(String(locJson.lon));
      $('#temp').text("Temperature "  + String(wJson.temperature)+ "\u00B0" + " C");
      //$('#wind




 // call DOM manipulate icon URLDir').text(wJson.winds);
      $('#windSp').text("Wind "+ String(wJson.windSpeed)+' m/sec'+ " from " + wJson.winds);
      $('#skies').text(wJson.summary);
      var icons = new Skycons();
      icons.set('icon1', wJson.icon);
      icons.play();
    },
    cache: false
  });


$('#tempTogg').click(function(){
    tempToggle=!tempToggle;
    if(!tempToggle){
      $('#temp').text("Temperature "  + String(wJson.temperature)+ "\u00B0" + " C");
    }
    else {
      $('#temp').text("Temperature " + String((wJson.temperature*1.8)+32)+ "\u00B0" + " F");
    }
});

});
