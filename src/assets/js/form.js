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
    
    promise.catch(e=>alert(e.message));
    // alert("SignUp Successfully");
    location.href="/talk";
  }

  //signIN function
  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.then(() => {
      console.log("Sign in successful");
      location.href="/talk";
    })
    promise.catch(e=>alert("Please enter the details"));
    
  }


    //active user to homepage
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var email = user.email;
        // alert("Active user "+email);
  
      }else{
        // alert("No Active user Found")
      }
    })
  
    function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      console.log(error);
    }
    
    // persistence_session
  
    function setPersistenceSession() {
      var email = document.getElementById("email");
      var password  = document.getElementById("password");
    
      // [START auth_set_persistence_session]
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      // [END auth_set_persistence_session]
    }
    



  // signin with google
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  var kuchkuch = document.getElementsByClassName('social-signin google');
  const signInWithGoogle = () => {
     
    firebase.auth().signInWithPopup(provider)
    .then(function() {
      window.location ="/talk";
      
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
    // alert("SignOut Successfully from System");
  }



  // function setPersistenceNone() {
  //   // [START auth_set_persistence_none]
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  //     .then(() => {
  //       var provider = new firebase.auth.GoogleAuthProvider();
  //       // In memory persistence will be applied to the signed in Google user
  //       // even though the persistence was set to 'none' and a page redirect
  //       // occurred.
  //       return firebase.auth().signInWithRedirect(provider);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });
  //   // [END auth_set_persistence_none]
  // }