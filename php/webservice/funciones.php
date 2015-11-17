<?php 

function Validate_by_Date($date_start, $date_finish=null)
{
require_once('conexion.php');

$objConnect = new ClassConexion();
$objConnect->MySQL();

$query = "	SELECT
				`order`.order_id,
				product.name_product,
				customer.name_customer
			FROM
				`order`
			INNER JOIN order_detail ON order_detail.order_id = `order`.order_id
			INNER JOIN product ON order_detail.product_id = product.product_id
			INNER JOIN currency ON `order`.currency_id = currency.currency_id
			INNER JOIN customer ON `order`.customer_id = customer.customer_id
			WHERE
			`order`.date_order >= '$date_start'";

if(!is_null($date_finish))
	$query .= " AND `order`.date_order <= '$date_start' ";			 

$consulta = $objConnect->consulta($query);
		
if($objConnect->num_rows($consulta)>0){ 
	$conteo=0;
 	while($resultados = $objConnect->fetch_array($consulta)){ 
		  	$result[$resultados['parameter_key']] = $resultados['parameter_value'];
 	}
}else{
	$result = 0 ;
}
return $result;

}

function Respuesta_entrega($estado, $mensaje, $data)
{
	header("HTTP/1.1 $estado, $mensaje");

	$respuesta['status'] = $estado;
	$respuesta['status_message'] = $mensaje;
	$respuesta['data'] = $data;

	$value_final = json_encode($respuesta);
	echo $value_final;
}

function xmlToArray($xml, $options = array()) {
    $defaults = array(
        'namespaceSeparator' => ':',//you may want this to be something other than a colon
        'attributePrefix' => '@',   //to distinguish between attributes and nodes with the same name
        'alwaysArray' => array(),   //array of xml tag names which should always become arrays
        'autoArray' => true,        //only create arrays for tags which appear more than once
        'textContent' => '$',       //key used for the text content of elements
        'autoText' => true,         //skip textContent key if node has no attributes or child nodes
        'keySearch' => false,       //optional search and replace on tag and attribute names
        'keyReplace' => false       //replace values for above search values (as passed to str_replace())
    );
    $options = array_merge($defaults, $options);
    $namespaces = $xml->getDocNamespaces();
    $namespaces[''] = null; //add base (empty) namespace
 
    //get attributes from all namespaces
    $attributesArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
            //replace characters in attribute name
            if ($options['keySearch']) $attributeName =
                    str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
            $attributeKey = $options['attributePrefix']
                    . ($prefix ? $prefix . $options['namespaceSeparator'] : '')
                    . $attributeName;
            $attributesArray[$attributeKey] = (string)$attribute;
        }
    }
 
    //get child nodes from all namespaces
    $tagsArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->children($namespace) as $childXml) {
            //recurse into child nodes
            $childArray = xmlToArray($childXml, $options);
            list($childTagName, $childProperties) = each($childArray);
 
            //replace characters in tag name
            if ($options['keySearch']) $childTagName =
                    str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
            //add namespace prefix, if any
            if ($prefix) $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;
 
            if (!isset($tagsArray[$childTagName])) {
                //only entry with this key
                //test if tags of this type should always be arrays, no matter the element count
                $tagsArray[$childTagName] =
                        in_array($childTagName, $options['alwaysArray']) || !$options['autoArray']
                        ? array($childProperties) : $childProperties;
            } elseif (
                is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
                === range(0, count($tagsArray[$childTagName]) - 1)
            ) {
                //key already exists and is integer indexed array
                $tagsArray[$childTagName][] = $childProperties;
            } else {
                //key exists so convert to integer indexed array with previous value in position 0
                $tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
            }
        }
    }
 
    //get text content of node
    $textContentArray = array();
    $plainText = trim((string)$xml);
    if ($plainText !== '') $textContentArray[$options['textContent']] = $plainText;
 
    //stick it all together
    $propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
            ? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;
 
    //return node as array
    return array(
        $xml->getName() => $propertiesArray
    );
}


function saveCurrency($data = array())
{
	require_once('conexion.php');

$objConnect = new ClassConexion();
$objConnect->MySQL();
	for ($i=0; $i < count($data); $i++) { 

		$query = "	INSERT INTO currency (
					name_currency,
					rate,
					date_report
				)
				VALUES
					('".$data[$i]['@currency']."',".$data[$i]['@rate'].", NOW())";

		$result = $objConnect->consulta($query); 
	}

	return $result;
}

