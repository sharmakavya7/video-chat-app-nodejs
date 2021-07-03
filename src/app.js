let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/img', express.static( path.join( __dirname, 'img' ) ) );


app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/form.html' );
} );

app.get( '/teams', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

server.listen( process.env.PORT || 3000, () => {
    console.log("Server started at port 3000");
} );
