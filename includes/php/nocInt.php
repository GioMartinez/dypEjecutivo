<?php
include_once 'nusoap.php'; // require de nusoap for the
// her beginds the NOC class for the calls to the Web service
class NOCface{
	var $nocAddr;
	var $nocUser;
	var $nocPass;
	var $client;
	var $ws_token;
	var $errors;
	public function __construct($server,$user,$pass){
		$this->nocAddr = $server;
		$this->nocUser = $user;
		$this->nocPass = $pass;
		$this->errors = array();
		$this->client = new nusoap_client($this->nocAddr,true);
		$this->client->soap_defencoding = 'UTF-8';
		$error = $this->client->getError();
		if($error){echo '<h2>Error creating NuSoap client</h2><pre>'.$error.'</pre>';}
		$this->bind_to_NOC();
	}
	/* attempt to bind to NOC server */
	private function bind_to_NOC(){
		$this->ws_token = $this->client->call('login',array(
			"userName" => $this->nocUser, 
			"passwordHash" => $this->nocPass, 
			"hashType" => "MD5"
		));
		/* handle errors with SOAP */
		$soapError = $this->client->getError();
		if(!empty($soapError)){
			$errorMessage = 'Nusoap object creation failed: '.$soapError;
			throw new Exception($errorMessage);
		}
		//if($ws_token){echo 'Bind to NOC Successful <br><br>';}
		//else{throw new Exception('Bind to NOC Failed');}
		$this->ws_token = $this->ws_token['loginReturn'];
	}
	public function getChilds($dn) {
		$inclusionSpec = array(
			"childDepth" => 1,
			"forceDiscovery" => false,
			"includeLeftElements" => false,
			"includeRightElements" => false
		);
		$contentSpec = array(
			"includeIconInfo" => false,
			"includeOperationInfo" => false,
			"includePropertyValues" => false,
			"includeSeriesInfo" => true,
			"includeSlas" => false,
			"optionalAttributeNames" => array("Element")
		);
		$responseThrottle = array("maxRecords" => 1);

		// make SOAP call
		$result = $this->client->call('getElement', array(
			"session" => $this->ws_token,
			"dName" => $dn,
			"inclusionSpec" => $inclusionSpec,
			"contentSpec" => $contentSpec,
			"throttle" => $responseThrottle
		));
		if(isset($result['getElementReturn'])){
			return $result['getElementReturn']['elements']['elements'];
		}
	}
	public function getAlarms($dn){
		$responseThrottle=array("maxRecords"=>0);
		$restablecimiento=array();
		$timestamp=0;
		$value=0;
		$result=$this->client->call('getAlarms',array(
			"session"=>$this->ws_token,
			"elementDName"=>$dn,
			"channelName"=>"REALTIME",
			"throttle"=>$responseThrottle
		));
		if(isset($result['getAlarmsReturn']['alarms']['alarms'][0])){
			return null;
		}
		else{
			foreach($result['getAlarmsReturn']['alarms']['alarms']['fields']['fields'] as$key=>$value){
				if($value['name']=='Description'){
					return $value['value'];
				}
			}
		}
		//return $result['getAlarmsReturn']['alarms']['alarms']['fields']['fields'];
	}
	public function getSeriesDescriptors($dn){
		$inclusionSpec = array(
			"childDepth" => 0,
			"forceDiscovery" => false,
			"includeLeftElements" => false,
			"includeRightElements" => false
		);
		$contentSpec = array(
			"includeIconInfo" => false,
			"includeOperationInfo" => false,
			"includePropertyValues" => false,
			"includeSeriesInfo" => true,
			"includeSlas" => false,
			"optionalAttributeNames" => array("")
		);
		$responseThrottle = array("maxRecords" => 0);

		// make SOAP call
		$result = $this->client->call('getElement', array(
			"session" => $this->ws_token,
			"dName" => $dn,
			"inclusionSpec" => $inclusionSpec,
			"contentSpec" => $contentSpec,
			"throttle" => $responseThrottle
		));
		foreach ($result['getElementReturn']['elements']['item']['seriesDescriptors']['item'] as $key => $value) {
			if(!strpos($value['expressionName'],'(Avg)') || !strpos($value['expressionName'],'(High)') || !strpos($value['expressionName'],'(Low)')){
				return $value;
			}
		}
	}
	public function myNextSeries($cursor){
		$throttle = array("maxRecords" => 0);
		$result = $this->client->call('nextSeriesData', array(
			"session" => $this->ws_token,
			"cursor" => $cursor,
			"throttle" => $throttle
		));
		if(isset($result['nextSeriesDataReturn']['dataPoints']['dataPoints'])){
			foreach($result['nextSeriesDataReturn']['dataPoints']['dataPoints'] as $item => $register){
				$this->allSeries[] = $register;
			}
			$cursor = $result['nextSeriesDataReturn']['cursor'];
			if(isset($cursor)){
				return $cursor;
			}
		}
	}
	public function mySeries($dn,$offset,$expression,$profile){
		$this->allSeries=null;
		do{
			$prev=(string)date("Y-m-d\TH:i:s.000\Z",time()-$offset);
			$now=(string)date("Y-m-d\TH:i:s.000\Z",time()-$offset+(24*60*60));
			$throttle=array("maxRecords"=>0);
			$seriesDescriptor['from']=$prev;
			$seriesDescriptor['to']=$now;
			$seriesDescriptor['expressionName']=$expression;
			$seriesDescriptor['profileName']=$profile;
			$seriesDescriptor['type']="TYPE_SIMPLE_FLOAT";
			$result=$this->client->call('getSeriesData',array(
				"session"=>$this->ws_token,
				"elementDName"=>$dn,
				"throttle"=>$throttle,
				"seriesDescriptor"=>$seriesDescriptor
			));
			if(isset($result['getSeriesDataReturn']['dataPoints']['dataPoints'])){
				foreach($result['getSeriesDataReturn']['dataPoints']['dataPoints'] as $item=>$register){
					$this->allSeries[]=$register;
				}
				$cursor=$result['getSeriesDataReturn']['cursor'];
				while($cursor != null){
					$cursor=$this->myNextSeries($cursor);
				}
			}
			$offset=$offset-(24*60*60);
		}
		while($offset>=(24*60*60));
		return $this->allSeries;
	}
}
?>