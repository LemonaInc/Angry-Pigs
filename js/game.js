var game = null;

class Game {
	constructor() {
		this.world = new WorldController($("#gameScreen"));
		this.physicsEntities = [];
		this.projectiles = 0;
		this.captivesRemaining = 0;
		this.winLoseDisplayed = false;
		this.audioPlayer = new Audio();
		this.loadLevel();
		
		//Create event listener for mouse
		$('#gameScreen').click( () => {
			this.fire();
			this.audioPlayer.playerFireSound.play();
		});
	}

	update() {
		this.world.update();
		
		// Checks if any object has left the defined bounds (box2d measurements x -25/75), and if so,
		// delete the div from the DOM, remove the physicsModel on it, and remove it from the physicsEntities array.
		for (var i = 0; i < this.physicsEntities.length; i++) {
			if(this.physicsEntities[i].physicsModel.m_xf.position.x < -25) {
				$(this.physicsEntities[i].dom$).remove();
				this.world.destroy(this.physicsEntities[i].physicsModel);
				this.physicsEntities.splice(i, 1);
			}
		}
		for (var i = 0; i < this.physicsEntities.length; i++) {
			if(this.physicsEntities[i].physicsModel.m_xf.position.x > 75) {
				$(this.physicsEntities[i].dom$).remove();
				this.world.destroy(this.physicsEntities[i].physicsModel);
				this.physicsEntities.splice(i, 1);
			}
		}
		
		// Checks if any captive aliens have floated to the top of the gameScreen, if so,
		// delete it and lower captivesRemaining int.
		for (var i = 0; i < this.physicsEntities.length; i++) {
			if(this.physicsEntities[i].dom$[0].className == "captive"){
				this.physicsEntities[i].applyImpulse(-90, 5);
				if (this.physicsEntities[i].physicsModel.m_xf.position.y < 0) {
						$(this.physicsEntities[i].dom$).remove();
						this.world.destroy(this.physicsEntities[i].physicsModel);
						this.physicsEntities.splice(i, 1);
						this.captivesRemaining--;
						$('#captivesUI span').text(this.captivesRemaining);
				}
			}
		}

		// If a win or lose hasn't happened yet, and there are physicsEntities in the array (so that
		// it doesn't trigger first thing on load), when there are zero captives remaining display
		// the modal popup and play the win sound.
		if (this.winLoseDisplayed == false) {
			if(this.physicsEntities.length > 0 && this.captivesRemaining == 0) {
				$('#modal2').modal('open');
				this.winLoseDisplayed = true;
				this.audioPlayer.winSound.play();
			}
		}
		// Same for lose state if player runs out of projectiles.
		if (this.winLoseDisplayed == false) {
			if (this.physicsEntities.length > 0 && this.projectiles <= 0) {
				$('#modal1').modal('open');
				this.winLoseDisplayed = true;
			}
		}
		
	}

	render() {
		let m = __private__.get( this );
		this.physicsEntities.forEach( ( entity ) => {
			entity.render();
		});
		
		this.world.model.ClearForces();
	}

	run() {
		let frame = ( timestamp ) => {
			this.update();
			this.render();
			window.requestAnimationFrame( frame );
		}
		window.requestAnimationFrame( frame );
	}

