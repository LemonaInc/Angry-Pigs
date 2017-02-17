/**
 * @name World Point Class
 * @copyright 2017 Jesse Carmack & Jaxon Stevens, All Rights Reserved.
 * Object is used to represent points in SCREEN spac
 * and has the ability to translate between SCREEN and
 * WORLD coordinate systems.
 * @usage let p = new Point( 200, 300 );
 *        This will be done probably in a entity object that has a Point object.
 *
 */

// Debug
const DEBUG = true;

// Create Worldpoint class that extends the current point class
class Worldpoint extends Point {

    // Convert x and y to the top and left and then call the point
    constructor(theTop = 0, theLeft = 0, scale = WORLD_SCALE) {

        // Set the top scale to Y
        theTop = y * scale;
        // Set the left scale to X
        theLeft = x * scale;

        // Not sure what this does?
        super(theTop, theLeft, scale);
    }


    get x() {

        // Change this name to the name of the toScreen Class
        return.this.toScreen().x;
    }

    get loc() {

        // Sets the Width and Height to the loc
        let loc = this.asworld(MAX_WIDTH, MAX_HEIGHT);

    }

}


