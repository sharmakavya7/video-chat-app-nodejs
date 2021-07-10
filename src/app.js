let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
let firebase = require("firebase");
// let ejs = require('ejs');

app.set('views', './assets/views')
app.set('view engine', 'ejs')
app.use( favicon( path.join( __dirname, 'favicon.png' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/img', express.static( path.join( __dirname, 'img' ) ) );



//const rooms = { }

var firebaseConfig = {
    apiKey: "AIzaSyAt2TW7kvzbyyWlPn7KF_j1h-wIgiatFZ8",
    authDomain: "video-chat-app-f3086.firebaseapp.com",
    // databaseURL: "https://video-chat-app-f3086-default-rtdb.firebaseio.com",
    projectId: "video-chat-app-f3086",
    storageBucket: "video-chat-app-f3086.appspot.com",
    messagingSenderId: "208057507301",
    appId: "1:208057507301:web:88e9f7e408c44ea02b630c",
    measurementId: "G-SG1SKR042R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/form.html' );
} );

app.get( '/chat', ( req, res ) => {
    
    res.sendFile( __dirname + '/chat.html' );
    // res.render('index.ejs', { rooms: rooms })
})

app.get( '/talk', ( req, res ) => {
    res.sendFile( __dirname + '/assets/views/talk.html' );
    // res.render('index.ejs', { rooms: rooms })
})
    // res.sendFile( __dirname + '/chat.html' );
// } );
app.get( '/teams', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

server.listen( process.env.PORT || 3000, () => {
    console.log("Server started at port 3000");
} );

  io.on("connection", function(socket) {

    socket.on("user_join", function(data) {
        this.username = data;
        socket.broadcast.emit("user_join", data);
    });

    socket.on("chat_message", function(data) {
        //data contains the message given by frontend.
        //Adding message to database

        console.log("Message received:", data);

        var messageCollection = firebase.firestore().collection("messages");
        messageCollection.add(data);
        
        //Return the message back to the frontend.
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("disconnect", function(data) {
        socket.broadcast.emit("user_leave", this.username);
    });
});