<?php

namespace Tvfox; 
use Zend\Filter\Decompress;
use Zend\Http\Client;
use Zend\Http\Request;
class compress {
	
	const ZIP = "tnt_lite";
	const TELERAMA = "http://xmltv.dyndns.org/download/tnt_lite.zip";
	const TELE7 = "http://cdn-premiere.ladmedia.fr/var/t7j/storage/itele7_channel_dumps/full_index.sqlite.zip";
	
	
	function __construct(){
		
	}
	
	function deCompress(){
		

		$request = new Request();
		$request->setUri(self::TELE7);
		$request->setMethod('GET');
		
		$client = new Client();
		
		$client->setRequest($request);
		$client->setStream(); // will use temp file
		$response = $client->send();
		// copy file
		$zip = APPLICATION_PATH .'/Data/file.zip';
		copy($response->getStreamName(), $zip);
		
		
		if ($response->isSuccess()) {
			//  the POST was successful
			
			$filter = new Decompress(array(
				'adapter' => 'Zip',
				'options' => array(
					'target' => APPLICATION_PATH .'/Data',
					'archive'=> $zip 
				)
				
			));
			
			$decompressed = $filter->filter($zip);
		}
		
		
		
		return $decompressed ;
	}
	
	function toJson(){
		
		$xml = file_get_contents(APPLICATION_PATH . "/Data/".self::ZIP.".xml");
		
		$jsonContents = Zend\Json\Json::fromXml($xml,false);
		return $jsonContents;
	}
	
	
	
}
