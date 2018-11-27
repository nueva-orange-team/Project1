$(document).ready(function() {
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

  //Zomato API to find restaurant
  var apiKey = "7a92ebe9a7f0e1c5487a3ea08e3ef1e2";

  var rapid = new RapidAPI("default-application_5bd7a6a6e4b0a5d5a03b6ba4", "388648e2-e45b-4a7d-a751-a2e38784ef00");

  //variable to hold what kind of restaurant user is looking for
  var cuisine;
  var address;
  var map;
  var marker;
  var stringLat;
  var stringLon;

  navigator.geolocation.getCurrentPosition(gotLocation);

  function gotLocation(hunger) {
      $("#hud").hide();
  console.log(hunger);
     var lat = hunger.coords.latitude;
     var lon = hunger.coords.longitude;
  return
     stringLat = JSON.stringify(lat);
     stringLon = JSON.stringify(lon);
  
  //    console.log(lat);
  //    console.log(lon);
  
     console.log(stringLat);
     console.log(stringLon);
     console.log(typeof(stringLat));
  }
  //API call will get restaurants of type var cuisine in "searc query" near "coordinates" pre-set below
  $("#cuisine-find-btn").on("click", function() {
    cuisine = $("#cuisine-input").val().trim();
   gotLocation();
    rapid.call('Zomato', 'search', {
      'apiKey': `${apiKey}`,
      'coordinates': stringLat,  stringLon,
      'entityType': 'city',
      'count': '20',
      'radiusSearch': '1000',
      'entityId': '292',
      'searchQuery': cuisine,
      'offset': '0',
      'headers': {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
      // 'sort': 'realDistance'

    }).on('success', function(payload) {
      var random = Math.floor((Math.random() * 19) + 0);
      $(".modal-btn").removeClass("hidden");
      console.log(random);
      console.log(payload);
      $(".restaurant-name").html(payload.result.restaurants[random].restaurant.name);
      address = payload.result.restaurants[random].restaurant.location.address
      console.log(address);
      var shortenSuffix = address
        .replace("Avenue", "Ave.")
        .replace("Avenue,", "Ave.")
        .replace("Street", "St.")
        .replace("Boulevard", "Blvd.,")
        .replace("Street,", "St.")
        .replace("North", "N")
        .replace("South", "S")
      // .replace("South", "S.")



      console.log(shortenSuffix)
      $("#cuisine-input")
        .css("grid-row", "6/7")
        .css("grid-column", "3/4")
        .css("width", "75%")
        .css("align-self", "start");
      $(".average-cost").css("align-self", "center")
      $(".cost42")
        .css("background", "#990000")
        .css("opacity", "0.9")
        .css("border-radius","5px");
      $("#cuisine-find-btn")
        .css("grid-row", "7/8")
        .css("grid-column", "3/4")
        .css("margin-top", "0px");
      $(".restaurant-location")
        .html(`${shortenSuffix}`)
        .css("grid-column", "3/4")
        .css("background", "grey")
        .css("opacity", "0.9")
        .css("border", "10px solid #2E6D02")
        .css("align-self", "center");
      $(".restaurant-name")
        .css("grid-column", "3/4")
        .css("align-self", "center")
        .css("background", "grey")
        .css("opacity", "0.9")
        .css("border", "10px solid #2E6D02");
        $("p.restaurant-name").css("align-self", "center")

      $(".cuisine").css("align-self", "center");
      $("#restaurant-rating").html(`<p class="rating-style">${payload.result.restaurants[random].restaurant.user_rating.aggregate_rating}<span class="out-of-5">/5</span></p>`);
      $(".restaurant-neighborhood")
        .html(`Neighborhood:<br>${payload.result.restaurants[random].restaurant.location.locality}`)
        .css("background", "grey")
        .css("opacity", "0.9")
        .css("border", "10px solid #2E6D02");
        var imgNum = Math.floor((Math.random() * 50) + 0);
      $("#image").html(`<img src="${payload.result.restaurants[random].restaurant.featured_image}" class="img" data-lightbox="image-${imgNum}">`)
      $(".cuisine").html(`<span class="cuisine-text"><p>Cuisines:<br>${payload.result.restaurants[random].restaurant.cuisines}</p></span>`)
      // $("#menu")
      //   .html(`<a href='${payload.result.restaurants[random].restaurant.menu_url}' target='_blank'><span class="menu-text"><p>See menu</p><span></a>`)
      //   .css("background", "black")
      //   .css("opacity", "0.9")
      //   .mouseover(function() {
      //     $(this).css("opacity","1");
      //     $(this).css("background","#3a3636")
      //   })
      //   .mouseout(function() {
      //     $(this).css("opacity","0.9")
      //     $(this).css("background","black")
      //   });


   
      $(".cost42").html(`<p class="average-cost"><span class="cost-text">Average cost for two:</span><br><span class="price-text">$${payload.result.restaurants[random].restaurant.average_cost_for_two}</span></p>`)
    }).on('error', function(payload) {
      /*YOUR CODE GOES HERE*/
    });
    $("#cuisine-input").val("");
    if ($("#cuisine-input").val() === "") {
      $("#cuisine-find-btn").text("Get another option")
    } else {
      $("#cuisine-find-btn").text("Find This Cuisine Near Me!")
    }
  });

  $("#cuisine-input").on("keydown", function() {
    $("#cuisine-find-btn").text("Find This Cuisine Near Me!")
  });

  // We may possibly use the below code to run another API call.
  $("#submit-btn").on("click", function() {
    var userInput = $("#user-input").val().trim();
    console.log(userInput)
    $("#user-input").val("")
    // run AJAX call inside the button click event
  });



   // Initialize and add the map
function initMap() {
  // The location of Chicago
  var chicago = {lat: 41.881832, lng: -87.623177};
  // The map, centered at Chicago
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: chicago});
  // The marker, positioned at
  marker = new google.maps.Marker({position: chicago, map: map});
};

initMap();

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
  })
  // document . ready end
});
