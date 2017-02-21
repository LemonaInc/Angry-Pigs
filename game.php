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

<div id="levelToLoad"><?php echo $_GET["Level"];?></div>


	<div class="container">

		<!-- Back Button -->

		<a id="editButton"
			class="waves-effect waves-light btn-large #ffd54f amber lighten-2"><i
			class="material-icons left">cloud</i>Back</a>

<!-- GameScreen -->
		<div id="gameScreen">
			<!--  Filled in with actual level info programmatically -->
			<div id="title"> <!-- title will be cleared on menu selection -->
				<h4>Castles and UFOs</h4>
			</div>
		</div>

		<canvas id="debugCanvas" width=1024px height=648px></canvas>

		<!-- Don't think this is needed at all... TODO: Test this
			<div id="response-one" class="the-return">
				<div id="game-area"></div>
			</div>
			-->
	</div>


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

</body>
</html>
