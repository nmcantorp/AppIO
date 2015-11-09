<?php 

if ($_REQUEST['ac'] == 1) {
	
	$url = "http://".$_SERVER['HTTP_HOST']."/webservicerest/servicio.php?Date_Start=".$_REQUEST['date_start']."&Date_finish=".$_REQUEST['date_finish'];
	$client = curl_init($url);

	curl_setopt($client, CURLOPT_RETURNTRANSFER,1);

	$respuesta = curl_exec($client);
	$result =json_decode($respuesta);
}

?>

<form action="?ac=1" method="POST" >
	<input type="date" name="date_start" value="" placeholder="">
	<input type="date" name="date_finish" value="" placeholder="">
	<input type="submit" name="buscar" value="Buscar">
</form>

<?php 

if (!is_null($result->data)) {
	echo $result->data;
}else{
	echo "no registra informaci&oacute;n";
}

 ?>