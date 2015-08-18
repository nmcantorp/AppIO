<?php

if(!isset($_REQUEST['ac']) || is_null($_REQUEST['ac']) )
{
	return "No puede acceder a este modulo sin autorizaci&oacute;n";
}
switch ($_REQUEST['ac']) {
	case 'grafica':
		$validaciion = $_REQUEST['valida'];
		$antec = $_REQUEST['antec'];
		$tiempo = $_REQUEST['tiempo'];
		$temporal = array();
		for ($i=0; $i < count($antec); $i++) { 
			$temporal[$i] = explode( ";" , $antec[$i]['antec']);
			array_multisort($temporal[$i]);
		}

		$antec = $temporal;
		$temporal = array();
		for ($i=0; $i < count($tiempo); $i++) { 
			$temporal[$i]['actividad'] 	= ($i + 1);
			$temporal[$i]['tiempo']		= $tiempo[$i]['tiempo'];
			$temporal[$i]['antecesor']	= $antec[$i];
		}

		/**
		 * Se cargan los Divs para cargar ocultos para las actividades
		 */
/*		$html .= "<section class='grafica'>";
		$html .= "<table style=' border-spacing: 20px; border-collapse: separate;'><tbody>";

		$left = 0;
		for ($i=0; $i < 20; $i++) {	
			$html .= "<tr>";
			for ($j=0; $j < 20 ; $j++) { 
				$html .= "<td style='width: 30px;'><div id='actividad_".$i."_".$j."' class='act_graf' style='left:$left; text-align:center; width: 30px;'>".$j."</div></td>";		
			}	
			$html .= "</tr>";	
			$left=$left+50;
		}
		$html .= "</tbody></table>";
		$html .= "</section>";*/

		$html .= "<section class='grafica'>";
		//$html .= "<table style=' border-spacing: 20px; border-collapse: separate;'><tbody>";

		$left = -10;
		$top = -10;
		for ($i=0; $i < 20; $i++) {	
			$html .= "<div class='content_grid'>";
			for ($j=0; $j < 20 ; $j++) {
				$html .= "<div id='actividad_".$i."_".$j."' class='act_graf' style='left:$left; text-align:center; width: 30px;'></div>";		
				$html .= "<canvas id='linea".$j."' class='lineas' style='left:".$left."px; top:".$top."px'></canvas>";		
				 $left += 35;
				 $top += 30;
			}	
			$html .= "</div>";	
			//$left=$left+50;
		}
		//$html .= "</tbody></table>";
		$html .= "</section>";

/*		$html .= "<section class='grafica'>";
		$k = 0;
		$wid_max = 0;
		for ($i=0; $i < count($temporal); $i++) {
			if(count($temporal[$i]['antecesor'])==1)
				if(is_null($temporal[$i]['antecesor'][$k])|| $temporal[$i]['antecesor'][$k] == '') {
					$wid = ($temporal[$i]['tiempo']>80)?$temporal[$i]['tiempo']/3:$temporal[$i]['tiempo'];
					if($wid_max < $wid){
						$wid_max = $wid;
					}
					$html .= "<div id='actividad_$i' class='act_graf' style='width: 7%; left:0;'>".$temporal[$i]['actividad']."</div>";
				}

		}

		$max_ant = 0;
		for ($i=0; $i < count($temporal); $i++) {
			if(count($temporal[$i]['antecesor'])>=1)
				if(!is_null($temporal[$i]['antecesor'][$k]) && $temporal[$i]['antecesor'][$k] != '') {
					if($max_ant<count($temporal[$i]['antecesor']))
						$max_ant = count($temporal[$i]['antecesor']);
				}

		}

		for ($i=0, $ant_final = 0 ; $i < count($temporal) && $max_ant > $ant_final; $i++) {
			//if(count($temporal[$i]['antecesor'])>1)     ($wid * ($i/2))
				if(!is_null($temporal[$i]['antecesor'][$k]) && $temporal[$i]['antecesor'][$k] != '') {
					$wid = ($temporal[$i]['tiempo']>80)?$temporal[$i]['tiempo']/3:$temporal[$i]['tiempo'];
					$html .= "<div id='actividad_$i' class='act_graf' style='min-width: 7%; width: 10%; left: ". rand($i, $i*6) ."%; text-align: center; position: absolute;' >".$temporal[$i]['actividad']."</div>";
					if($wid_max < $wid){
						$wid_max = $wid;
					}
				}

		}

		$html .= "</section>";*/

		//$html .= "<div class='contact-but' style='float: right; width: 120px;' ><input type='submit' id='volver' value='Volver' style='width: 100%;background: #FF6161;' onClick='javascript:volver_actividades();'/></div>";
		
		$resultado = json_encode(array('html'=>$html, 'info_arreglada' => $temporal));
		print_r($resultado);

		die();
		break;
	
	default:
		# code...
		break;
}



 ?>