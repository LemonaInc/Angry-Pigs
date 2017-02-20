/**

  Castles & UFOs

   @copyright: (C) December 2017 Jesse Carmack, All rights reserved.
   @author:    Jesse Carmack
   @version:   0.1
   @summary:   An Angry Birds clone.  Shh.

  Concepts I'm Coming to Terms With

   - Event listeners, once declared, listen and wait from that point forward, for an event.
   - Event.target represents what html element you've touched in someway, including ID, class, and HTML attribute.
   - Remember, "this" IS the app.  It's a way of accessing a variable that belongs to the object you're in.
     	"this.entityList" is the same as saying "app.entityList", or, abstracted: "castlesAndUFOs.entityList".

*/

'use strict';

//Define application.
class App{

	constructor() {
		this._done = false;
		this.ImPublic = 42; // A public variable
        this.entityList = {
            captives: 	  [],
            castlePieces: [], //Fill with objects
						wallBlocks: []
        }
        this.loadLevelList();
		this.dragHandler = new DraggableHandler( $('#gameScreen'), this.entityList );

		  //
		 //  Register event handlers on startup
		//
		$(".objectInList").click(( event ) => this.spawnObject( event ));
		$('.saveLevelForm').on('submit', ( event ) => {
		    // ^class name        ^action, in form
			event.preventDefault();
			this.saveLevel( event );
		});
		$('.loadLevelForm').on('submit', ( event ) => {
			// I'll receive level name and action load.
			event.preventDefault();
			this.loadLevel( event );
		})
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

	spawnObject( event ){
		// Create new div in game screen.
		var entity = document.createElement("div");
		let type   = event.target.id;
		$(entity).addClass("draggable");
		$(entity).addClass(type);
        $("#gameScreen").append(entity);
        var spawnX = "400px";
        var spawnY = "170px";

		switch(type){
			case "wall":
		        // Give object an ID and write the initial spawn location to entityList.
				var newObjectID = this.entityList.castlePieces.length;
				$(entity).attr('id', "castlePiece_" + newObjectID);
				this.entityList.castlePieces[newObjectID] = {
						"ID"	 : "castlePiece_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "40px",
						"height" : "70px"
				};

     // wallBlocks
				case "wallBlock":
			        // Give object an ID and write the initial spawn location to entityList.
					var newObjectID = this.entityList.wallBlocks.length;
					$(entity).attr('id', "wallBlock_" + newObjectID);
					this.entityList.wallBlocks[newObjectID] = {
							"ID"	 : "wallBlock_" + newObjectID,
							"xPos"   : spawnX,
							"yPos"   : spawnY,
							"width"  : "128px",
							"height" : "128px"
					};

				$("#wallBlock_" + newObjectID).css({ left: spawnX,
													   top:  spawnY
													 });

			// Captive ObjectID
			case "captive":
				var newObjectID = this.entityList.captives.length;
				$(entity).attr('id', "captive_" + newObjectID);
				this.entityList.captives[newObjectID] = {
						"ID"	 : "captive_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "28px",
						"height" : "73px"
				};

				$("#captive_" + newObjectID).css({ left: spawnX,
													top: spawnY,
												 });


												 case "tree":
											 		var newObjectID = this.entityList.trees.length;
											 		$(entity).attr('id', "tree_" + newObjectID);
											 		this.entityList.trees[newObjectID] = {
											 				"ID"	 : "tree_" + newObjectID,
											 				"xPos"   : spawnX,
											 				"yPos"   : spawnY,
											 				"width"  : "128px",
											 				"height" : "128px"
											 		};

											 		$("tree_" + newObjectID).css({ left: spawnX,
											 											top: spawnY,
											 										 });



				break;
		}
		console.log(entity);

        // Create event listener for created item.
        $(entity).click(( event ) => this.selectObject( event ));
	}

	selectObject( event ){
		// De-select currently selected object
		$('#gameScreen .selected').removeClass('selected');

		$(event.target).addClass('selected');

		// Open and display the Properties tab
	}

	saveLevel( event ) {
		// Get params from form and data from entityList
		let formParams = $('.saveLevelForm').serialize(); // Serialize everything in <form></form>
		let levelData  = "JSONlevelData=" + JSON.stringify(this.entityList);
		let command    = { 'action': 'saveLevel' };
		let request    = $.param( command ) + "&" + formParams + "&" + levelData; //Add "&" to separate parameters

		// Post message to server
		$.post('server/', request) 			// Use relative paths here, don't need to include index.html because the server looks for that anyways.
			.then( ( responseStr ) => { 	// Then, handle response from server.
				let result = JSON.parse( responseStr );
			})

		$("#levelSelectDropdown").empty();
		this.loadLevelList();
	}

	loadLevel( event ) {
		let formParams = $('.loadLevelForm').serialize();
		let command    = { 'action' : 'loadLevel' };
		let request    = $.param( command ) + "&" + formParams;

		$.post('server/', request)
			.then( ( levelDataStr ) => {

				// Clear field before loading new level contents in.
				$( "#gameScreen" ).empty();

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

					this.entityList.castlePieces[i] = {
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
				}*/

				// Captives
				for (let i = 0; i < levelDataObj.captives.length; i++) {
					var newCaptive = document.createElement("div");
					$(newCaptive).addClass("draggable captive");
					$(newCaptive).attr('id', "captive_" + i);

					this.entityList.captives[i] = {
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
				}
			})

		// bigLevel.json

		// Send level name to php.  Tell it to return the json file with this name.

		// Parse here.
	}

}


// MAIN -- START HERE!
//Wait till all HTML is loaded before App runs.
//The parameter that's in here is a function.
//Document ready only gets called when everything
//else is finished loading in the document.
$(document).ready( () => {

	let app = new App();

} );
