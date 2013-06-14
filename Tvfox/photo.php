<?php

namespace Tvfox; 
use Zend;
use Zend\Http\Client;
use Zend\Http\Request;

class photo {
	
	
	const TELE7 = "http://programme-tv.premiere.fr/var/t7j/images/";
	
	
	function __construct(){
		
	}
	
	function getPhoto($nbr){
		
            
            if(!is_file("Data/".$nbr)&&($nbr!="")){
		$request = new Request();
		$request->setUri(self::TELE7.$nbr);
		$request->setMethod('GET');
		
		$client = new Client();
		
		$client->setRequest($request);
		$client->setStream(); // will use temp file
		$response = $client->send();
		// copy file
		$photo = APPLICATION_PATH .'/Data/Images/'.$nbr;
		copy($response->getStreamName(), $photo);
		
            }
		
	}
        
        
	
	
	
	
	
}
