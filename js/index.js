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
        this.loadLevelList();

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
