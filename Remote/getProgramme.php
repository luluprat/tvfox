<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	$var["day"]	= 2;
	//$var["chaine"]	= array(1,2);
	$var["bouquet"]	= "TNT";
	
	$d = new Xmltv\database();
	echo $d->getProgramme($var);
?>
