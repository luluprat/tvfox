<?php

	$chemin ="../";
	require_once($chemin."init.php");
	
	
	$c = new Tvfox\compress();
	$message = $c->deCompress();
        echo($message);
?>
