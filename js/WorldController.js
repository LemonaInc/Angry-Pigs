/**
 *  @name World Controller Class
 * 
 *   Manage RigidBodies in a box2D world
 *   
 * 		suffixes $ are jQuery DOM elements to be controlled
 * 		suffixes Model are Physics model elements to be controlled
 * 
 * @Copyright 2016-2017, Vancouver Film School.  All Rights Reserved.
 */
'use strict';


if (__private__ === undefined)
    var __private__ = new WeakMap();

/*
 * The World Controller ES6
 */
const FRAME_RATE = 1.0 / 60.0 // frame-rate  seconds divided by frames
const VELOCITY_ITER = 10;
const POSITION_ITER = 10;


class WorldController {
    
    constructor( domContainer$ ) {

        let __m = {
            // Create the Box2D World with horizontal and vertical gravity vector(10 is close enough to 9.8)
            physicsModel: new Physics.World( new Physics.Vec2(0, GRAVITY ) ,true ), //allow sleep
            listener:     new Physics.Listener
        };
        __private__.set( this, __m )        
        
        let w = domContainer$.width();
        let h = domContainer$.height();
    
        this.__createBoundaries( w, h );
    }    

    __createBoundaries( screenW, screenH ) {
	
        let __m = __private__.get( this );
        
        // Create the ground fixture definition
        let fixDef = new Physics.FixtureDef;
        fixDef.shape = new Physics.PolygonShape;    
        fixDef.density = 2.0;
        fixDef.friction = 0.9;
        fixDef.restitution = 0.8;
       
        // Create the body definition
        let bodyDef = new Physics.BodyDef;
        bodyDef.type = Physics.Body.b2_staticBody; 
        
        // change the ground shape, and connect it with a fixture to the body
        bodyDef.position.x = screenW / 2 / WORLD_SCALE;
        bodyDef.position.y = screenH / WORLD_SCALE;           
        fixDef.shape.SetAsBox( screenW / WORLD_SCALE, 1.0 / WORLD_SCALE );
        __m.physicsModel.CreateBody( bodyDef ).CreateFixture( fixDef );
           
    	
        // Left Edge
    	// The edge is positioned at the left most i.e. x = 0 and y = screenH/2 as the center. width is 1 and height = screenH
        bodyDef.position.x = 0; // need to add offset from screen edge based on current left attrib of game-area
        bodyDef.position.y = screenH / 2 / WORLD_SCALE;    	
        fixDef.shape.SetAsBox( 1.0 / WORLD_SCALE , screenH / WORLD_SCALE );    	
    	__m.physicsModel.CreateBody( bodyDef ).CreateFixture( fixDef );
    
    	// Right Edge 
    	// same as left edge, positioned on the rightmost end of our canvas
    	bodyDef.position.x = screenW / WORLD_SCALE;
    	bodyDef.position.y = screenH / 2 / WORLD_SCALE;    	
    	__m.physicsModel.CreateBody( bodyDef ).CreateFixture( fixDef );    	
    	
    	//---THIS IS FOR VISUAL TESTING ONLY
        //setup debug Draw
//        var debugDraw = new Physics.DebugDraw();
//        debugDraw.SetSprite(document.getElementById("debugCanvas").getContext('2d'));
//        debugDraw.SetDrawScale(WORLD_SCALE);
//        debugDraw.SetFillAlpha(0.5);
//        debugDraw.SetLineThickness(1.0);
//        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
//        m.physicsModel.SetDebugDraw(debugDraw);
        
    
    	
    }

    
    // Class prototypes - methods which can be applied only to objects of the class
    get model() {
    
        let __m = __private__.get( this );
        return __m.physicsModel;
    }

    
    update() {  	

        let __m = __private__.get( this );
        __m.physicsModel.Step( FRAME_RATE, VELOCITY_ITER, POSITION_ITER );
    }	

    	
    render() { }
}


