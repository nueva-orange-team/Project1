$("#error").hide();
$("#hud").show();



navigator.geolocation.getCurrentPosition(gotLocation);

function gotLocation(hunger) {
    $("#hud").hide();
console.log(hunger);
   var lat = hunger.coords.latitude;
   var lon = hunger.coords.longitude;

   console.log(lat);
   console.log(lon);


}