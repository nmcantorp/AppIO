<?php 

require_once('funciones.php');

$url = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
$result=1;
while ($result == 1) {
	$xmlNode = simplexml_load_file($url);
	$arrayData = xmlToArray($xmlNode);

	$result = saveCurrency($arrayData['Envelope']['Cube']['Cube']['Cube']);

	usleep(1200000000);

}




?>