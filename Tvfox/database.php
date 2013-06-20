<?php

namespace Tvfox;

use Zend;


class database {

	function __construct(){
	
		$adapter = new Zend\Db\Adapter\Adapter(array(
			'driver' => 'Pdo_Sqlite',
			'database' => DATABASE
		 ));
		$this->DB = $adapter;
	}

	function getProgramme($var){
	
		$chaine = $var["chaine"];
		$bouquet = $var["bouquet"];
                if(isset($var["ordre"]))$ordre=$var["ordre"];
                if(isset($var["day"]))$day=$var["day"];
		
		$sql = new Zend\Db\Sql\Sql($this->DB);
		$select = $sql->select();
                // yyyy-MM-ddTHH:mm:ss.SSS
                $Exp_start = new Zend\Db\Sql\Expression("strftime('%Y-%m-%dT%H:%M:%f', date_diffusion)");
                $Exp_end = new Zend\Db\Sql\Expression("strftime('%Y-%m-%dT%H:%M:%f',datetime(date_diffusion,'+'||duree_diffusion||' minutes'))");
                $Exp_editable = new Zend\Db\Sql\Expression("'false'");
                
		$select->from(array('sd'=>'speed_diffusion'));
		$select->columns(array('id'=>'id_diffusion','startTime'=>$Exp_start, 'duree_diffusion','endTime'=> $Exp_end,'summary'=> 'titre_diffusion','editable'=>$Exp_editable));
		$select->join(
			array('c'=>'chaine'),
			'sd.id_chaine = c.id_chaine',
			array('chaine_nom'=>'nom')
		);
		$select->join(
			array('bc'=>'bouquet_chaine'),
			'c.id_chaine = bc.id_chaine',
			array('ordre')
		);
		$select->join(
			array('b'=>'bouquet'),
			'bc.id_bouquet = b.id_bouquet',
			array('bouquet_nom'=>'nom')
		);
		$select->join(
			array('e'=>'emission'),
			'sd.id_emission = e.id_emission',
			array('photo')
		);
                $select->join(
			array('t'=>'texte'),
			'e.id_texte = t.id_texte',
			array('texte')
		);
                if(isset($day)){
                        $Exp = new Zend\Db\Sql\Expression("date('now','+".$day." days')");
                        $select->where->lessThan("date_diffusion",$Exp);
                }
                $Exp = new Zend\Db\Sql\Expression("date('now')");
                $select->where->greaterThan("date_diffusion",$Exp);
		if(isset($chaine) && is_array($chaine)) $select->where->in('c.id_chaine',$chaine);
		if(isset($bouquet))  $select->where->like('b.nom',"".$bouquet."");
                if(isset($ordre))  $select->where->lessThan('bc.ordre',"".$ordre."");
		
                
                $select->order(array("ordre"));
		$statement = $sql->prepareStatementForSqlObject($select);
		
		$results = $statement->execute();
	
		foreach($results as $key => $value){
		
			$r[] = $value;
		}
		return json_encode($r);
	}
	function getChaine($var){
	
		$chaine = $var["chaine"];
		$bouquet = $var["bouquet"];
	
		
		$sql = new Zend\Db\Sql\Sql($this->DB);
		$select = $sql->select();
		$select->from(array('c'=>'chaine'));
		
		$select->quantifier('DISTINCT');
		$select->columns(array('id_chaine','chaine_nom'=>'nom'));
	
		$select->join(
			array('bc'=>'bouquet_chaine'),
			'c.id_chaine = bc.id_chaine',
			array('ordre')
		);
		$select->join(
			array('b'=>'bouquet'),
			'bc.id_bouquet = b.id_bouquet',
			array('bouquet_nom'=>'nom')
		);
		
	
		
		if(isset($chaine) && is_array($chaine)) $select->where->in('c.id_chaine',$chaine);
		if(isset($bouquet))  $select->where->like('b.nom',"".$bouquet."");
		
		$statement = $sql->prepareStatementForSqlObject($select);
		
		$results = $statement->execute();
	
		foreach($results as $key => $value){
		
			$r[] = $value;
		}
		return json_encode($r);
	}
        
    function getAllPhoto(){
        
            $sql = new Zend\Db\Sql\Sql($this->DB);
            $select = $sql->select();
            
            $select->from(array('e'=>'emission'));

            $select->quantifier('DISTINCT');
            $select->columns(array('photo'));

          

            $statement = $sql->prepareStatementForSqlObject($select);

            $results = $statement->execute();
            
            $photo = new photo();
            
            foreach($results as $key => $value){
                    ob_start();
                    $url =  $value["photo"];
                    echo $url;
                    $buf = ob_get_clean();

                    echo $buf;
                    echo memory_get_usage()."\n";
                    
                    
                    $photo->getPhoto($url);
                    
                   
            }
            
            $message = array(
                    "message"=>"recuperation ok",
                    "type"=>"message",
                    "duration"=>200);
            return json_encode($message);

        
        
    }
}
