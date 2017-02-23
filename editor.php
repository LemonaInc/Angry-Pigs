<!DOCTYPE html>
<!--
Castles & UFOs
@copyright: (C) December 2017 Jesse Carmack, All rights reserved.
@author:    Jesse Carmack
@version:   0.1
@summary:   An Angry Birds clone.  Shh.
-->
<html>
<head>
<title>Castles and UFOs</title>

<!-- CSS  -->
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/objects.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
<link href="style.css" type="text/css" rel="stylesheet"	media="screen,projection" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="js/Box2dWeb-2.1.a.3.min.js"></script>
</head>
<body>

<div class="container">
	<a id="editButton" href="#" name="slide-out"
	data-activates="slide-out"
	class="button-collapse btn-large waves-effect waves-light #00bcd4 cyan">Edit
	Level</a>
	<div id="gameScreen" class="editor">
		<!--  Filled in with actual level info programmatically -->
	</div>

	<!-- Reload Level Button which reloads the game.php scene -->
	<a id="mainMenuButton" class="btn tooltipped btn-large waves-light #1de9b6 teal accent-3 z-depth-5"
	href="index.html" data-position="bottom" data-delay="50"
	data-tooltip="Go to main menu"><i class="material-icons left">reorder</i>Main Menu</a>

	<div id="levelToLoad"><?php echo $_GET["Level"];?></div>

	<canvas id="debugCanvas" width=1024px height=648px></canvas>

	<div class="background">
		<div class="mountains"></div>
		<div class="grass"></div>
	</div>

</div>

<div id="inspector"> <!-- Slide out Navbar -->
	<ul id="slide-out" class="side-nav #424242 grey darken-3">
		<li><a href="javscript:void(0)"
			class="tabLinks  btn-large waves-effect waves-light #00bcd4 cyan z-depth-5"
			onclick="openTab(event, 'levelEditor')">Level</a></li>
			<li><a href="javscript:void(0)"
				class="tabLinks  btn-large waves-effect waves-light #00bcd4 cyan z-depth-5"
				onclick="openTab(event, 'objectList')">Objects</a></li>
				<li><div class="userView">


					<div id="levelEditor" class="tabContent">
						<form class="saveLevelForm" accept-charset="utf-8">
							<h5>Save</h5>

							Level: <input type="text" name="levelName" value=""
							class="#424242 grey darken-3" placeholder="Level Name" />
							Author: <input type="text" name="author" value=""
							class="#424242 grey darken-3" placeholder="Level Name" />

							<h4>Properties</h4>
							Projectiles: <input type="text" name="projectiles" value=""
							class="#424242 grey darken-3"
							placeholder="Amount of projectiles" /> Background Image: <input
							type="text" name="bgImage" value="gradient1.png"
							class="#424242 grey darken-3" /> <input type="submit"
							class="btn-large waves-effect waves-light  cyan"
							name="action" value="save" />
						</form>

						<!-- End of this form -->

						<form class="loadLevelForm" accept-charset="utf-8">
							<h5>Load a level</h5>
							<select id="levelSelectDropdown" class='dropdown-button btn' name="Level">
								<!--  generated in code -->
							</select> <input type="submit" name="action"
							class="btn-large waves-effect waves-light#424242 cyan
							value="load" />
						</form>
					</div>

					<div id="objectList" class="tabContent">
						<div id="wallTop" class="objectInList"></div>
						<div id="wallBottom" class="objectInList"></div>
						<div id="tower" class="objectInList"></div>
						<div id="pillar" class="objectInList"></div>
						<div id="captive" class="objectInList"></div>
					</div>

				</div>

			</ul>
		</div>

		<!-- Script Section -->
		<script src="js/Physics.js"></script>
		<script src="js/WorldController.js"></script>
		<script src="js/Entity.js"></script>

		<script src="js/DraggableHandlerES6.js"></script>
		<script src="js/niceties.js"></script>
		<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script src="js/materialize.js"></script>
		<script src="js/init.js"></script>

		<!-- Script for sidenav-->
		<script>
			<!-- Initialize collapse button -->
			$(".button-collapse").sideNav();
			// Initialize collapsible (uncomment the line below if you use the dropdown variation)
			//$('.collapsible').collapsible();
		</script>

		<script src="js/editor.js"></script>

	</body>
	</html>
