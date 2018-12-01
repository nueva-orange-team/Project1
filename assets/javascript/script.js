var cuisine = "";
var address;
var map;
var marker;
var stringLat;
var stringLon;
var floatLat;
var floatLon;
var newCoords;
var lon;
var lat;
console.log(newCoords)
var logIn = false;


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAP32QvCD4ukQGZp5neVVqxj2vTGYDPwpk",
  authDomain: "team-orange-project-1.firebaseapp.com",
  databaseURL: "https://team-orange-project-1.firebaseio.com",
  projectId: "team-orange-project-1",
  storageBucket: "team-orange-project-1.appspot.com",
  messagingSenderId: "170221533069"
};
firebase.initializeApp(config);

var database = firebase.database();



//Zomato API to find restaurant
var apiKey = "7a92ebe9a7f0e1c5487a3ea08e3ef1e2";

var rapid = new RapidAPI("default-application_5bd7a6a6e4b0a5d5a03b6ba4", "388648e2-e45b-4a7d-a751-a2e38784ef00");

//variable to hold what kind of restaurant user is looking for


// navigator.geolocation.getCurrentPosition(gotLocation, showError);

var x = $("#nav-error");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotLocation);
  } else {
    x.html("Geolocation is not supported by this browser.")
  }
}


getLocation()

function gotLocation(currentLocation) {
if (gotLocation) {
  x.html("<p class='error-text'>Thanks, you must be hungry af</p>")
}
  lat = currentLocation.coords.latitude;
  lon = currentLocation.coords.longitude;
  stringLat = JSON.stringify(lat);
  stringLon = JSON.stringify(lon);
  floatLon = parseFloat(stringLon)
  floatLat = parseFloat(stringLat)
  newCoords = stringLat + "," + stringLon;
}


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.html("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      x.html("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      x.html("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      x.html("An unknown error occurred.")
      break;
  }
}

