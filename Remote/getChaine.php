<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	$var["day"]	=1;
	//$var["chaine"]	= array(1,2);
	$var["bouquet"]	= "TNT";
	
	$d = new Tvfox\database();
	echo $d->getChaine($var);
?>