	loadLevel() {
		let formParams = "Level=" + $('#levelToLoad').text();
		let command    = { 'action' : 'loadLevel' };
		let request    = $.param( command ) + "&" + formParams;

		$.post('server/', request)
			.then( ( levelDataStr ) => {

				// Clear field before loading new level contents in.
				$( "#gameScreen" ).empty();
				this.world = new WorldController($("#gameScreen"));
	            this.physicsEntities = [];

	            // UFO animates in and then continues to hover.
				$('#gameScreen').prepend(`<div id="ufo"></div>`);
				$('#ufo').animate({'margin': "-100px 0 0 240px"}, 2000, function() { game.ufoHover(); });

				// Turn levelDataStr into a JS object.
				let levelDataObj = JSON.parse( levelDataStr );

				// Change background image based on .json file.
				let $newImage = `url('images/${levelDataObj.bgImage}')`;
				$('body').css("background-image", $newImage);
				
				// Set projectiles based on .json file info and show in UI.
				this.projectiles = levelDataObj.projectiles;
				$('#projectilesUI span').text(this.projectiles);

				// Read level data from .json file, for each element, create a div, classes and ids.
				// Add CSS to each element.  Do this for each object type:
				// Wall Bottoms
				for (let i = 0; i < levelDataObj.wallBottoms.length; i++) {
					var newWallBottom = document.createElement("div");
					$(newWallBottom).addClass("wallBottom");

					$(newWallBottom).attr('id', "wallBottom_" + i);

					levelDataObj.wallBottoms[i] = {
							"ID"	 : "wallBottom_" + i,
							"xPos"   : levelDataObj.wallBottoms[i].xPos,
							"yPos"   : levelDataObj.wallBottoms[i].yPos,
							"width"  : levelDataObj.wallBottoms[i].width,
							"height" : levelDataObj.wallBottoms[i].height
					};

					$(newWallBottom).css({ height: levelDataObj.wallBottoms[i].height,
									 width: levelDataObj.wallBottoms[i].width,
									  left: levelDataObj.wallBottoms[i].xPos,
									   top: levelDataObj.wallBottoms[i].yPos
					});

			        $("#gameScreen").append(newWallBottom);

			        
			        // Initiate box2D instance of this object, add it to physicsEntities array.
			        let ent = new Entity(this.world, $(newWallBottom));
			        this.physicsEntities.push(ent);
				}

				// Wall Tops
				for (let i = 0; i < levelDataObj.wallTops.length; i++) {
					var newWallTop = document.createElement("div");
					$(newWallTop).addClass("wallTop");

					$(newWallTop).attr('id', "wallTop_" + i);

					levelDataObj.wallBottoms[i] = {
							"ID"	 : "wallTop_" + i,
							"xPos"   : levelDataObj.wallTops[i].xPos,
							"yPos"   : levelDataObj.wallTops[i].yPos,
							"width"  : levelDataObj.wallTops[i].width,
							"height" : levelDataObj.wallTops[i].height
					};

					$(newWallTop).css({ height: levelDataObj.wallTops[i].height,
									 	 width: levelDataObj.wallTops[i].width,
									 	  left: levelDataObj.wallTops[i].xPos,
									 	   top: levelDataObj.wallTops[i].yPos
					});

			        $("#gameScreen").append(newWallTop);

			        let ent = new Entity(this.world, $(newWallTop));
			        this.physicsEntities.push(ent);
				}

				// Towers
				for (let i = 0; i < levelDataObj.towers.length; i++) {
					var newTower = document.createElement("div");
					$(newTower).addClass("tower");

					$(newTower).attr('id', "tower_" + i);

					levelDataObj.towers[i] = {
							"ID"	 : "tower_" + i,
							"xPos"   : levelDataObj.towers[i].xPos,
							"yPos"   : levelDataObj.towers[i].yPos,
							"width"  : levelDataObj.towers[i].width,
							"height" : levelDataObj.towers[i].height
					};

					$(newTower).css({ height: levelDataObj.towers[i].height,
									   width: levelDataObj.towers[i].width,
									    left: levelDataObj.towers[i].xPos,
									 	 top: levelDataObj.towers[i].yPos
					});

			        $("#gameScreen").append(newTower);

			        let ent = new Entity(this.world, $(newTower));
			        this.physicsEntities.push(ent);
				}

				// Pillars
				for (let i = 0; i < levelDataObj.pillars.length; i++) {
					var newPillar = document.createElement("div");
					$(newPillar).addClass("pillar");

					$(newPillar).attr('id', "pillar_" + i);

					levelDataObj.pillars[i] = {
							"ID"	 : "tower_" + i,
							"xPos"   : levelDataObj.pillars[i].xPos,
							"yPos"   : levelDataObj.pillars[i].yPos,
							"width"  : levelDataObj.pillars[i].width,
							"height" : levelDataObj.pillars[i].height
					};

					$(newPillar).css({ height: levelDataObj.pillars[i].height,
									    width: levelDataObj.pillars[i].width,
									     left: levelDataObj.pillars[i].xPos,
									 	  top: levelDataObj.pillars[i].yPos
					});

			        $("#gameScreen").append(newPillar);

			        let ent = new Entity(this.world, $(newPillar));
			        this.physicsEntities.push(ent);
				}

				// Captives
				for (let i = 0; i < levelDataObj.captives.length; i++) {
					var newCaptive = document.createElement("div");
					$(newCaptive).addClass("captive");
					$(newCaptive).attr('id', "captive_" + i);

					levelDataObj.captives[i] = {
							"ID"	 : "captive_" + i,
							"xPos"   : levelDataObj.captives[i].xPos,
							"yPos"   : levelDataObj.captives[i].yPos,
							"width"  : levelDataObj.captives[i].width,
							"height" : levelDataObj.captives[i].height
					};

					$(newCaptive).css({ height: levelDataObj.captives[i].height,
									     width: levelDataObj.captives[i].width,
									      left: levelDataObj.captives[i].xPos,
									       top: levelDataObj.captives[i].yPos
					});

			        $("#gameScreen").append(newCaptive);

			        let ent = new Entity(this.world, $(newCaptive));
			        this.physicsEntities.push(ent);

			        this.captivesRemaining++;
			        console.log(this.captivesRemaining);
				}
				
				$('#captivesUI span').text(this.captivesRemaining);
			})
	}

