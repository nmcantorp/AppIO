$(document).on('ready',document, function(){
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
	var cantidad_actividad = 0;


	$( "#dialog-message" ).dialog({
      	modal: true,
    	buttons: {
        Aceptar: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    $( "#dialog-message" ).dialog("close");

    $( "#dialog_message_concept" ).dialog({
      	modal: true,
    	buttons: {
        Aceptar: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    $( "#dialog_message_concept" ).dialog("close");
});

/*Calculo de Tiempo esperado*/
function tiempo_esperado(tiempo_op, tiempo_pe, tiempo_pr)
{
	/*Formula de Tiempo esperado -->  te = (a+4m+b)/6  donde a=optimista, m=promedio, b=pesimista */
	x = ((parseInt(tiempo_op) + (4 * parseInt(tiempo_pr)) + parseInt(tiempo_pe))/6);
	return x;
}

/*Calculo Desvi Estandar*/
function varianza(tiempo_op, tiempo_pe)
{
	/*Formula para la desviacion estandar --> desv. estandar = ((b-a)^2)/36   donde a=optimista, m=promedio */
	console.log((Math.exp(parseInt(tiempo_pe) - parseInt(tiempo_op)))/36);
	return (((parseInt(tiempo_pe) - parseInt(tiempo_op))*(parseInt(tiempo_pe) - parseInt(tiempo_op))))/36;
}


//*** Este Codigo permite Validar que sea un campo Numerico
function Solo_Numerico(variable, cantidad){

	numero_antec = document.getElementsByName("antec").length;
	letra = '';
	text_final = '';
	for (var i = 0; i < variable.length && variable.length < (cantidad+1); i++) {
		letra = variable[i];
		// ,|
		valida 		= letra.search(/(,|[1-9])+/g);
		
		if(valida){
		    Numer=parseInt(letra);
		    if (!isNaN(Numer)){
		        text_final = text_final + Numer;
		    }
		}else{
			text_final = text_final + letra;
		}
	};

	if ( variable.length > (cantidad)) {
		letra = '';
		text_final = '';
		for (var i = 0; i < (cantidad) ; i++) {
			letra = variable[i];
			// ,|
			valida 		= letra.search(/(,|[1-9])+/g);
			
			if(valida){
			    Numer=parseInt(letra);
			    if (!isNaN(Numer)){
			        text_final = text_final + Numer;
			    }
			}else{
				text_final = text_final + letra;
			}
		};
	};

    return text_final;
}
function ValNumero(Control, cantidad){
    Control.value=Solo_Numerico(Control.value , cantidad);
}
//*** Fin del Codigo para Validar que sea un campo Numerico

function cargar_actividades(cantidad, tiempo){

	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}

	for (var i = 0; i < cantidad; i++) {		
		$('#content_activities').append('<div class="act_detail"><label>Nombre Actividad '+(i+1)+': <input type="text" id="actividad_'+i+'" /><label>Tiempo actividad '+(i+1)+': <input type="number" id="tiempo_'+i+'" min="0" max="999" onkeyUp="return ValNumero(this, 3);" required="required"/>&nbsp;' + tiempo + '</label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades(this,\'' + tiempo + '\');">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function cargar_actividades_avanzado(cantidad, tiempo){

	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}

	for (var i = 0; i < cantidad; i++) {		
		$('#content_activities').append('<div class="act_detail"><span>Actividad '+(i+1)+'</span><label>Nombre Actividad '+(i+1)+': <input type="text" id="actividad_'+i+'" /><label>T. Optimista '+(i+1)+': <input type="number" id="tiempo_o_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" />&nbsp;' + tiempo + '</label><label>T. Pesimista '+(i+1)+': <input type="number" id="tiempo_e_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label><label>T. Probable '+(i+1)+': <input type="number" id="tiempo_pr_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" />&nbsp;' + tiempo + '</label><label>Costo Act. '+(i+1)+': <input type="number" id="costo_'+i+'" min="0" max="1000" /></label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades_avanzado(this,\'' + tiempo + '\');">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function agregar_actividades(value, tiempo){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><label>Nombre Actividad '+(i+1)+': <input type="text" id="actividad_'+cantidad_actividad+'" /><label>Tiempo actividad '+(cantidad_actividad+1)+': <input type="number" id="tiempo_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades(this,\'' + tiempo + '\');">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide(); $(\'#actividades\').hide();" value="Regresar" /></div>');
	cantidad_actividad++;
}

function agregar_actividades_avanzado(value, tiempo){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><span>Actividad '+(cantidad_actividad+1)+'</span><label>Nombre Actividad '+(cantidad_actividad+1)+': <input type="text" id="actividad_'+cantidad_actividad+'" /><label>T. Optimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_o_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label><label>T. Pesimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_e_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label><label>T. Probable '+(cantidad_actividad+1)+': <input type="number" id="tiempo_pr_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label><label>Costo Act. '+(cantidad_actividad+1)+': <input type="number" id="costo_'+cantidad_actividad+'" min="0" max="1000"/></label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades_avanzado(this,\'' + tiempo + '\');">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
	cantidad_actividad++;
}

function alista_info()
{
	var antec 			= document.getElementsByName("antec");
	var fecha_inicial	= document.getElementsByName("f_inicio");
	var tiempos 		= $("[id^='tiempo']");
	var nombre_act 		= $("[id^='actividad_']");
	var valida 			= false;
	var array_act 		= [];
	var array_tiempo 	= [];
	var array_nombre 	= [];
	var result 			= Array(5);

	for (var i = 0; i < nombre_act.length; i++) {
		if( nombre_act[i].value==null || nombre_act[i].value== '' )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar el nombre de cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_nombre[i] = {nombre:nombre_act[i].value};		
	}
	
	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
			valida_antec = antec[i].value.split(',');
			for (var k = 0; k < valida_antec.length; k++) {
				if( parseInt(valida_antec[k]) > antec.length || (i+1) == parseInt(valida_antec[k]) )
				{
					valida = false;
				}
			};
		}		
		array_act[i] = {antec:antec[i].value};
	}


	if(!valida)
	{
		$('#dialog-message').html('<br><p>Algunas actividades dependen de la ejecución de otras, hay que evaluar cuales son las actividades predecesoras de cada una de ella</p>');
		$('#dialog-message').dialog("open");
		return false;
	}

	for (var i = 0; i < tiempos.length; i++) {
		if( tiempos[i].value==null || tiempos[i].value<= 0 )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar el tiempo para cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_tiempo[i] = {tiempo:tiempos[i].value};		
	}	

	//console.log(valida);return false;
	/*console.log(array_act);
	console.log(array_tiempo);*/
	result[0]=array_act;
	result[1]=array_tiempo;
	result[2]=valida;
	result[3]=tiempos;
	result[4]=antec;
	result[5]=array_nombre;
	result[6]=fecha_inicial[0].value
	console.log(result);
	return result ;
}

function alista_info_avanzado()
{
	var antec 				= document.getElementsByName("antec");
	var fecha_inicial		= document.getElementsByName("f_inicio");
	var tiempos_o 			= $("[id^='tiempo_o']");
	var tiempos_p 			= $("[id^='tiempo_e']");
	var tiempos_pr 			= $("[id^='tiempo_pr']");
	var nombre_act 			= $("[id^='actividad_']");
	var valida 				= false;
	var array_act 			= [];
	var array_t_optimista 	= [];
	var array_t_pesimista 	= [];
	var array_t_probable 	= [];
	var array_t_esperado 	= [];
	var array_d_estandar 	= [];
	var array_varianza  	= [];
	var array_nombre 		= [];
	var result 				= Array(10);
	
	console.log(tiempos_o);
	console.log(tiempos_p);
	console.log(tiempos_pr);

	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
		}		
		array_act[i] = {antec:antec[i].value};
	}

	for (var i = 0; i < nombre_act.length; i++) { 
		if( nombre_act[i].value!=null && nombre_act[i].value!='')
		{
			valida = true;
			valida_actividad = nombre_act[i].value.split(',');
			for (var k = 0; k < valida_actividad.length; k++) {
				if( parseInt(valida_actividad[k]) > nombre_act.length || (i+1) == parseInt(valida_actividad[k]) )
				{
					valida = false;
				}
			};
		}		
		array_nombre[i] = {nombre:nombre_act[i].value};
	}

	array_t_optimista[0]	={}
	array_t_pesimista[0]	={}
	array_t_probable[0]		={}
	array_t_esperado[0]		={}
	array_d_estandar[0]		={}
	array_varianza[0]		={}
	for (var i = 0; i < tiempos_o.length; i++) {
		if( tiempos_o[i].value==null || tiempos_o[i].value<= 0  || tiempos_p[i].value==null || tiempos_p[i].value<= 0 || tiempos_pr[i].value==null || tiempos_pr[i].value<= 0 )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar todos los tiempos para cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_t_optimista[i]	= {tiempo:tiempos_o[i].value};		
		array_t_pesimista[i]	= {tiempo:tiempos_p[i].value};		
		array_t_probable[i]  	= {tiempo:tiempos_pr[i].value};		
		array_t_esperado[i]  	= {tiempo: tiempo_esperado( tiempos_o[i].value, tiempos_p[i].value, tiempos_pr[i].value) };
		array_varianza[i]  		= {tiempo: varianza( tiempos_o[i].value, tiempos_p[i].value) };		
		array_d_estandar[i]  	= {tiempo: Math.sqrt(parseFloat(array_varianza[i]['tiempo'])) };		
	}

	if(!valida)
	{
		$('#dialog-message').html('<br><p>Algunas actividades dependen de la ejecución de otras, hay que evaluar cuales son las actividades predecesoras de cada una de ella</p>');
		$('#dialog-message').dialog("open");
	}



	/*var tiempos 		= $("[id^='tiempo']");
	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
		}		
		array_act[i] = {antec:antec[i].value};
	}
	for (var i = 0; i < tiempos.length; i++) {
		if( tiempos[i].value==null || tiempos[i].value<= 0 )
		{
			valida = false;
			break;
		}
		array_tiempo[i] = {tiempo:tiempos[i].value};		
	}*/
	/*console.log(array_act);
	console.log(array_tiempo);*/
	result[0]=array_act;
	result[1]=valida;
	// result[2]=tiempos;
	result[2]=antec;
	result[3]=array_t_optimista;
	result[4]=array_t_pesimista;
	result[5]=array_t_probable;
	result[6]=array_t_probable;
	result[7]=array_t_esperado;
	result[8]=array_d_estandar;
	result[9]=array_varianza;
	result[10]=array_nombre;
	result[11]=fecha_inicial[0].value
	console.log(result); //  return false;
	return result ;
}

function carga_info()
{
	result = alista_info();
	valida = result[2];
	array_act = result[0];
	array_tiempo = result[1];
	tiempos = result[3];
	array_tiempo = result[1];
	array_nombres = result[5];
	
	if(valida)
	{
		$('#error').html(null);		
		$('#step_one').hide();
		
		/**
		 * Se genera la tabla con la informacion en resumen de las actividades
		 */
		
		info_to_load = '<table class="table"><thead><tr>';
		info_to_load += '<th>Actividad</th><th style="text-align:center;">Predecesor</th><th style="text-align:center;">Tiempo</th></tr></thead>';
		info_to_load += '<tbody>';
		for (var i = 0; i < tiempos.length; i++) {
			var predecesor = '-';
			if( typeof array_act[i] != "undefined") predecesor = array_act[i].antec;
			info_to_load += '<tr><td>'+array_nombres[i].nombre+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_tiempo[i].tiempo+'</td></tr>';
		};

		info_to_load += '</tbody></table>';

		info_to_load += '<div class="contact-but" style="float: right; width: 120px;" ><input type="submit" id="volver" value="Volver" style="width: 100%;background: #FF6161;" onClick="javascript:volver_actividades();"/></div>';
		info_to_load += '<div class="contact-but" style="float:left; margin: 0 0 0 5px;width: 120px;" ><input type="submit" id="graficar" value="Graficar" style="width: 100%;background: #1793d1;" onClick="javascript:graficar();" /></div>';

		$('#step_two').html(info_to_load);
		$('#step_two').show();
	}
	else 
	{
		//$('#dialog-message').html('Debe completar toda la información del formulario');
		$('#dialog-message').dialog("open");
		//$('#error').html('Debe tener la informaci&oacute;n completa');
		$('#step_one').show();
		$('#step_two').hide();
	}
	
	
	//console.log(tiempos);
	//console.log(antec);
}

function carga_info_avanzado()
{
	result 			= alista_info_avanzado();
	valida 			= result[1];
	array_act 		= result[0];
	array_tiempo 	= result[7];
	tiempos 		= result[4];
	//array_tiempo 	= result[1];
	array_t_op 		= result[3];
	array_t_pr 		= result[5];
	array_t_pe 		= result[4];
	array_d_estandar= result[8];
	array_varianza	= result[9];
	array_nombres	= result[10];

	if(valida)
	{
		$('#error').html(null);		
		$('#step_one').hide();
		
		/**
		 * Se genera la tabla con la informacion en resumen de las actividades
		 */
		
		info_to_load = '<style>div#step_two{margin-bottom: 120px;}</style><div style="overflow-x: auto;"><table class="table table-bordered"><thead><tr>';
		info_to_load += '<th>Actividad</th><th style="text-align:center;">Predecesor</th><th style="text-align:center;">a</th><th style="text-align:center;">m</th><th style="text-align:center;">b</th><th style="text-align:center;">te</th><th style="text-align:center;">Desv. Est</th><th style="text-align:center;">Varianza</th></tr></thead>';
		info_to_load += '<tbody>';
		for (var i = 0; i < tiempos.length; i++) {
			var predecesor = '-';
			if( typeof array_act[i] != "undefined") predecesor = array_act[i].antec;
			info_to_load += '<tr><td>'+array_nombres[i].nombre+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_t_op[i]['tiempo']+'</td><td style="text-align:center;">'+array_t_pr[i]['tiempo']+'</td><td style="text-align:center;">'+ array_t_pe[i]['tiempo'] +'</td><td style="text-align:center;">'+array_tiempo[i]['tiempo'].toFixed(0)+'</td><td style="text-align:center;">'+array_d_estandar[i]['tiempo'].toFixed(2)+'</td><td style="text-align:center;">'+array_varianza[i]['tiempo'].toFixed(2)+'</td></tr>';
		};

		info_to_load += '</tbody></table></div><br>';
		//a=optimista, m=promedio, b=pesimista 
		info_to_load += '<table class="table"><thead><tr><th>a = Tiempo optimista</th></tr><tr><th>m = Tiempo promedio</th></tr><tr><th>b = Tiempo pesimista</th></tr><tr><th>te = Tiempo esperado <img src="images/tiempo_esperado_final.jpg" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Desv. Est = Desviaci&oacute;n est&aacute;ndar<img src="images/desv_est_final.jpg" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Varianza = <img src="images/varianza_final.jpg" style="float: right; margin-right: 40px;"/></th></tr>';

		info_to_load += '</thead></table>';

		info_to_load += '<div class="contact-but" style="float: right; width: 120px;" ><input type="submit" id="volver" value="Volver" style="width: 100%;background: #FF6161;" onClick="javascript:volver_actividades();"/></div>';
		info_to_load += '<div class="contact-but" style="float:left; margin: 0 0 0 5px;width: 120px;" ><input type="submit" id="graficar" value="Graficar" style="width: 100%;background: #1793d1;" onClick="javascript:graficar_avanzado();" /></div>';

		$('#step_two').html(info_to_load);
		$('#step_two').show();
	}
	else 
	{
		//$('#dialog-message').html('Debe tener toda la información del formulario');
		$('#dialog-message').dialog("open");
		//$('#error').html('Debe tener la informaci&oacute;n completa');
		$('#step_one').show();
		$('#step_two').hide();
	}
	
	
	//console.log(tiempos);
	//console.log(antec);
}

function volver_actividades()
{
	$('#step_one').show();
	$('#step_two').hide();
	$('#step_two').html(null);
	$('#grafica').html(null);
}

function dibujarCanvas(id){
var c=document.getElementById("linea"+id);
        var cxt=c.getContext("2d");
 
        cxt.moveTo(20,10);
        cxt.lineTo(130,100);
        cxt.lineWidth = 7;
        cxt.strokeStyle = "blue";
        cxt.stroke();
}

function habilitar_div (data) {
	console.log(data);
	/**
	 * habilita los Divs sin actividades anteriores
	 */
	var cuenta_ant = 0;
	for (i=0; i < data.length; i++) {
		if( data[i]['antecesor'].length==1 )
			if( data[i]['antecesor'][0] == '' ) {
				$('#actividad_'+cuenta_ant+'_0').css('display','block');
				$('#actividad_'+cuenta_ant+'_0').text(data[i]['actividad']);
				console.log($('#actividad_'+cuenta_ant+'_0'));
				cuenta_ant++;					
			}

	}

	var info_array = Array();

	for (i=0; i < data.length; i++) {
		if( data[i]['antecesor'].length >=1 )
			if( data[i]['antecesor'][0] != '' ) {
				var f = 0;
				for (var j = 0; j < data[i]['antecesor'].length; j++) {
					if( f == ((data[i]['antecesor'].length)-1) ){
						$('#actividad_'+data[i]['antecesor'][j]+'_'+i).css('display','block');
						$('#actividad_'+data[i]['antecesor'][j]+'_'+i).text(data[i]['actividad']);
						dibujarCanvas(i);
						info_array.push(data[i]['actividad']);
					}
					f++;
				};
				cuenta_ant++;					
			}

	}
	console.log(info_array);
}

function graficar()
{
	result = alista_info();
	valida = result[2];
	/*array_act = result[0];
	array_tiempo = result[1];*/
	tiempos = result[3];
	array_tiempo = result[1];
	array_nombre = result[5];

	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);
	array_nombre = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[1][i];
		array_nombre[i] = result[5][i];
	}

	localStorage["actividad"] = JSON.stringify(array_act);
	localStorage["tiempo"] = JSON.stringify(array_tiempo);
	localStorage["validacion"] = JSON.stringify(valida);
	localStorage["nombre"] = JSON.stringify(array_nombre);
	localStorage["fecha"] = JSON.stringify(result[6]);
	/*sessionStorage.setItem("actividad", array_act);
	sessionStorage.setItem("tiempo", array_tiempo);
	sessionStorage.setItem("valida", valida);*/
	window.location.href = "grafica.html";
	//window.location.href = "grafica2.html";
	return false;
	
	$.ajax({
		url: 'grafica.html',
		type: 'POST',
		dataType: 'html',
		data: {param1: 'value1'},
	})
	.done(function(data) {
		$('#grafica').html(data);
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	

	/*$.ajax({
		url: 'php/funciones.ajax.php',
		type: 'POST',
		dataType: 'json',
		data: { antec: array_act , tiempo: array_tiempo , valida: valida , ac:'grafica'},
		async: false,
		beforeSend: function(){
			//alert('aca');
		}
	})
	.done(function(data) {
		//console.log(data);
		$('#grafica').html(data.html);
		habilitar_div(data.info_arreglada);
		//$('#step_two').hide();
	})
	.fail(function(x,y,z) {
		console.log(x);
		console.log(y);
		console.log(z);
	})
	.always(function() {
		console.log("complete");
	});*/
	
}

function graficar_avanzado()
{
	result = alista_info_avanzado();
	valida = result[2];
	/*array_act = result[0];
	array_tiempo = result[1];*/
	tiempos = result[7];
	array_tiempo = result[7];

	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);
	array_nombre = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[7][i];
		array_nombre[i] = result[10][i];
	}
	console.log(tiempos);
	console.log(array_tiempo);

	localStorage["actividad"] = JSON.stringify(array_act);
	localStorage["tiempo"] = JSON.stringify(array_tiempo);
	localStorage["validacion"] = JSON.stringify(valida);
	localStorage["nombre"] = JSON.stringify(array_nombre);
	localStorage["fecha"] = JSON.stringify(result[11]);


	window.location.href = "grafica.html";
	//window.location.href = "grafica2.html";
	return false;
	
	$.ajax({
		url: 'grafica.html',
		type: 'POST',
		dataType: 'html',
		data: {param1: 'value1'},
	})
	.done(function(data) {
		$('#grafica').html(data);
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
}

jQuery.fn.scrollTo = function(time){
  var t = $(this).offset().top;
  if(t > 10){t = t - 10}
  if(time == 'fast'){time = 400}
  if(time == 'medium'){time = 800}
  if(time == 'slow'){time = 1200}
  if(time == null){time = 1000}
  $('html,body').animate({scrollTop: t}, time);
}

function cargar_concepto(valor)
{
	var code;
	switch(valor) {
    case 'edt':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;La EDT</h2><div><div class="col-md-4 about-text-left"><p align="justify">Llamada también estructura desglosada de trabajo, es la estructura jerarquica y descendente de las partidas o paquetes de trabajo que se deberán realizar durante la implementación de un proyecto para lograr sus objetivos.</p><div><img src="images/EDT.jpg" alt="" style="height:100%; position:relative;width:100%"></div><p align="justify"><b>Pasos para su construcción:</b><br><br>- Primero defina el producto Final (Objetivo específico).<br>- Defina etapas o divisiones funcionales.<br>- Identificar los entregables específicos del producto.<br>- Identificar actividades claves y de apoyo.</p></div></div></div>';
        break;
    case 'actividad':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Actividades</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">La definición de actividades consiste en identificar cuales son las acciones que se deben llevar a cabo para conseguir los entregables de un proyecto.<br><br>Una vez creada la EDT, se obtiene el nivel mas bajo de esta descomposición, denominado PAQUETES DE TRABAJO. La descomposición de éstos en componentes más pequeños nos proporciona las ACTIVIDADES necesarias para ejecutar los paquetes de trabajo.</p><p align="left"><b>Entradas:</b>- Plan de gestión del cronograma.<br>- Línea base del Alcance.<br>- Activos de los procesos de la Organización.<br>- Factores Ambientales.</p><p align="Right"><b>Herramientas y Técnicas:</b><br>- Descomposición EDT.<br>- Planificación gradual.<br>- Juicio de expertos.</p><p align="Left"><b>Salidas:</b>- Lista de Actividades.<br>- Atributos de la Actividad.<br>- Listado de hitos.</p></div></div>';
        break;

    case 'cronograma':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Cronograma</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">Es la descripción específica de las actividades y del tiempo que se va a emplear para la ejecución del proyecto. Se debe organizar el trabajo en fechas probables, para saber cuanto tiempo requerirá elaborar el trabajo definitivo.</p><div><img src="img/cronograma.png" alt="" style="height:100%; position:relative;width:100%"></div><p align="justify">Actividad Predecesora:<br>- Es una actividad que se debe comenzar o terminar antes de que otra pueda comenzar.<br><br>Actividad Sucesora:<br>- Es una actividad que depende del comienzo o del fin de una tarea precedente.<br><br>Actividad de resumen:<br>- Son aquellas que se componen de subtareas y resume esas subtareas.</p><p align="justify"><b>Paso para elaborar la planeación de actividades:</b><br><br>- Listar las actividades en columna.<br>- Identificar el tiempo disponible para el proyecto indicado.<br>- Calcular el tiempo para cada actividad.<br>- Reordenar cronologicamente.<br>- Ajustar tiempo o secuencia de actividades.</p></div></div>';
        break;

    case 'pert':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;PERT</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">Técnica que permite dirigir la programación del proyecto. El método PERT consiste en la representación gráfica de una red de tareas, que, cuando se colocan en cadena, permiten alcanzar los objetivos de un proyecto.</p><p align="justify"><b>El método PERT debe incluir:</b><br><br>- Desglose preciso del proyecto en tareas.<br>- Cálculo de la duración de cada tarea.<br>- La designación de un director del proyecto que se haga cargo de asegurar la supervisión de dicho proyecto, de informar, en caso de ser necesario, y de tomar decisiones en caso de que existan variaciones de las proyecciones.<br><br><b>Red PERT</b><br></p><div ><img src="img/redpert.png" alt="" style="height:100%; position:relative;width:100%"></div><p align="justify">Tareas: Representadas por una flecha. Se le asigna a cada una de las tareas un código y una duración. Sin embargo, la longitud de la flecha es independiente de la duración de la tarea.<br><br>Etapas: es decir, el inicio y el final de la tarea. Cada tarea tiene una etapa de inicio y una de finalización. Con excepción de las etapas iniciales y finales, cada etapa final es una etapa de inicio de la siguiente tarea. Las etapas generalmente están numeradas y representadas por un círculo, pero en algunos otros casos pueden estar representadas por otras formas (cuadrados, rectángulos, óvalos, etc.).<br></br>Tareas ficticias: representadas por una flecha punteada que indica las limitaciones de las cadenas de tareas entre ciertas etapas.</p></div></div>';
        break;

    case 'holgura':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Holgura</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">Las cadenas no crititcas disponen de un sobrante de tiempo para su ejecución, dando lugar al estudio de las HOLGURAS. La holgura de un suceso es el margen de tiempo que se tiene para alcanzar dicho suceso. Cuando este margen es nulo, se dice que el suceso es critico</p><div ><img src="img/holgura.png" alt="" style="height:100%; position:relative;width:100%"></div></div></div>';
        break;

    case 'r_critica':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Ruta Critica</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">En administración y gestión de proyectos, una ruta crítica es la secuencia de los elementos terminales de la red de proyectos con la mayor duración entre ellos, determinando el tiempo más corto en el que es posible completar el proyecto. La duración de la ruta crítica determina la duración del proyecto entero. Cualquier retraso en un elemento de la ruta crítica afecta a la fecha de término planeada del proyecto, y se dice que no hay holgura en la ruta crítica.</p><div ><img src="img/logocpm.png" alt="" style="height:25; position:relative;width:27" align="right"></div><br><div ><img src="img/rutacpm.png" alt="" style="height:100%; position:relative;width:100%"></div></div></div>';
        break;
}
	$('#dialog_message_concept').html(null);
	$('#dialog_message_concept').html(code);
	
	$('#dialog_message_concept').dialog("open");
	$('#header').scrollTo('fast');
}


$(document).ready(function(){
	var cantidad = 0;
	$('#cargar').click(function(){
		todoCorrecto=true;
		console.log($('#n_proyecto').val() + " - "+ $('#n_gerente').val().length + " - "+ /^\s*$/.test($('#nombre_p').val()) + " - " + $('#m_tiempo').val() + " - " + $('#f_inicio').val());
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == '' 
	 		|| $('#f_inicio').val() == null
	 		|| $('#f_inicio').val() == '' ){
       		todoCorrecto=false;
       	}
       	console.log(todoCorrecto);
		cantidad = 2;
		if(cantidad>0 && todoCorrecto)
		{
			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
			if($('#m_tiempo').val() == 'd' )
			{
				medida_tiempo = "Días";
			}else{
				medida_tiempo = "Horas";				
			}
			cargar_actividades(cantidad, medida_tiempo);
			$('#info_proyecto').hide();

		}else{
			$('#dialog-message').html('Debe completar la información del formulario');
			$('#dialog-message').dialog("open");
		}
		
	});

	$('#cargar_a').click(function(){ 
		todoCorrecto=true;
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == ''
	 		|| $('#f_inicio').val() == null
	 		|| $('#f_inicio').val() == '' ){
       		todoCorrecto=false;
       	}

		cantidad = 2;
		if(cantidad>0 && todoCorrecto)
		{
			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
			if($('#m_tiempo').val() == 'd' )
			{
				medida_tiempo = "Días";
			}else{
				medida_tiempo = "Horas";				
			}
			cargar_actividades_avanzado(cantidad, medida_tiempo);
			$('#info_proyecto').hide();

		}else{
			//$('#error').html('Debe completar la información del formulario');
			$('#dialog-message').html('Debe completar la información del formulario');
			$('#dialog-message').dialog("open");
		}
		
	});


	/*Menu*/

	$('#menu_pert').click(function(){
		window.location="menu_pert.html";
	});

	$('#menu_concepto').click(function(){
		window.location="menu_pert.html";
	});

	$('#menu_contacto').click(function(){
		window.location="contactenos.html";
	});

	$('#menu_pert_int').click(function(){
		window.location="pert_avanzado.html";
	});

	$('#menu_basico_int').click(function(){
		window.location="pert.html";
	});

	$('#menu_abrir_int').click(function(){
		window.location="menu_pert.html";
	});

	$('#menu_concepto').click(function(){
		window.location="conceptos.html";
	});
	
});
