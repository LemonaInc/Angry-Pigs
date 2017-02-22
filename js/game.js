class Game {
	constructor() {
		this.world = new WorldController($("#gameScreen"));
		this.captivesRemaining = 0;
		this.physicsEntities = [];
				this.loadLevel();

				// sounds
				// Here is where the die sound is implemented

				var playerFireSound = new Howl({
         src: ['FX/Cannon.wav'],
				 autoplay: false,
				loop: false,
  			volume: 0.2,
  			onend: function() {
    		console.log('Finished!');
	  }
	});


				var loadSound = new Howl({
				 src: ['FX/BackgroundMusic.mp3'],
				 autoplay: true,
	      loop: true,
	      volume: 0.5,
	       onend: function() {

	    console.log('Finished!');

	  }
				});

				loadSound.play();

       // Play the buttonClick sound
				var buttonClick = new Howl({
				src: ['FX/buttonClick.mp3']
				});




		//Create event listener for mouse
		$('#gameScreen').click( () => {
			this.fire();

			playerFireSound.play();

// Create modal popup here when you lost the game
// MOVE THIS TO THE DIE FUNCTION
		//	$('#modal1').modal('open');

		});


/*		$('#gameScreen').mousemove( () => {
			this.rotateCannon();
		})*/

}	
		
	update() {
		this.world.update();

		for (var i = 0; i < this.physicsEntities.length; i++) {
			if(this.physicsEntities[i].dom$[0].className == "captive"){
				this.physicsEntities[i].applyImpulse(-90, 5);
				if (this.physicsEntities[i].physicsModel.m_xf.position.y < 0) {
						$(this.physicsEntities[i].dom$).remove();
						this.world.destroy(this.physicsEntities[i].physicsModel);
						this.physicsEntities.splice(i);						
						this.captivesRemaining--;

						console.log(this.captivesRemaining);
				}
			}
		}

		if(this.physicsEntities.length > 0 && this.captivesRemaining == 0) {
			$('#modal2').modal('open');
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

	            // UFO animates in
				$('#gameScreen').prepend(`<div id="ufo"></div>`);
	            $('#ufo').animate({
	            	margin: "-90px 0 0 240px"
	            }, 1500);

				// Turn levelDataStr into a JS object.
				let levelDataObj = JSON.parse( levelDataStr );

				// Change background image based on .json file.
				let $newImage = `url('${levelDataObj.bgImage}')`;
				$('body').css("background-image", $newImage);

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
			})
	}

/*	rotateCannon() {
		console.log(event.offsetX);
		console.log(event.offsetY);
	}*/

	fire() {
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
	}

}

$(document).ready( () => {
	let game = new Game();
	game.run();

	$('.modal').modal();
})
