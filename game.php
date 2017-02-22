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

	<!-- Add Howler Library -->
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.1/howler.core.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.1/howler.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.1/howler.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.1/howler.spatial.min.js"></script>

</head>
<body>


<div id="levelToLoad"><?php echo $_GET["Level"];?></div>

	<div class="container">

			<!-- Create a modal popup div here -->

		<a class="waves-effect waves-light btn" id="popupButton" href="#modal1">Die popup</a>

	   <div id="modal1" class="modal">
	     <div class="modal-content">
	       <h4>Sorry your alien died</h4>
	       <p>Want to play again?</p>
	     </div>
	     <div class="modal-footer red">
	       <a onClick="history.go(0)" value="Refresh" class=" modal-action modal-close waves-effect waves-cyan btn-flat">Yes</a>
				 <a href="index.html" class=" modal-action modal-close waves-effect waves-cyan btn-flat">No</a>

	     </div>
	   </div>

		<!-- End modal popup div -->

		<a class="waves-effect waves-light btn" id="popupWinButton" href="#modal2">Win Popup</a>

		 <div id="modal2" class="modal">
			 <div class="modal-content">
				 <h4>Congrats you won! :D </h4>
				 <p>Want to play again?</p>
			 </div>
			 <div class="modal-footer #1de9b6 teal accent-3">
				 <a onClick="history.go(0)" value="Refresh"  class=" modal-action modal-close waves-effect waves-cyan btn-flat">Yes</a>
				 <a href="index.html" class=" modal-action modal-close waves-effect waves-cyan btn-flat">No</a>

			 </div>
		 </div>



		<!-- Back Button which goes back to index.html when clicked on -->


			<a id="editButton" class="btn tooltipped btn-large waves-light #ffd54f amber lighten-2 z-depth-5"
				href="index.html" data-position="bottom" data-delay="50"
				data-tooltip="Go to main menu"><i class="material-icons left">reorder</i>Main Menu</a>

      <!-- Reload Level Button which reloads the game.php scene -->

			<a id="reloadButton" class="btn tooltipped btn-floating btn-large waves-effect waves-light #1de9b6 teal accent-3 z-depth-5"
				onClick="history.go(0)" value="Refresh" data-position="bottom" data-delay="50"
				data-tooltip="Reload Level"><i class="material-icons left">loop</i>reload</a>

      <!-- Go to level editor button -->
			<a id="goToLevelEditor" class="btn tooltipped btn-large waves-light #b388ff deep-purple accent-1 z-depth-5"
				href="editor.php" data-position="bottom" data-delay="50"
				data-tooltip="Go to level editor"><i class="material-icons left">dashboard</i>Level Editor</a>



<!-- GameScreen -->
		<div id="gameScreen"><!--  Filled in with actual level info programmatically --></div>

		<canvas id="debugCanvas" width=1024px height=648px></canvas>

		<div class="background">
			<div class="mountains"></div>
 			<div class="grass"></div>
		</div>
	</div>

	<div id="inspector">


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


	<script src="js/game.js"></script>

</body>
</html>
