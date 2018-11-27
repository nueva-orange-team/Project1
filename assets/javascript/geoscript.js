$("#error").hide();
$("#hud").show();



navigator.geolocation.getCurrentPosition(gotLocation);

function gotLocation(hunger) {
    $("#hud").hide();
console.log(hunger);
   var lat = hunger.coords.latitude;
   var lon = hunger.coords.longitude;

   var stringLat = String(lat);
   var stringLon = String(lon);

//    console.log(lat);
//    console.log(lon);

   console.log(stringLat);
   console.log(stringLon);


}