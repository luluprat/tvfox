<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	if(!isset($_POST["nom"])) $_POST["nom"]="%";
	$c = new Xmltv\compress();
	
	$xml = $c->fromGrabber();
	echo $xml;
?>
