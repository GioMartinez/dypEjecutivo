<?php
include_once'config.php';
include_once'nocInt.php';
include_once'memInt.php';
//include_once'psqInt.php';
$NOC=new NOCface($nocAddr,$nocUser,$nocPass);
$cache=new Cache($memAddr,$memPort,$memExpi);
function getAllSeries(){
	global$NOC;
	global$cache;
	global$timeOffset;
	global$seriesNames;
	foreach($seriesNames as $graph => $pltfrm){
		foreach($pltfrm as $key => $value){
			$temp=$NOC->mySeries($value['DN'],$timeOffset,$value['value'],$value['profile']);
			$cache->set($graph."_".$key,$temp);
			$NOC->allSeries=null;
		}
	}
}
function flood($dn,$tree){
	global$NOC;
	global$cache;
	global$timeOffset;
	$result=$NOC->getChilds($dn);
	if(isset($result['DName'])){
		$tree=array("DName"=>$result['DName']);
		$tree+=array("condition"=>$result['condition']);
		$childRight='includedChildDNames';
		if(isset($result[$childRight][$childRight])){
			$tree+=array("children"=>array());
			if(is_array($result[$childRight][$childRight])){
				foreach($result[$childRight][$childRight]as$key=>$value){
					$tree['children']+=array($key=>"");
					$tree['children'][$key]=flood($value,$tree['children'][$key]);
					if($tree['children'][$key]==''){unset($tree['children'][$key]);}
				}
			}
			else{
				$tree['children']+=array("0"=>"");
				$tree['children'][0]=flood($result[$childRight][$childRight],$tree['children'][0]);
				if($tree['children'][0]==''){unset($tree['children'][0]);}
			}
			sort($tree['children']);
			if(empty($tree['children'])){unset($tree['children']);}
		}
		else if(isset($result['rightRelationshipInfo']['rightRelationshipInfo'])){
			$tree+=array("children"=>array());
			if(isset($result['rightRelationshipInfo']['rightRelationshipInfo'][0])){
				foreach($result['rightRelationshipInfo']['rightRelationshipInfo']as$key=>$value){
					$tree['children']+=array($key=>"");
					$tree['children'][$key]=flood($value['relatedDName'],$tree['children'][$key]);
					if($tree['children'][$key]==''){unset($tree['children'][$key]);}
				}
			}
			else{
				$tree['children']+=array("0"=>"");
				$tree['children'][0]=flood($result['rightRelationshipInfo']['rightRelationshipInfo']['relatedDName'],$tree['children'][0]);
				if($tree['children'][0]==''){unset($tree['children'][0]);}
			}
			sort($tree['children']);
			if(empty($tree['children'])){unset($tree['children']);}
			
		}
		else{
			$vartest=$NOC->getAlarms($result['DName']);
			$tree+=array("values"=>$vartest);
		}
	}
	return$tree;
}
function seriesPsql(){
	global$psqlAdd;
	global$psqlDbs;
	global$psqlUsr;
	global$psqlPss;
	global$cache;
	$dbconn=pg_connect("host=".$psqlAdd." dbname=".$psqlDbs." user=".$psqlUsr." password=".$psqlPss)
	or die('No se ha podido conectar: ' . pg_last_error());
	$psqlTbl = 'historicos';
	$query='SELECT "PAGOSXHORA" as value,"FECHAHORA" as timestamp FROM '.$psqlTbl.' order by "FECHAHORA"';
	$result=pg_query($query) or die('La consulta falla: '.pg_last_error());
	$result=pg_fetch_all($result);
	$cache->set('pagos',$result);
	$psqlTbl='historicosrlc';
	$query='SELECT "TOTALLC" as value,"FECHAHORA" as timestamp FROM '.$psqlTbl.' order by "FECHAHORA"';
	$result=pg_query($query) or die('La consulta falla: '.pg_last_error());
	$result=pg_fetch_all($result);
	$cache->set('lineas',$result);
	$query='SELECT "TOTALRECIBIDAS" as value,"FECHAHORA" as timestamp FROM '.$psqlTbl.' order by "FECHAHORA"';
	$result=pg_query($query) or die('La consulta falla: '.pg_last_error());
	$result=pg_fetch_all($result);
	$cache->set('recibidas',$result);
	// situación emergente
	$psqlTbl = '"Auth2016"';
	$query='SELECT "Autenticaciones" as value,fechahora as timestamp FROM '.$psqlTbl.' order by fechahora';
	$result=pg_query($query) or die('La consulta falla: '.pg_last_error());
	$result=pg_fetch_all($result);
	$cache->set('cont1',$result);
	// obtenciones
	$psqlTbl = '"Obtencion"';
	$query='SELECT dia, "CIEC", "FIEL", "OTP", "PSW" FROM '.$psqlTbl.' order by dia desc';
	$result=pg_query($query) or die('La consulta falla: '.pg_last_error());
	$result=pg_fetch_all($result);
	$cache->set('obtencion',$result);
		
	pg_close($dbconn);
}
getAllSeries();
seriesPsql();

$tree=array();
$tree=flood($root,$tree);
echo "<br>tree:<br>";
print_r($tree);
$cache->set($root,$tree);

$tree=array();
$tree=flood($dypModel,$tree);
echo "<br>tree:<br>";
print_r($tree);
$cache->set($dypModel,$tree);
?>