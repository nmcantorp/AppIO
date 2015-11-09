<?php 
if($_REQUEST['ac']==1)
{
	system("php webservice/actualizar_currency.php > testoutput.php 2>&1 & echo $!", $output);

	//$orden = exec("php webservice/actualizar_currency.php");
	echo "Inicio Background Correctamente ";
}


?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body>
	<div>
		<h2>Usted va a iniciar el proceso en segundo plano de la actualizacion de Currency</h2>
		<form action="?ac=1" method="post" >
			<input type="submit" name="" value="Iniciar Background">
		</form>
	</div>
</body>
</html>