	fire() {
		if (this.projectiles > 0) {
			//Determine angle from the centre of the UFO (where balls are released) to mouse cursor.
			var ufoPoint = { x: 520, y: 10 }
			var mousePoint = { x: event.clientX - $('#gameScreen').position().left, y: event.clientY - $('#gameScreen').position().top }
			var angleDeg = Math.atan2(mousePoint.y - ufoPoint.y, mousePoint.x - ufoPoint.x) * 180 / Math.PI;

			//Determine difference between points using pythagorean theorem
			var a = ufoPoint.x - mousePoint.x
			var b = ufoPoint.y - mousePoint.y
			var distanceBetweenPoints = Math.sqrt( a*a + b*b ) * 150;

			//Create energyball in DOM
			var energyBall = document.createElement("div");
			$(energyBall).addClass("energyBall");
			$('#gameScreen').append(energyBall);

			//Create energyball in physics, apply force.
			let ent = new Entity(this.world, $(energyBall));
			this.physicsEntities.push(ent);
			ent.applyForce( ( angleDeg ), distanceBetweenPoints );
			
			this.projectiles--;
			
			// Updates projectiles UI in DOM
			$('#projectilesUI span').text(this.projectiles);
			
			console.log(this.projectiles);
		}
	}
	
	ufoHover() {
		// Simplify this.
		var floatUp = ( (targetElement, speed) => {
		    $(targetElement).css({'margin': "-100px 0 0 240px"});
		    $(targetElement).animate(
		        {
		        'margin': "-85px 0 0 240px"
		        }, 
		        { 
		        duration: speed, 
		        complete: function(){
		            floatDown(this, speed);
		            }
		        }
		    );
		});
		
		var floatDown = ( (targetElement, speed) => {
		    $(targetElement).css({'margin': "-85px 0 0 240px"});
		    $(targetElement).animate(
		        {
		        'margin': "-100px 0 0 240px"
		        }, 
		        { 
		        duration: speed, 
		        complete: function(){
		            floatUp(this, speed);
		            }
		        }
		    );
		});
		
		floatDown($('#ufo'), 2000);
		floatUp($('#ufo'), 2000);
	}
}

$(document).ready( () => {
	game = new Game();
	game.run();

	$('.modal').modal();
})
