<?php
class Cache{
	var $memory;
	var $server;
	var $port;
	var $expire;
	var $dataPersistence = 0;
	function __construct($server,$port,$expire){
		$this->memory = new Memcached;
		$this->server = $server;
		$this->port = $port;
		$this->expire = $expire;
		$cacheBindSuccessful = $this->memory->addServer($server, $port);
		if(!$cacheBindSuccessful){
			error_log("Reinitializing cache at ".$server.":".$port."...");
			$startCache = shell_exec('service memcached start');
			while (shell_exec('netstat -tan | grep '.$port) == null){sleep(1);}
			$this->memory = new Memcached;
			$cacheBindSuccessful = $this->memory->addServer($server, $port);
		}
	}
	function set($key,$value){
		$this->memory->set($key,$value,$this->dataPersistence) or die ("Failed to save data at the server");
  	}
  	function get($key){
  		return $this->memory->get($key);
  	}
  	function delete($key){
  		return $this->memory->delete($key);
  	}
	function getAllKeys(){
		return $this->memory->getAllKeys();
	}
	function getStats(){
		return $this->memory->getStats();
	}
  	function checkExpiration($data){
	      while (count($data) >= $this->expire){ 
	        array_shift($data); 
	      } // may require multiple shift if expire is modified
	      return $data;
  	}
  	function printSpace($key){
  		$value = $this->memory->get($key);
  		if (gettype($value)=="array") {
  			foreach ($value as $key => $val) {
  				echo $key.': '.$val.'<br>';
  			}
  			echo '<br>';
  		}
  		else echo $this->memory->get($key).'<br>';
  	}
}
?>