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
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/objects.css">

	<!-- CSS  -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
	<link href="materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
	<link href="style.css" type="text/css" rel="stylesheet"	media="screen,projection"/>

	<script	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="js/Box2dWeb-2.1.a.3.min.js"></script> <!--  TODO: Can move this to be loaded when game menu option is clicked -->
</head>
<body>

	<div class="container">
		<!-- Set Background of Level editor -->
		<a id="editButton" href="#" name="slide-out" data-activates="slide-out"
			class="button-collapse btn-large waves-effect waves-light #00bcd4 cyan">Edit Level</a>
		<div id="gameScreen">
			<!--  Filled in with actual level info programmatically -->
			<div id="title"> <!-- title will be cleared on menu selection -->
				<h4>Castles and UFOs</h4>
			</div>
		</div>


		<!-- Reload Level Button which reloads the game.php scene -->
			<a  id="mainMenuButton"
			class="btn-large waves-effect waves-light #1de9b6 teal accent-3
" href="index.html"><i
			class="material-icons left">reorder</i>Main Menu</a>

		<div id="levelToLoad"><?php echo $_GET["Level"];?></div>




		<canvas id="debugCanvas" width=1024px height=648px></canvas>

		<!-- Don't think this is needed at all... TODO: Test this
			<div id="response-one" class="the-return">
				<div id="game-area"></div>
			</div>
			-->
	</div>

	<div id="inspector">

		<!-- Slide out Navbar -->
		<ul id="slide-out" class="side-nav">
			<li><a href="javscript:void(0)"


				class="tabLinks  btn-large waves-effect waves-light #00bcd4 cyan"
				onclick="openTab(event, 'levelEditor')">Level</a></li>
			<li><a href="javscript:void(0)"

				class="tabLinks  btn-large waves-effect waves-light #00bcd4 cyan"
				onclick="openTab(event, 'objectList')">Objects</a></li>
			<li><a href="javscript:void(0)"

				class="tabLinks  btn-large waves-effect waves-light #00bcd4 cyan"
				onclick="openTab(event, 'objectProperties')">Properties</a></li>
			<li><div class="userView">
					<div class="background">
						<img src="images/longbackground.png">
					</div>

					<div id="objectProperties" class="tabContent">
						<form class="objectPropertiesForm" accept-charset="utf-8">
							<h4>Position</h4>
							 <input type="text" name="xPos" value="" class="#424242 grey darken-3"
								placeholder="X Position" /><br>  <input type="text"
								name="yPos" value="" class="#424242 grey darken-3" placeholder="Y Position" />
							<h4>Size</h4>
							 <input type="text" name="width" value="" class="#424242 grey darken-3"
								placeholder="Width" /><br>  <input type="text"
								name="height" value="" class="#424242 grey darken-3" placeholder="Height" />
							<h5>Physics Properties</h5>
							 <input type="text" name="bounce" value="" class="#424242 grey darken-3"
								placeholder="Bounce" /><br>  <input type="text"
								name="mass" value="" class="#424242 grey darken-3" placeholder="Mass" /><br> <input
								type="text" name="friction" class="waves-light #424242 grey darken-3" value="" placeholder="Friction" />
							<h4>Texture</h4>
							texture: <input type="text" name="texture" value="" class="#424242 grey darken-3"
								placeholder="URL of texture" /> <input type="submit"
								class="btn-large waves-effect waves-light #424242 grey darken-3"
								name="action" value="submit" />
						</form>
					</div>

					<div id="levelEditor" class="tabContent">
						<form class="saveLevelForm" accept-charset="utf-8">
							<h5>Save</h5>
							Level: <input type="text" name="levelName" value="" class="#424242 grey darken-3"
								placeholder="Level Name" /> Author: <input type="text"
								name="author" value="" class="#424242 grey darken-3" placeholder="Level Name" />

							<h4>Properties</h4>
							Projectiles: <input type="text" name="projectiles" value="" class="#424242 grey darken-3"
								placeholder="Amount of projectiles" /> Background Image: <input
								type="text" name="bgImage" value="../images/Field.jpg" class="#424242 grey darken-3" /> <input
								type="submit"
								class="btn-large waves-effect waves-light #424242 grey darken-3"
								name="action" value="save" />
						</form>

						<!-- End of this form -->

						<form class="loadLevelForm" accept-charset="utf-8">
							<h5>Load a level</h5>
						 <select id="levelSelectDropdown"
								class='dropdown-button btn' name="Level">
								<!--  generated in code -->
							</select> <input type="submit" name="action"
								class="btn-large waves-effect waves-light#424242 grey darken-3"
								value="load" />
						</form>

					</div>

					<div id="objectList" class="tabContent">
						<div id="wall" class="objectInList"></div>
						<div id="captive" class="objectInList"></div>
						<div id="Tree" class="objectInList"></div>
            <div id="wallBlock" class="objectInList"></div>
						<div id="redBlock" class"objectInList"></div>
						<div id="cube" class"objectInList"></div>
						<div id="bananas" class"objectInList"></div>


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
	<script>	<!-- Initialize collapse button -->
		$(".button-collapse").sideNav();
		// Initialize collapsible (uncomment the line below if you use the dropdown variation)
		//$('.collapsible').collapsible();
	</script>

	<script src="js/game.js"></script>
	<script src="js/app.js"></script>

</body>
</html>