//API call will get restaurants of type var cuisine in "searc query" near "coordinates" pre-set below
$("#cuisine-find-btn").on("click", function() {
  cuisine = $("#cuisine-input").val().trim();
x.hide()

  rapid.call('Zomato', 'search', {
    'apiKey': `${apiKey}`,
    'coordinates': newCoords,
    'entityType': 'city',
    'count': '20',
    'sort': 'realDistance',
    'radiusSearch': '1000',
    'entityId': '292',
    'searchQuery': cuisine,
    'offset': '0',
    'headers': {
      "accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

  }).on('success', function(payload) {
    console.log(payload);

    var random = Math.floor((Math.random() * 19) + 0);
    var rLat = payload.result.restaurants[random].restaurant.location.latitude;
    var rLon = payload.result.restaurants[random].restaurant.location.longitude;
    var parseRLat = parseFloat(rLat);
    var parseRLon = parseFloat(rLon)

    // would like to take these values and create markers on the google map to show distance between user current location and the restaurant
    console.log(`restaurants latitude: ${payload.result.restaurants[random].restaurant.location.latitude}`)
    console.log(`restaurants longitude: ${payload.result.restaurants[random].restaurant.location.longitude}`)
    $(".restaurant-name").html(payload.result.restaurants[random].restaurant.name);
    address = payload.result.restaurants[random].restaurant.location.address;
    var shortenSuffix = address
      .replace("Avenue", "Ave.")
      .replace("Avenue,", "Ave.")
      .replace("Street", "St.")
      .replace("Boulevard", "Blvd.,")
      .replace("Street,", "St.")
      .replace("North", "N")
      .replace("South", "S")

    $("#cuisine-input")
      .css("grid-row", "4/5")
      .css("grid-column", "2/4")
      .css("width", "70%")
      .css("align-self", "flex-start");

    $(".average-cost").css("align-self", "center")


    $("#cuisine-find-btn")
      .css("grid-row", "4/5")
      .css("grid-column", "3/5")
      .css("margin-top", "0px");

    $(".restaurant-location")
      .css("color", "black")
      .css("font-size", "30px")
      .html(`${shortenSuffix}`)
      .css("grid-column", "3/4")
      .css("grid-row", "6/7")
      .css("margin-left", "10px")
      .css("align-self", "center");

    $(".restaurant-name")
      .css("grid-column", "3/4")
      .css("align-self", "center")
      .css("margin-left", "10px")
      .css("font-size", "30px")

    $("p.restaurant-name")
      .css("color", "black")
      .css("align-self", "center")
      .css("grid-row", "5/6")

    $(".cuisine")
      .html(`<span class="cuisine-text"><p>Cuisines:<br>${payload.result.restaurants[random].restaurant.cuisines}</p></span>`)
      .css("grid-row", "8/9")
      .css("grid-column", "2/3")
      .css("justify-content", "center")

    $("#restaurant-rating").html(`<p class="rating-style"><span class="word-rating">Rating:</span><br>${payload.result.restaurants[random].restaurant.user_rating.aggregate_rating}<span class="out-of-5">/5</span></p>`);

    $(".restaurant-neighborhood")
      .html(`Neighborhood:<br>${payload.result.restaurants[random].restaurant.location.locality}`)
      .css("margin-left", "10px")
      .css("border-radius", "5px")
      .css("grid-column", "3/4")
      .css("grid-row", "7/8")
      .css("color", "black");

    var imageLink = payload.result.restaurants[random].restaurant.featured_image;

    if (imageLink === "") {
      $("#image")
        .html("<img src='assets/images/noPhoto.png'>")
        .css("grid-column", "2/3")
        .css("grid-row", "6/8")
        .css("align-self", "center")
        .css("text-align", "center")
      console.log("There's no photo here");
    } else {
      $("#image")
        .html(`<a href="${payload.result.restaurants[random].restaurant.featured_image}" id="pop"><img src="${payload.result.restaurants[random].restaurant.featured_image}" class="img"></a>`)
        .css("grid-column", "2/3")
        .css("grid-row", "6/8")
        .css("align-self", "center")
        .css("text-align", "center");
    }

    // NEW TECHNOLOGY: lightbox popup initialization code

    $('#pop').magnificPopup({
      type: 'image',
      showCloseBtn: true,
      closeOnBgClick: true,
    });
    $("#menu")
      .html(`<a href='${payload.result.restaurants[random].restaurant.menu_url}' target='_blank'><p class="menu-text">See menu</p></a>`)
      .mouseover(function() {
        $(".menu-text").css("color", "#ffa500");
      })
      .mouseout(function() {
        $(".menu-text").css("color", "black")
      });

    $(".cost42").html(`<p class="average-cost">Average cost for two: $${payload.result.restaurants[random].restaurant.average_cost_for_two}</p>`)
  }).on('error', function(payload) {
    /*YOUR CODE GOES HERE*/
  });
  // changes the submit button text
  $("#cuisine-input").val("");
  if ($("#cuisine-input").val() === "") {
    $("#cuisine-find-btn").text("Get another option")
  } else {
    $("#cuisine-find-btn").text("Find This Cuisine Near Me!")
  }
});
// function that changes the submit button text
$("#cuisine-input").on("keydown", function() {
  $("#cuisine-find-btn").text("Find This Cuisine Near Me!")
});


function loginWithGitHub() {
  console.log("Github login button clicked")
  var provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    window.location("homepage.html") // make second page put in here
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


};

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
   // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
};

function loginWithGoogle() {
  console.log("Google login button clicked")
};

function signout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error)
    // An error happened.
  });
  console.log("sign out clicked")
}

$("#loginWGithub").on("click", loginWithGitHub);
$("#loginWGoogle").on("click", onSignIn);
$("#loginWGoogle").on("click", loginWithGoogle);
$("#signout").on("click", signout);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(`${user.displayName} signed in with email: ${user.email}`)
    // User is signed in.
  } else {
    console.log("No user is signed in")
    // No user is signed in.
  }
});




$(function() {
  $('body').removeClass('fade-out');
});