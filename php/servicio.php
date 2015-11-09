<?php 
header("Content-Type:application/json");
require_once('webservice/funciones.php');

switch ($_REQUEST['ac']) {
	case 'save':
		$valores = $_REQUEST['data'];	

		$proyecto['nombre'] 	= $valores['proyecto'];
		$proyecto['gerente'] 	= $valores['gerente'];
		$proyecto['fecha'] 		= $valores['fecha'];
		$proyecto['objetivo'] 	= $valores['objetivo'];
		$proyecto['cantidad'] 	= $valores['cantidad'];

		if($valores['objetivo'] == 'd')
		{
			$medida = 2;
		}else{
			$medida = 1;
		}

		$complejidad = 1;

		$proyecto['medida'] 	= $medida;
		$proyecto['complejidad']= $complejidad;

		//print_r($valores);die();
		$result_proyecto['id_p'] = saveProyect($proyecto);
		
		saveDetalleProyect($valores, $result_proyecto['id_p']);


		Respuesta_entrega(200,"Information found", $result_proyecto['id_p']);

	break;

	case 'save_a':
		$valores = $_REQUEST['data'];	
		$proyecto['nombre'] 		= $valores['proyecto'];
		$proyecto['gerente'] 		= $valores['gerente'];
		$proyecto['fecha'] 			= $valores['fecha'];
		$proyecto['objetivo'] 		= $valores['objetivo'];
		$proyecto['cantidad'] 		= $valores['cantidad'];
		$proyecto['presupuesto'] 	= $valores['presupuesto'];
		//print_r($valores);die();

		if($valores['objetivo'] == 'd')
		{
			$medida = 2;
		}else{
			$medida = 1;
		}

		$complejidad = 2;


		$proyecto['medida'] 	= $medida;
		$proyecto['complejidad']= $complejidad;

		//print_r($valores);die();
		$result_proyecto['id_p'] = saveProyectA($proyecto);
		
		saveDetalleProyectA($valores, $result_proyecto['id_p']);


		Respuesta_entrega(200,"Information found", $result_proyecto['id_p']);
		
	break;
	
	default:
		# code...
		break;
}

/*if(isset($_REQUEST['Date_Start']) && !empty($_REQUEST['Date_Start'])){
	$date_start = $_REQUEST['Date_Start'];
	$date_finish = (isset($_REQUEST['Date_finish']) && !empty($_REQUEST['Date_finish']))?$_REQUEST['Date_finish']:null;
	$result = Validate_by_Date($date_start, $date_finish);

	if($result != 0){

		Respuesta_entrega(200,"Information found", $result);
	}else{
		Respuesta_entrega(200,"No information for selected date, the format requested is 'Y-M-D'", null);
	}


}else{
	Respuesta_entrega(400,"Invalid Date", null);
	
}*/

?>