/**
 * 
 * @name Point Controller Class
 * @copyright 2017 Jesse Carmack & Jaxon Stevens, All Rights Reserved.
 * 
 * Object is used to represent points in SCREEN spac
 * and has the ability to translate between SCREEN and
 * WORLD coordinate systems.
 * 
 * @usage let p = new Point( 200, 300 );
 *        This will be done probably in a entity object that has a Point object.
 *  
 */
'use strict';

const DEBUG = true;

class Point {
	
	constructor( theTop = 0, theLeft = 0, scale = WORLD_SCALE ) {   //
		this.m_top;
		this.m_left;
		this.m_scale;
	}
	
	asWorldCoordinates( viewWidth = 600, viewHeight = 400 ) {
		let location = {
			x: 0,
			y: 0
		}
		
		// error checking --- could be taken out for final version.
		if (DEBUG) {
			if ((viewWidth !== undefined) && (viewHeight !== undefined))
				if ((WORLD_SCALE <= 0) || (viewWidth <= 0) || (viewHeight <= 0))
					return location;
		}
		
		
		location.x = (this.m_left - (viewWidth / 2)) / WORLD_SCALE;
		location.y = (-1 * (this.m_top - (viewHeight / 2))) / WORLD_SCALE;
		
		return location;
	}
	
	asScreenCoordinates() {
		let location = {
			x:  this.m_top,
			y: this.m_left
		}
		
		return location;
	}
	
	
}

// let a = new Point( 200, 300 );
// let b = a.asWorldCoordinates();
// if (!b) {
//		something bad happens... }