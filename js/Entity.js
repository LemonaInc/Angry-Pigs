/**
 *   Entity Controller Class
 * 
 *   Treat a DOM element as a rigid body in a box2D world
 *   The prime goal of this class is to manage the updates between this 
 *   model in the physics sim and the DOM element on screen
 *   
 *   @Copyright 2017, Vancouver Film School.  All Rights Reserved.
 *   The class has been extended by Jesse Carmack & Jaxon Stevens.
 */
'use strict';


if (__private__ === undefined)
    var __private__ = new WeakMap();
/*
 * Entity Controller
 */
class Entity {
    
    constructor( worldCtrl = null, dom$ = null, staticBody = false ) {
        let __m = {  
            mX: 0,
            mY: 0,
            mWidth: 0,
    	    mHeight: 0
        };
        
        // saved in a public global variable called private, BUT
        // only accessible within this instance of this object
        __private__.set( this, __m );   
    	
    	this.world = null;          // Our World manager
    	this.dom$ = null;           // The jQuery DOM element se have selected "actors"
    	this.physicsModel = null;   // The Box2D Rigid Body "model" we are managing
    	
    	// this is our world controller, the one we are a part of
    	if (worldCtrl === 'undefined') {
    		return -1;
    	}
    	this.world = worldCtrl;   
    	
    	// this is our dom element to manage
    	if (dom$ === 'undefined') {
    		return -1;
    	}	
    	this.dom$ = dom$;
    		
        let domPos = this.dom$.position();
        __m.mWidth = this.dom$.width() / 2 ;
        __m.mHeight = this.dom$.height() / 2;
            
        __m.mX = (domPos.left) + __m.mWidth;
        __m.mY = (domPos.top) + __m.mHeight;
                
        this.physicsModel = this.__createModel( staticBody );
        this.physicsModel.m_userData = { 
                
            domObj: this.dom$, 
	        width:  __m.mWidth, 
	        height: __m.mHeight
        };
            
        //Reset DOM object position for use with CSS3 positioning
        this.dom$.css({'left':'0px', 'top':'0px'});
    }

    applyImpulse( degrees, power ) {
        let vector = new Physics.Vec2( Math.cos( degrees * DEG_2_RAD ) * power,  Math.sin( degrees * DEG_2_RAD ) * power );
        let myModel = this.physicsModel;
        
        myModel.ApplyImpulse( vector, myModel.GetWorldCenter());
    }

    applyForce( degrees, power ) {
        var force = new Physics.Vec2( Math.cos( degrees * DEG_2_RAD ) * power,  Math.sin( degrees * DEG_2_RAD ) * power );
        var myModel = this.physicsModel;
        
        myModel.ApplyForce( force, myModel.GetWorldCenter());
    }

    setDensity( density ) {
        var myModelFixture = this.physicsModel.GetFixtureList();
        myModelFixture.SetDensity( density );
    }

    update( opts = undefined ) {
        // Update this object based on supplied position/rotation data
    	if (opts !== 'undefined') {
    		
    		let x = opts.x;
    		let y = opts.y;
    		
    		//Retrieve positions and rotations from the Box2d world
    	    this.physicsModel.m_xf.position.x = (x / WORLD_SCALE) + myModel.m_userData.width;
    	    this.physicsModel.m_xf.position.y = (y / WORLD_SCALE) + myModel.m_userData.height;
    	}
    }
    
    render() {
        // Draw/move this objects element based on its position    
        let myModel = this.physicsModel;
        let myElement = this.dom$;
    
    	//Retrieve positions and rotations from the Box2d world
        var x = Math.floor( (myModel.m_xf.position.x * WORLD_SCALE) - myModel.m_userData.width);
        var y = Math.floor( (myModel.m_xf.position.y * WORLD_SCALE) - myModel.m_userData.height);
        
        // rotation about which point.
        
        //CSS3 transform does not like negative values or infitate decimals
        let r = Math.round( ((myModel.m_sweep.a + TWO_PI) % TWO_PI) * RAD_2_DEG * 100) / 100;
        let css = {'transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'};
        
        myElement.css(css);	
    }

    __createModel( staticBody ) {
        let __m = __private__.get( this );
        
        let entitySwitch = this.dom$[0].className;
        let shape, bounce, friction, mass;
        
        // Depending on which entity, identified by their class,
        // set particular physics properties
        switch (entitySwitch) {
    		case "wallBottom":
    		    shape = "square";
    		    bounce = 0;
    		    friction = 3;
    		    mass = 9.0;
    			break;
    		case "wallTop":
    		    shape = "square";
    		    bounce = 0;
    		    friction = 3;
    		    mass = 6.0;
    			break;
    		case "pillar":
    		    shape = "square";
    		    bounce = 0.4;
    		    friction = 10;
    		    mass = 5.0;
    			break;
    		case "tower":
    		    shape = "square";
    		    bounce = 0;
    		    friction = 5;
    		    mass = 15.0;
    			break;
    		case "captive":
    		    shape = "square";
    		    bounce = 0.5;
    		    friction = 3;
    		    mass = 3;
    			break;
    		default:  // This ends up being the energyBalls.
    		    shape = "circle";
    		    bounce = 0.7;
    		    friction = 0;
    		    mass = 4.0;
    			break;
        }
                
        let bodyDef = new Physics.BodyDef;    
        bodyDef.type = Physics.Body.b2_dynamicBody; //All objects will be dynamic (they move around)
  
        bodyDef.position.x = __m.mX / WORLD_SCALE;
        bodyDef.position.y = __m.mY / WORLD_SCALE;
    
        let fixDef = new Physics.FixtureDef;

        if(shape == "square" ) {
            fixDef.shape = new Physics.PolygonShape;
        	fixDef.shape.SetAsBox( __m.mWidth / WORLD_SCALE, __m.mHeight / WORLD_SCALE);
        }
        else if(shape == "circle") {
        	fixDef.shape = new Physics.CircleShape(__m.mWidth / WORLD_SCALE);
        }
        
        fixDef.density     = mass;
        fixDef.friction    = friction;   // 1 = sticky, 0 = slippery
        fixDef.restitution = bounce;     // 1 = very bouncy, 0 = almost no bounce
        
        let myWorldModel = this.world.model; 
        let aBodyModel = myWorldModel.CreateBody( bodyDef );
        
        aBodyModel.CreateFixture( fixDef );
        
        return aBodyModel;
    }
}



