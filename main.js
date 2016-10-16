
// lat positive = North
// lat negative = South
// lon positive = West
// lon negative = East
// To DO : parse out NSEW for lon/lat

//get IP-based location Object

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

/*
console.log('DEBUG', locJson.city);
console.log('DEBUG', locJson.lat);
console.log('DEBUG', locJson.lon);
*/

// get weather at location

var wJson = {};
$.ajax(
  {
    url: "https://api.darksky.net/forecast/877c42bfced062f2b8e5cb98f65bb1ca/" + String(locJson.lat) + "," + String(locJson.lon),
    jsonp: "callback",
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      wJson=data;
    },
    cache: false
  });

console.log(wJson);



 // call DOM manipulate icon URL
