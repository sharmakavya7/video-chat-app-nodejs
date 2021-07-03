var firebaseConfig = {
    apiKey: "AIzaSyAt2TW7kvzbyyWlPn7KF_j1h-wIgiatFZ8",
    authDomain: "video-chat-app-f3086.firebaseapp.com",
    projectId: "video-chat-app-f3086",
    storageBucket: "video-chat-app-f3086.appspot.com",
    messagingSenderId: "208057507301",
    appId: "1:208057507301:web:88e9f7e408c44ea02b630c",
    measurementId: "G-SG1SKR042R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  const auth =  firebase.auth();

  //signup function
  function signUp(){
    var email = document.getElementById('email');
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    alert("SignUp Successfully");
    location.href="/teams";
  }

  //signIN function
  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.then(() => {
      console.log("Sign in successful");
      location.href="/teams";
    })
    promise.catch(e=>alert("Please enter the details"));
    
  }

  // signin with google
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  var kuchkuch = document.getElementsByClassName('social-signin google');
  const signInWithGoogle = () => {
     
    firebase.auth().signInWithPopup(provider)
    .then(function() {
      window.location ="/teams";
      
    }).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage)
    });
    console.log("Sign in successful");
  }

  kuchkuch.addEventListener('click',signInWithGoogle);


  function googleBuildAndSignIn(id_token) {
    // [START auth_google_build_signin]
    // Build Firebase credential with the Google ID token.
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  
    // Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    // [END auth_google_build_signin]
  }
  
  // [START auth_google_callback]
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
    
        // Sign in with credential from the Google user.
        // [START auth_google_signin_credential]
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        // [END auth_google_signin_credential]
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  // [END auth_google_callback]
  
  // [START auth_google_checksameuser]
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  
  //signOut

  function signOut(){
    auth.signOut();
    alert("SignOut Successfully from System");
  }


  //active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      var email = user.email;
      alert("Active user "+email);

    }else{
      alert("No Active user Found")
    }
  })

  