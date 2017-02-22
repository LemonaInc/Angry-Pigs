/*

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
        this.entityList = {
            captives: 	  [],
            wallTops:	  [],
            wallBottoms:  [],
            pillars:	  [],
        	towers:		  []
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
        
        var spawnX = "400px"; // Where to spawn new objects.
        var spawnY = "170px";

		switch(type){
			case "wallBottom":
				var newObjectID = this.entityList.wallBottoms.length; // Give object an ID and write the initial spawn location to entityList.
				$(entity).attr('id', "wallBottom_" + newObjectID);
				this.entityList.wallBottoms[newObjectID] = {
						"ID"	 : "wallBottom_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "112px",
						"height" : "97px"
				};
				
				$("#wallBottom_" + newObjectID).css({ left: spawnX,
													   top: spawnY
												    });
				break;
			case "wallTop":
				var newObjectID = this.entityList.wallTops.length;
				$(entity).attr('id', "wallTop_" + newObjectID);
				this.entityList.wallTops[newObjectID] = {
						"ID"	 : "wallTop_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "112px",
						"height" : "78px"
				};
				
				$("#wallTop_" + newObjectID).css({ left: spawnX,
													top: spawnY
												 });
				break;
			case "tower":
				var newObjectID = this.entityList.towers.length;
				$(entity).attr('id', "tower_" + newObjectID);
				this.entityList.towers[newObjectID] = {
						"ID"	 : "tower_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "106px",
						"height" : "343px"
				};
				
				$("#tower_" + newObjectID).css({ left: spawnX,
												  top: spawnY
											   });
				break;
			case "pillar":
				var newObjectID = this.entityList.pillars.length;
				$(entity).attr('id', "pillar_" + newObjectID);
				this.entityList.pillars[newObjectID] = {
						"ID"	 : "pillar_" + newObjectID,
						"xPos"   : spawnX,
						"yPos"   : spawnY,
						"width"  : "28px",
						"height" : "97px"
				};
				
				$("#pillar_" + newObjectID).css({ left: spawnX,
												   top: spawnY
											    });
				break;
				
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
				break;
		}
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
				}
			})
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
