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


// var queryURL = "https://api.yelp.com/v3/";
// var apiKey = "8Em9E2JthZrHTdWxKOk08-mIEc-wA3P2WfNONM3pj8OXMkQmByxinWG3KwgbfeoTrfwuJ0HeTvIL27_wMdnNSppsW_i9Q2bMjU_CyvEe5VK8i9PD8qlEUwx51kLuW3Yx"
//
//
//
// $.ajax({
//   url: queryURL,
//   method: "GET",
//   headers: {
//     "accept": "application/json",
//     "Access-Control-Allow-Origin":"*",
//     "Authorization": `Bearer ${apiKey}`
// }
// }).then(function(res) {
// var results = res.data
// console.log(results);
// })
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
    $(".container-two").removeClass("hidden");
  });
};

function loginWithGoogle() {
  console.log("Google login button clicked")

};

$("#loginWGithub").on("click", loginWithGitHub);
$("#loginWGoogle").on("click", loginWithGoogle);
