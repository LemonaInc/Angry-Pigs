class Game {
	constructor() {
		this.world = new WorldController($("#gameScreen"));
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
			$('#modal1').modal('open');

		})

/*		$('#gameScreen').mousemove( () => {
			this.rotateCannon();
		})*/


	}

	update() {
		this.world.update();
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


				$('#gameScreen').prepend(`<div id="ufo"></div>`);
	            $('#ufo').animate({
	            	margin: "-90px 0 0 240px"
	            }, 1500);


				// Turn levelDataStr into a JS object.
				let levelDataObj = JSON.parse( levelDataStr );

				// TO-DO: Change background image
				//let $newImage = `url("${levelDataObj.bgImage}")`;
				//var newImageFixed = $newImage.replace( /\.{2,}/, ''); //http://stackoverflow.com/questions/10003683/javascript-get-number-from-string
				//$("#gameScreen").css({ "background-image" : $newImage }); <--- Why does it not see /angryBirds/ in the link????

				// Castle Pieces
				for (let i = 0; i < levelDataObj.castlePieces.length; i++) {
					var newCastlePiece = document.createElement("div");
					$(newCastlePiece).addClass("draggable wall");

					$(newCastlePiece).attr('id', "castlePiece_" + i);

					levelDataObj.castlePieces[i] = {
							"ID"	 : "castlePiece_" + i,
							"xPos"   : levelDataObj.castlePieces[i].xPos,
							"yPos"   : levelDataObj.castlePieces[i].yPos,
							"width"  : levelDataObj.castlePieces[i].width,
							"height" : levelDataObj.castlePieces[i].height
					};

					$(newCastlePiece).css({ height: levelDataObj.castlePieces[i].height,
									 width: levelDataObj.castlePieces[i].width,
									  left: levelDataObj.castlePieces[i].xPos,
									   top: levelDataObj.castlePieces[i].yPos
					});

			        $("#gameScreen").append(newCastlePiece);

			        let ent = new Entity(this.world, $(newCastlePiece));
			        this.physicsEntities.push(ent);
			        /*ent.applyForce(300, 30000);*/
				}



				// WallBlocks
				/* for (let i = 0; i < levelDataObj.wallBlocks.length; i++) {
					var newCastlePiece = document.createElement("div");
					$(newWallBlock).addClass("draggable wall");
					$(newWallBlock).attr('id', "wallBlock_" + i);
					this.entityList.wallBlocks[i] = {
							"ID"	 : "castlePiece_" + i,
							"xPos"   : levelDataObj.wallBlocks[i].xPos,
							"yPos"   : levelDataObj.wallBlocks[i].yPos,
							"width"  : levelDataObj.wallBlocks[i].width,
							"height" : levelDataObj.wallBlocks[i].height
					};
					$(newCastlePiece).css({ height: levelDataObj.wallBlocks[i].height,
									 width: levelDataObj.wallBlocks[i].width,
										left: levelDataObj.wallBlocks[i].xPos,
										 top: levelDataObj.wallBlocks[i].yPos
					});
							$("#gameScreen").append(newWallBlock);
					        let ent = new Entity(this.world, $(newCastlePiece));
					        this.physicsEntities.push(ent);
				}*/



				// Captives
				for (let i = 0; i < levelDataObj.captives.length; i++) {
					var newCaptive = document.createElement("div");
					$(newCaptive).addClass("draggable captive");
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




					$(".draggable").click(( event ) => this.selectObject( event ));

			        let ent = new Entity(this.world, $(newCaptive));
			        this.physicsEntities.push(ent);


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
})

 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
