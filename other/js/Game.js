/**
 * @name Angry Pigs Game Singleton
 *
 * I eat all the blue smarties first !!!  Please edit me.
 * 
 * @Copyright 2014-2017, Vancouver Film School.  All Rights Reserved.
 */

'use strict';


if (__private__ === undefined)
    var __private__ = new WeakMap();

// import Physics from 'scripts/lib/Physics.js';

/*
 * The Game ES6
 */
class Game {
	
    constructor() {
        
        let __m = {
            
        };
        __private__.set( this, __m );
	}
	
	
    update() {
    }

    
    render() {
    }
    
    
	run() {	    
	    // MAIN GAME LOOP
	    
	    var self = this;
	    let frame = function( timestamp ) {

            // If we build a capability to move the update a given timestep
            // we can use timestamp to determine the delta between the last
            // frame and this one. Use that depta to determine the TimeStep
	        self.update();
            self.render(); 
            
            window.requestAnimationFrame( frame );
        };

        // This is the simplest game loop possible. 
        window.requestAnimationFrame( frame );
	};

};


// MAIN -- START HERE
$(document).ready( () => {
 
    let game = new Game();
    game.run();
});
	
