<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	$d = new Tvfox\database();
	echo $d->getAllPhoto();
?>
