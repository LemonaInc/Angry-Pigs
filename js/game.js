

class Game {
	constructor() {
		this.world = new WorldController($("#gameScreen"));
		this.physicsEntities = [];
        this.loadLevelList();
        
		$('.loadLevelForm').on('submit', ( event ) => {
			// I'll receive level name and action load.
			event.preventDefault();
			this.loadLevel( event );
		})
		
		//Create event listener for mouse
		$('#gameScreen').click( () => {
			this.fire();
		})
		
/*		$('#gameScreen').mousemove( () => {
			this.rotateCannon();
		})*/
	}
	
	loadLevelList() {
		let command = {'action' : 'loadLevelList'};
		let request = $.param( command );

		$.post('server/', request)
		  .then(  levelListString  => {
			  console.log(levelListString);
			  $("#levelSelectDropdown").append(levelListString);
		  });
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
	
	loadLevel( event ) {
		let formParams = $('.loadLevelForm').serialize();
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
/*				for (let i = 0; i < levelDataObj.wallBlocks.length; i++) {
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
		let forceFromMouseY = (event.offsetY * 3000);
		
		console.log(event.offsetX);
		console.log(event.offsetY);
		
		var energyBall = document.createElement("div");
		$(energyBall).addClass("energyBall");
		$('#gameScreen').append(energyBall);
		
		let ent = new Entity(this.world, $(energyBall));
		this.physicsEntities.push(ent);
		ent.applyForce( ( -event.offsetX ), forceFromMouseY );
	}

}

$(document).ready( () => {
	let game = new Game();
	game.run();
})