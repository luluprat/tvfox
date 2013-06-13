<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	
	$c = new Xmltv\database();
	echo $c->getList();
?>
