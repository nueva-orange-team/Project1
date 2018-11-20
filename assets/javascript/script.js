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
$("#cuisine-find-btn").on("click", function(){
cuisine = $("#cuisine-input").val().trim();

rapid.call('Zomato', 'search', {
	'apiKey': '7a92ebe9a7f0e1c5487a3ea08e3ef1e2',
	'coordinates': '42.032402, -87.741623',
	'entityType': 'city',
	'count': '20',
	'radiusSearch': '10000',
	'entityId': '292',
	'searchQuery': cuisine,
	'offset': '0',
	// 'sort': 'realDistance'

<<<<<<< Updated upstream
}).on('success', function (payload) {
  var random = Math.floor((Math.random() * 19) + 0);
  console.log(random);
  console.log(payload);
  $(".restaurant-name").html(payload.result.restaurants[random].restaurant.name);
  $(".restaurant-location").html(payload.result.restaurants[random].restaurant.location.address);
  $(".restaurant-rating").html(payload.result.restaurants[random].restaurant.user_rating.aggregate_rating);
}).on('error', function (payload) {
=======
}).on('success', function(payload) {
  var random = Math.floor((Math.random() * 19) + 0);
  console.log(random);
    console.log(payload);
    $(".restaurant-name").html(payload.result.restaurants[0].restaurant.name);
    $(".restaurant-location").html(payload.result.restaurants[0].restaurant.location.address);
    $(".restaurant-rating").html(payload.result.restaurants[0].restaurant.user_rating.aggregate_rating);
}).on('error', function(payload) {
>>>>>>> Stashed changes
	 /*YOUR CODE GOES HERE*/
});
});

// We may possibly use the below code to run another API call.
$("#submit-btn").on("click", function(){
var userInput = $("#user-input").val().trim();
console.log(userInput)
$("#user-input").val("")
// run AJAX call inside the button click event
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
