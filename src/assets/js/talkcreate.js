document.getElementById( 'talkbutton' ).addEventListener( 'click', ( e ) => {
    e.preventDefault();
    // let username = h.getQString();
    
    let roomName = document.querySelector( '#room-name' ).value;
    // let yourName = document.querySelector( '#your-name' ).value;
    // let teams = document.querySelector( 'teams' ).value;
    // if ( !username ) {
    //     document.querySelector( '#username-set' ).attributes.removeNamedItem( 'hidden' );
    // }
    if ( roomName) {
        //remove error message, if any
        document.querySelector( '#err-msg' ).innerHTML = "";

        //save the user's name in sessionStorage
        //sessionStorage.setItem( 'username', yourName );

        //create room link
        let roomLink = `${ location.origin }/chat?room=${roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

        //show message with link to room
        // document.querySelector( '#room-created' ).innerHTML = `Room successfully created. <br> Click <a href='${ roomLink }'>here</a> to enter room. 
        //     Share the room link with your partners.`;
        

        //empty the values
        document.querySelector( '#room-name' ).value = '';
        //document.querySelector( '#your-name' ).value = '';
    }

    else {
        document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
    }
} );

const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')

// SHOW
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})

// HIDDEN
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show')
})

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/120
        const y = (window.innerHeight - e.pageY*speed)/120

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

/*===== GSAP ANIMATION =====*/
// NAV
gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1, delay:2, y: 10})
gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2,})

// HOME
gsap.from('.home__title', {opacity: 0, duration: 1, delay:1.6, y: 30})
gsap.from('.home__description', {opacity: 0, duration: 1, delay:1.8, y: 30})
gsap.from('.home__button', {opacity: 0, duration: 1, delay:2.1, y: 30})
gsap.from('.home__img', {opacity: 0, duration: 1, delay:1.3, y: 30})


