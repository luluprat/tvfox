<?php

namespace tvfox;

use Zend;


class database {

	function __construct(){
	
		$adapter = new Zend\Db\Adapter\Adapter(array(
			'driver' => 'Pdo_Sqlite',
			'database' => APPLICATION_PATH .'/Data/full_index.sqlite'
		 ));
		$this->DB = $adapter;
	}

	function getProgramme($var){
	
		$chaine = $var["chaine"];
		$bouquet = $var["bouquet"];
                if(isset($var["chaine"]))$chaine=$var["chaine"];
		
		$sql = new Zend\Db\Sql\Sql($this->DB);
		$select = $sql->select();
                $Exp = new Zend\Db\Sql\Expression("datetime(date_diffusion,'+'||duree_diffusion||' minutes')");
                $Exp_editable = new Zend\Db\Sql\Expression("'true'");
                
		$select->from(array('sd'=>'speed_diffusion'));
		$select->columns(array('id'=>'id_diffusion','startTime'=>'date_diffusion', 'duree_diffusion','endTime'=> $Exp,'summary'=> 'titre_diffusion','editable'=>$Exp_editable));
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
                if(isset($chaine)){
                        $Exp = new Zend\Db\Sql\Expression("date('now','+".$days." days')");
                        $select->where->lessThan("date_diffusion",$Exp);
                }
                $Exp = new Zend\Db\Sql\Expression("date('now','-1 days')");
                $select->where->greaterThan("date_diffusion",$Exp);
		if(isset($chaine) && is_array($chaine)) $select->where->in('c.id_chaine',$chaine);
		if(isset($bouquet))  $select->where->like('b.nom',"".$bouquet."");
		
                
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
    function getPhoto(){
        
    }
}