function saveProyect($valores)
{
    require_once('conexion.php');

    $objConnect = new ClassConexion();
    $objConnect->MySQL();
    $query = "  INSERT INTO proyecto_pert (
                proyecto_pert.Nombre_Proyecto,
                proyecto_pert.Nombre_Gerente,
                proyecto_pert.Fecha_Inicio,
                proyecto_pert.Descripcion_Proyecto,
                proyecto_pert.Medida_Tiempo_Id,
                proyecto_pert.Complejidad_Proyecto_Id,
                proyecto_pert.id_device
            )
            VALUES
                ('".$valores['nombre']."',
                 '".$valores['gerente']."',
                 '".$valores['fecha']."',
                 '".$valores['objetivo']."',
                 '".$valores['medida']."',
                 '".$valores['complejidad']."',
                 '".$valores['dispositivo']."')";
    $objConnect->consulta($query); 
    $result = $objConnect->insert_id(); 


        return $result;
}

function saveProyectA($valores)
{
    require_once('conexion.php');

    $objConnect = new ClassConexion();
    $objConnect->MySQL();
    $query = "  INSERT INTO proyecto_pert (
                proyecto_pert.Nombre_Proyecto,
                proyecto_pert.Nombre_Gerente,
                proyecto_pert.Fecha_Inicio,
                proyecto_pert.Descripcion_Proyecto,
                proyecto_pert.Medida_Tiempo_Id,
                proyecto_pert.Complejidad_Proyecto_Id,
                proyecto_pert.id_device,
                proyecto_pert.Presupuesto_Proyecto
            )
            VALUES
                ('".$valores['nombre']."',
                 '".$valores['gerente']."',
                 '".$valores['fecha']."',
                 '".$valores['objetivo']."',
                 '".$valores['medida']."',
                 '".$valores['complejidad']."',
                 '".$valores['dispositivo']."',
                 '".$valores['presupuesto']."')";
    $objConnect->consulta($query); 
    $result = $objConnect->insert_id(); 


        return $result;
}

function saveDetalleProyect($data, $id_proyecto)
{
    require_once('conexion.php');

    //echo ('final');die();

    $objConnect = new ClassConexion();
    $objConnect->MySQL();
    for ($i=0; $i < $data['cantidad']; $i++) { 

    $query = "  INSERT INTO actividad (
                actividad.Nombre_Actividad,
                actividad.Tesperado_Actividad,
                actividad.Numero_Actividad,
                actividad.Proyecto_Id
            )
            VALUES
                ('".$data['nombre'][$i]['nombre'] ."',
                 '".$data['tiempo'][$i]['tiempo'] ."',
                 '".($i+1) ."',
                 '".$id_proyecto."')";

    $objConnect->consulta($query); 

    $query = "  SELECT
                Max(actividad.Actividad_Id) as 'id_act'
                FROM
                actividad
                WHERE
                actividad.Proyecto_Id = $id_proyecto";

    $result_detalle_temp = $objConnect->consulta($query); 
    if($objConnect->num_rows($result_detalle_temp)>0){ 
        $conteo=0;
        while($resultados = $objConnect->fetch_array($result_detalle_temp)){ 
            $result_detalle = $resultados['id_act']; 
        }
    }

    if(isset($data['actividad'][$i]['antec']) && !is_null($data['actividad'][$i]['antec']) && $data['actividad'][$i]['antec'] != '')
    {
        $query = "  SELECT
                    actividad.Proyecto_Id,
                    actividad.Nombre_Actividad,
                    actividad.Actividad_Id,
                    actividad.Numero_Actividad
                    FROM
                    actividad
                    WHERE
                    actividad.Numero_Actividad IN (".$data['actividad'][$i]['antec'].")
                    AND actividad.Proyecto_Id = $id_proyecto";
        //die($result_detalle);
        $consulta = $objConnect->consulta($query);

        if($objConnect->num_rows($consulta)>0){ 
            $conteo=0;
            while($resultados = $objConnect->fetch_array($consulta)){ 
                    //print_r($resultados);die();
                    $result_int['Proyecto_Id']      = $resultados['Proyecto_Id'];
                    $result_int['Nombre_Actividad'] = $resultados['Nombre_Actividad'];
                    $result_int['Actividad_Id']     = $result_detalle;
                    $result_int['Numero_Actividad'] = $resultados['Numero_Actividad'];
            //print_r($result_int);die();
            $query = "  INSERT INTO actividad_predecesora (
                    actividad_predecesora.Nombre_Actividad,
                    actividad_predecesora.Numero_Actividad,
                    actividad_predecesora.Actividad_Id
            )
            VALUES
                ('".$result_int['Nombre_Actividad']."',
                 '".$result_int['Numero_Actividad']."',
                 '".$result_int['Actividad_Id']."')";
        //die($query);
            $objConnect->consulta($query); 
            $result_final = $objConnect->insert_id();  
            }
        }
    }
    }

    return $result_detalle;
}

