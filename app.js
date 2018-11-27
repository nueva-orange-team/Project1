var config = {
  apiKey: "AIzaSyAv6qPLbatEhTwm-g_tSTjY_feouv09ir0",
  authDomain: "projectone-82a10.firebaseapp.com",
  databaseURL: "https://projectone-82a10.firebaseio.com",
  projectId: "projectone-82a10",
  storageBucket: "projectone-82a10.appspot.com",
  messagingSenderId: "1024336087473"
};
  firebase.initializeApp(config);

  var uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);