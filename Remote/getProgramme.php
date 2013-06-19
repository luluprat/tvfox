<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	$var["day"]	= 6;
	//$var["chaine"]	= array(1,2);
        $var["ordre"] = 10;
	$var["bouquet"]	= "TNT";
	
	$d = new Tvfox\database();
	echo $d->getProgramme($var);
?>