function saveDetalleProyectA($data, $id_proyecto)
{
    require_once('conexion.php');

    //echo ('final');die();

    $objConnect = new ClassConexion();
    $objConnect->MySQL();
    for ($i=0; $i < $data['cantidad']; $i++) { 

    $query = "  INSERT INTO actividad (
                actividad.Nombre_Actividad,
                actividad.Tpesimista_Actividad,
                actividad.Tprobable_Actividad,
                actividad.Toptimista_Actividad,
                actividad.Tesperado_Actividad,
                actividad.Costo_Actividad,
                actividad.Numero_Actividad,
                actividad.Desviacion_Estandar_Actividad,
                actividad.Varianza_Actividad,
                actividad.Proyecto_Id
            )
            VALUES
                ('".$data['nombre'][$i]['nombre'] ."',
                 '".$data['pesimista'][$i]['tiempo'] ."',
                 '".$data['probable'][$i]['tiempo'] ."',
                 '".$data['optimista'][$i]['tiempo'] ."',
                 '".$data['tiempo'][$i]['tiempo'] ."',
                 '".$data['costo'][$i]['valor'] ."',
                 '".($i+1) ."',
                 '".$data['desviacion'][$i]['tiempo'] ."',
                 '".$data['varianza'][$i]['tiempo'] ."',
                 '".$id_proyecto."')";

    $objConnect->consulta($query); 
    $result = $objConnect->insert_id();

    $query = "  SELECT
                Max(actividad.Actividad_Id) as 'id_act'
                FROM
                actividad
                WHERE
                actividad.Proyecto_Id = $id_proyecto";

    $result_detalle_temp = $objConnect->consulta($query); 
    if($objConnect->num_rows($result_detalle_temp)>0){ 
        $conteo=0;
        while($resultados = $objConnect->fetch_array($result_detalle_temp)){ 
            $result_detalle = $resultados['id_act']; 
        }
    }

    if(isset($data['actividad'][$i]['antec']) && !is_null($data['actividad'][$i]['antec']) && $data['actividad'][$i]['antec'] != '')
    {
        $query = "  SELECT
                    actividad.Proyecto_Id,
                    actividad.Nombre_Actividad,
                    actividad.Actividad_Id,
                    actividad.Numero_Actividad
                    FROM
                    actividad
                    WHERE
                    actividad.Numero_Actividad IN (".$data['actividad'][$i]['antec'].")
                    AND actividad.Proyecto_Id = $id_proyecto";
        
        $consulta = $objConnect->consulta($query);

        if($objConnect->num_rows($consulta)>0){ 
            $conteo=0;
            while($resultados = $objConnect->fetch_array($consulta)){ 
                    //print_r($resultados);die();
                    $result_int['Proyecto_Id']      = $resultados['Proyecto_Id'];
                    $result_int['Nombre_Actividad'] = $resultados['Nombre_Actividad'];
                    $result_int['Actividad_Id']     = $result_detalle;
                    $result_int['Numero_Actividad'] = $resultados['Numero_Actividad'];
            //print_r($result_int);die();
            $query = "  INSERT INTO actividad_predecesora (
                    actividad_predecesora.Nombre_Actividad,
                    actividad_predecesora.Numero_Actividad,
                    actividad_predecesora.Actividad_Id
            )
            VALUES
                ('".$result_int['Nombre_Actividad']."',
                 '".$result_int['Numero_Actividad']."',
                 '".$result_int['Actividad_Id']."')";
            //die($query);
            $objConnect->consulta($query); 
            $result_final = $objConnect->insert_id();  
            }
        }
    }
    }

    return $result;
}

