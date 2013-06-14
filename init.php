<?php

	
        $conf = require_once("Config/config.php");
        define(APPLICATION_PATH,$conf["APPLICATION_PATH"]);

	$config = array(
		//'Zend\Loader\ClassMapAutoloader' => array(
			//'application' => APPLICATION_PATH . '/.classmap.php',
			//'Zend'        => APPLICATION_PATH . '/Library/ZF/Zend/.classmap.php',
		//),
		'Zend\Loader\StandardAutoloader' => array(
			'namespaces' => array(
				'Tvfox'      => APPLICATION_PATH . '/Tvfox',
				'Zend'        => APPLICATION_PATH . '/Library/ZF/Zend',
			),
		),
	);

	set_include_path($chemin."Library/ZF/" . PATH_SEPARATOR . get_include_path());
	set_include_path($chemin . PATH_SEPARATOR . get_include_path());

	require_once("Zend/Loader/AutoloaderFactory.php");

	$autoloader = Zend\Loader\AutoloaderFactory::factory($config);
