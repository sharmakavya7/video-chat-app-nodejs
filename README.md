# Conference Call
A conference call implementation using WebRTC, Socket.io and Node.js.


# Getting Started
- Run `npm ci`
- `cd src`
- `node app.js`

# Demo
Demo: https://frozen-caverns-24163.herokuapp.com/  <br/>
Video demo: https://youtu.be/AzX4lQD-lKQ  <br/>
Trello Scrum board URL for Agile Methodology: https://trello.com/b/iW69K8zW/video-chat-app  <br/>

# Features
- Multi-participants Video chat
- User authentication by Username and password
- User authentication through Google
- Real-time chat before the meeting
- Real-time chat during the meeting
- Toggling of video stream
- Toggling of audio stream (mute & unmute)
- Screen sharing
- Mute individual participant
- Expand participants' stream (picture-in-picture)
- Screen Recording
- Video Recording

 
# Tech stack
### WebRTC 
[Why are we using WebRTC?](https://webrtc.org/) `peer`↔`peer` <br/> 
- A key factor in the success of the web is that its core technologies – such as HTML, HTTP, and TCP/IP – are open and freely implementable. Currently, there is no free, high-quality, complete solution available that enables communication in the browser. WebRTC enables this.
- Already integrated with best-of-breed voice and video engines that have been deployed on millions of endpoints over the last 8+ years. Google does not charge royalties for WebRTC.
- Includes and abstracts key NAT and firewall traversal technology, using STUN, ICE, TURN, RTP-over-TCP and support for proxies.

### Socket.io 
[Key features of socket.io:](https://socket.io/) <br/>
- It helps in broadcasting to multiple sockets at a time and handles the connection transparently.
- It works on all platform, server or device ensuring the equality, reliability, and speed.
- It automatically upgrades the requirement to WebSocket if needed.
- It is a custom real-time transport protocol implementation on top of other protocols.
- It requires both libraries to be used Client side as well as a server-side library.
- IO works on work-based events. there are some reserved events which can be accessed using the Socket on server side like Connect, message, Disconnect, Ping and Reconnect.

### Node.js
[What is Node.js good for?](https://nodejs.org/en/about/) <br/>
- Node.js is a JavaScript runtime environment based on the V8 engine. It allows us to run JavaScript outside of the browser — typically, in a web server.
- Node.js is great at handling multiple connections with low cyclomatic complexity, given that its single-threaded nature requires that we liberate the event loop as soon as possible. This makes Node.js an ideal choice for microservices and real-time applications.
- Express.js is probably the most popular framework to date and I've used it in the project.

### UI frameworks used
- [Bootstrap v5.0](https://getbootstrap.com/docs/5.0/getting-started/introduction/) <br/>
- [Materialize CSS](https://materializecss.com/about.html) <br/>

## Key SDKs user in this project
[Firebase](https://firebase.google.com/docs) gives you the tools and infrastructure to build better apps.
- [Firebase SDK](https://firebase.google.com/docs/auth/web/start) - Authentication
- [Firebase SDK](https://firebase.google.com/docs/firestore/quickstart) - Cloud Firestore <br/>
### These apps also use following third party libraries/services
- [Google icons](https://developers.google.com/fonts/docs/material_icons)
- [Google fonts](https://fonts.google.com/)
- [Fonts awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2)