function findproject($id_device=null, $id_proyecto=null)
{
    require_once('conexion.php');

    //echo ('final');die();

    $objConnect = new ClassConexion();
    $objConnect->MySQL();


    $query = "  SELECT
                proyecto_pert.Proyecto_Id,
                proyecto_pert.Nombre_Proyecto,
                proyecto_pert.Nombre_Gerente,
                DATE_FORMAT(proyecto_pert.Fecha_Inicio, '%Y-%m-%d') as 'Fecha_Inicio',
                proyecto_pert.Presupuesto_Proyecto,
                proyecto_pert.Descripcion_Proyecto,
                proyecto_pert.Duracion_Proyecto,
                proyecto_pert.Fecha_Fin,
                proyecto_pert.Desviacion_Estandar,
                proyecto_pert.Varianza_Proyecto,
                proyecto_pert.Medida_Tiempo_Id,
                proyecto_pert.Complejidad_Proyecto_Id,
                proyecto_pert.id_device,
                medida_tiempo.Nombre_Medida,
                complejidad_proyecto.Nombre_Complejidad
                FROM
                proyecto_pert
                INNER JOIN actividad ON actividad.Proyecto_Id = proyecto_pert.Proyecto_Id
                INNER JOIN actividad_predecesora ON actividad_predecesora.Actividad_Id = actividad.Actividad_Id
                INNER JOIN medida_tiempo ON proyecto_pert.Medida_Tiempo_Id = medida_tiempo.Medida_Tiempo_Id
                INNER JOIN complejidad_proyecto ON proyecto_pert.Complejidad_Proyecto_Id = complejidad_proyecto.Complejidad_Proyecto_Id
                WHERE 1 ";
    if($id_device!=null) $query.=" AND proyecto_pert.id_device = '$id_device'";
    if($id_proyecto!=null) $query.=" AND proyecto_pert.Proyecto_Id = '$id_proyecto'";

    $query.= " GROUP BY
                proyecto_pert.Proyecto_Id ";

    $result_detalle_temp = $objConnect->consulta($query); 
    if($objConnect->num_rows($result_detalle_temp)>0){ 
        $conteo=0;
        while($resultados = $objConnect->fetch_array($result_detalle_temp)){ 
            $result_detalle[$conteo]['Proyecto_Id'] = $resultados['Proyecto_Id']; 
            $result_detalle[$conteo]['Nombre_Proyecto'] = $resultados['Nombre_Proyecto']; 
            $result_detalle[$conteo]['Nombre_Gerente'] = $resultados['Nombre_Gerente']; 
            $result_detalle[$conteo]['Fecha_Inicio'] = $resultados['Fecha_Inicio']; 
            $result_detalle[$conteo]['Presupuesto_Proyecto'] = $resultados['Presupuesto_Proyecto']; 
            $result_detalle[$conteo]['Descripcion_Proyecto'] = $resultados['Descripcion_Proyecto']; 
            $result_detalle[$conteo]['Nombre_Medida'] = $resultados['Nombre_Medida']; 
            $result_detalle[$conteo]['Nombre_Complejidad'] = $resultados['Nombre_Complejidad']; 
            $result_detalle[$conteo]['id_device'] = $resultados['id_device']; 
            $result_detalle[$conteo]['id_complejidad'] = $resultados['Complejidad_Proyecto_Id']; 
            $conteo++;
        }
    }

    return $result_detalle;
}

function findactivities($id_proyecto=null)
{
    require_once('conexion.php');

    //echo ('final');die();

    $objConnect = new ClassConexion();
    $objConnect->MySQL();


    $query = "  SELECT
                actividad.Actividad_Id,
                actividad.Nombre_Actividad,
                actividad.Tpesimista_Actividad,
                actividad.Tprobable_Actividad,
                actividad.Toptimista_Actividad,
                actividad.Tesperado_Actividad,
                actividad.Costo_Actividad,
                actividad.Proyecto_Id,
                actividad_predecesora.Numero_Actividad,
                actividad_predecesora.Actividad_Id as 'id_predecesora'
                FROM
                proyecto_pert
                INNER JOIN actividad ON actividad.Proyecto_Id = proyecto_pert.Proyecto_Id
                LEFT JOIN actividad_predecesora ON actividad_predecesora.Actividad_Id = actividad.Actividad_Id
                INNER JOIN medida_tiempo ON proyecto_pert.Medida_Tiempo_Id = medida_tiempo.Medida_Tiempo_Id
                INNER JOIN complejidad_proyecto ON proyecto_pert.Complejidad_Proyecto_Id = complejidad_proyecto.Complejidad_Proyecto_Id
                WHERE 1 ";
    if($id_proyecto!=null) $query.=" AND proyecto_pert.Proyecto_Id = '$id_proyecto'";

    $result_detalle_temp = $objConnect->consulta($query); 
    if($objConnect->num_rows($result_detalle_temp)>0){ 
        $conteo=0;
        while($resultados = $objConnect->fetch_array($result_detalle_temp)){ 
            $result_detalle[$conteo]['Actividad_Id'] = $resultados['Actividad_Id']; 
            $result_detalle[$conteo]['Nombre_Actividad'] = $resultados['Nombre_Actividad']; 
            $result_detalle[$conteo]['Tpesimista_Actividad'] = $resultados['Tpesimista_Actividad']; 
            $result_detalle[$conteo]['Tprobable_Actividad'] = $resultados['Tprobable_Actividad']; 
            $result_detalle[$conteo]['Toptimista_Actividad'] = $resultados['Toptimista_Actividad']; 
            $result_detalle[$conteo]['Tesperado_Actividad'] = $resultados['Tesperado_Actividad']; 
            $result_detalle[$conteo]['Costo_Actividad'] = $resultados['Costo_Actividad']; 
            $result_detalle[$conteo]['Numero_Actividad'] = $resultados['Numero_Actividad']; 
            $result_detalle[$conteo]['id_predecesora'] = $resultados['id_predecesora']; 
            $result_detalle[$conteo]['Proyecto_Id'] = $resultados['Proyecto_Id']; 
            $conteo++;
        }
    }

    return $result_detalle;
}

?>