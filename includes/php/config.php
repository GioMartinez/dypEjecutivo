<?php
ini_set('display_errors','1');
ini_set('display_startup_errors','1');
ini_set('html_errors','1');
ini_set('log_errors','1');
ini_set('max_input_time','60');
ini_set('output_buffering','4096');
ini_set('track_errors','1');
ini_set('variables_order','GPCS');
error_reporting(E_ALL ^ E_DEPRECATED);
// NOC connection parameters
date_default_timezone_set("America/Mexico_City");
$nocAddr = 'http://127.0.0.1:8084/wsapi/services/Moswsapi_1_1?wsdl';
$nocUser = 'admin';
$nocPass = 'formula';
$nocPass = base64_encode(hash('md5',$nocPass,true));
$memAddr = '127.0.0.1';
$memPort = '11211';
$memExpi = 4;
$psqlAdd = 'localhost';
$psqlUsr = 'dbuser';
$psqlDbs = 'dyp';
$psqlPss = 'Novell2017';
$psqlTbl = 'historicos';
$root = "Ejecutivo=Ejecutivo/DyPAnuales=DyPAnuales/root=Elements";
$timeOffset = 60*60;
?>