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
  var cuisine = "";


  //API call will get restaurants of type var cuisine in "searc query" near "coordinates" pre-set below
  $("#cuisine-find-btn").on("click", function() {
    cuisine = $("#cuisine-input").val().trim();

    rapid.call('Zomato', 'search', {
      'apiKey': `${apiKey}`,
      'coordinates': '42.032402, -87.741623',
      'entityType': 'city',
      'count': '20',
      'radiusSearch': '10000',
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
      console.log(random);
      console.log(payload);
      $("body").css("background-image", "url('assets/images/backgroundAt92Opacity.jpg')")
      $(".restaurant-name").html(payload.result.restaurants[random].restaurant.name);
      var address = payload.result.restaurants[random].restaurant.location.address
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
      $("#cuisine-find-btn")
        .css("grid-row", "7/8")
        .css("grid-column", "3/4")
        .css("margin-top", "0px");
      $(".restaurant-location")
        .html(`${shortenSuffix}`)
        .css("grid-column", "3/4")
        .css("margin-left", "10px")
        .css("align-self", "center");
      $(".restaurant-name")
        .css("grid-column", "3/4")
        .css("align-self", "center")
        .css("margin-left", "10px")
        .css("font-size", "50px")
      $("p.restaurant-name")
      .css("align-self", "center")
      .css("grid-row", "2/3")
      $(".cuisine")
      .html(`<span class="cuisine-text"><p>Cuisines:<br>${payload.result.restaurants[random].restaurant.cuisines}</p></span>`)
      .css("grid-row", "4/5")
      .css("grid-column", "1/2")

      $("#restaurant-rating").html(`<p class="rating-style"><span class="word-rating">Rating:</span><br>${payload.result.restaurants[random].restaurant.user_rating.aggregate_rating}<span class="out-of-5">/5</span></p>`);
      $(".restaurant-neighborhood")
        .html(`Neighborhood:<br>${payload.result.restaurants[random].restaurant.location.locality}`)
        .css("margin-left", "10px")
        .css("border-radius", "5px")
      $("#image")
        .html(`<a href="${payload.result.restaurants[random].restaurant.featured_image}" id="pop"><img src="${payload.result.restaurants[random].restaurant.featured_image}" class="img"></a>`)
        .css("grid-column", "1/2")
        .css("grid-row", "3/4");
      // NEW TECHNOLOGY: lightbox popup initialization code

        $('#pop').magnificPopup({
          type:'image',
          showCloseBtn: true,
          closeOnBgClick: true,
        });
      $("#menu")
        .html(`<a href='${payload.result.restaurants[random].restaurant.menu_url}' target='_blank'><p class="menu-text">See menu</p></a>`)
        .mouseover(function() {
          $(".menu-text").css("color","#ffff32");
        })
        .mouseout(function() {
          $(".menu-text").css("color","white")

        });
      $(".cost42").html(`<p class="average-cost"><span class="cost-text">Average cost for two:</span><br><span class="price-text">$${payload.result.restaurants[random].restaurant.average_cost_for_two}</span></p>`)
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



   // Initialize and add the map
function initMap() {
  // The location of Chicago
  var chicago = {lat: 41.881832, lng: -87.623177};
  // The map, centered at Chicago
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: chicago});
  // The marker, positioned at
  var marker = new google.maps.Marker({position: chicago, map: map});
}
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
  });

  // document . ready end
});
