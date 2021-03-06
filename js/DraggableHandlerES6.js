/*
 * @name: Draggable Handler   
 * @author:    Scott Henshaw with some modifications by Jesse Carmack & Jaxon Stevens.
 */
'use strict';

const DEFAULT_Z = 1;

class DraggableHandler {

    constructor( domElement$, entityList ) {
        this.mouseDown = false;
        this.mouseOver = false;
        this.offsetX = null;
        this.offsetY = null;
        this.zIndex = DEFAULT_Z;
        this.entityListRef = entityList;

        // Private attributes
    	this._draggable$ = domElement$; //The $ at the end is reminder that these are JQuery objects.

        // Event handlers
    	domElement$.on( 'mousedown', ( event ) => this.down( event ) ); //when the mouse is clicked down, call down method.
    	domElement$.on( 'mousemove', ( event ) => this.move( event ) );
    	domElement$.on( 'mouseover', ( event ) => this.over( event ) ); //Mouseover, add csscursor.
    	domElement$.on( 'mouseout',  ( event ) =>  this.out( event ) );
    	domElement$.on( 'mouseup',   ( event ) =>   this.up( event ) );
    }

    /*
     * NOTE:  prototype methods are shared amongst all instances and therefore
     * have no access to private data within the objects they service. Internal
     * variables are NOT accessible (self)
     *
     */
    down( event ) {

    	if (this.mouseOver) {

    	    // record the mouse
    		this.mouseDown = true;
    		let t = { //I added this cause I think Scott fogot to
    			left: event.target.offsetLeft,
    			top: event.target.offsetTop
    		};
    		
    		// Deselect other items in #gameScreen and select object that is current being pressed down on.
    		$('#gameScreen .selected').removeClass('selected');
    		$(event.target).addClass('selected');

    		this.offsetX = event.clientX - Math.floor( event.target.offsetLeft ); //event.target is the DIV that was clicked on
    		this.offsetY = event.clientY - Math.floor( event.target.offsetTop );

    		// save the z-index (depth)
    		this.zIndex = this._draggable$.css( "zIndex" );
    		this._draggable$.css( "zIndex", "10000" );
    	}
    }

    move( event ) {

    	if (this.mouseDown && this.mouseOver && this._draggable$ != null) {

    		// Get the ID that corresponds to the array index number of the object, strips the text away.
    		// From:  http://stackoverflow.com/questions/10003683/javascript-get-number-from-string
    		var idExtracted = event.target.id.replace( /^\D+/g, ''); 

    		// Change css of object
    		this._draggable$.css({ margin: "0px",
    		                       left: event.clientX - this.offsetX + "px",
    		                       top:  event.clientY - this.offsetY + "px"
		                         });

    		// Write new position to entityList
    		if ( $(event.target).hasClass("wallBottom") ){
    			this.entityListRef.wallBottoms[idExtracted].xPos = event.clientX - this.offsetX + "px";
        		this.entityListRef.wallBottoms[idExtracted].yPos = event.clientY - this.offsetY + "px";
    		}
    		else if ( $(event.target).hasClass("wallTop") ){
    			this.entityListRef.wallTops[idExtracted].xPos = event.clientX - this.offsetX + "px";
        		this.entityListRef.wallTops[idExtracted].yPos = event.clientY - this.offsetY + "px";
    		}
    		else if ( $(event.target).hasClass("tower") ){
    			this.entityListRef.towers[idExtracted].xPos = event.clientX - this.offsetX + "px";
        		this.entityListRef.towers[idExtracted].yPos = event.clientY - this.offsetY + "px";
    		}
    		else if ( $(event.target).hasClass("pillar") ){
    			this.entityListRef.pillars[idExtracted].xPos = event.clientX - this.offsetX + "px";
        		this.entityListRef.pillars[idExtracted].yPos = event.clientY - this.offsetY + "px";
    		}
    		else if ( $(event.target).hasClass("captive") ){
    			this.entityListRef.captives[idExtracted].xPos = event.clientX - this.offsetX + "px";
        		this.entityListRef.captives[idExtracted].yPos = event.clientY - this.offsetY + "px";
    		}
    	};
    }

    over( event ) {

        // make the thing whatever element we are hovering over
        // this.thing = event.target;
    	this._draggable$ = $(event.target);

    	if (this._draggable$.hasClass("draggable")) {

    		this.mouseOver = true;

    		// Change the cursor
            //this.thing.style.cursor = "move";
            this._draggable$.css( { cursor:"move"} );
    	}
    	else {

    		this.mouseOver = false;
    		this._draggable$ = null;
    	}
    }

    out( event ) {

    	this.mouseOver = false;
    	this._draggable$ = null;
    }

    up( event ) {

    	this.mouseDown = false;
    	if (this._draggable$ != null) {
    		// reset the styles and z index
    		this._draggable$.css( { cursor:"pointer", zindex: this.zIndex } );
            this.zIndex = DEFAULT_Z;
    	}
    	
    	//Deselect all objects on mouse release
		$('#gameScreen .selected').removeClass('selected');
    }
}
