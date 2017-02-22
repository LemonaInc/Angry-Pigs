<?php
/**

  Castles & UFOs Server

   @copyright: (C) December 2017 Jesse Carmack, All rights reserved.
   @author:    Jesse Carmack
   @version:   0.1
   @summary:   Baby's First Server.  This thing will open up and run what is
   			   seen here and then terminate.  Each request gets it's own server.

*/

class Server {
	
	public function __construct() {
		$response = [];
		$action = $_POST["action"];       // Depending on which form is sending, we'll send the data to
										  // a corresponding function to receive it.
		switch( $action ) {
			case "loadLevelList":
				$response = $this->do_loadLevelList();
				break;
			case "loadLevel":
				$response = $this->do_loadLevel( $_POST );
				break;
			case "saveLevel":
				$response = $this->do_saveLevel( $_POST );
				break;
			default:
				$response["returnCode"] = "NOT_OK";
				break;
		}
		
		echo $response;
	}
	
	private function do_saveLevel( $params ) {  // So this function will receive that whole serialized form here (the string).
		$metaData = [];
		$metaData["levelName"] = $params["levelName"]; //key and value
		$metaData["author"] = $params["author"];
		$metaData["projectiles"] = $params["projectiles"];
		$metaData["bgImage"] = $params["bgImage"];
		$data = $params["JSONlevelData"];
		$dataDecoded = json_decode($data, true);

		$sendTo = array_merge($metaData, $dataDecoded);
		$json = json_encode( $sendTo, JSON_PRETTY_PRINT );
		
		
		if (file_exists("levels/".$metaData["levelName"].".json")) {
			file_put_contents("levels/".$metaData["levelName"]."_copy".".json", $json);
		}
		else {
			file_put_contents("levels/".$metaData["levelName"].".json", $json);
		}
		
		return $json;
	}
	
	private function do_loadLevelList() {
		// Read level directory
		$path = "./levels/";
		$handle = opendir($path);
		$output = "";
		
		// Could of used file_get_contents, but instead:
		while ( $file = readdir($handle) ) {
			if (substr($file,0,1) != ".") { //Checks the first character of the filename to see if it's hidden.
				$output = $output . '<option value="' . $file . '">' . $file . "</option>";
			}
		}

		closedir($handle);
		return $output;
	}
	
	
	private function do_loadLevel( $params ) {
		$filename = $params["Level"];
		$output = file_get_contents("./levels/".$params["Level"]);
		return $output;
	}
}

$server = new Server;
?>