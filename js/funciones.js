$(document).on('ready',document, function(){
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
});


//*** Este Codigo permite Validar que sea un campo Numerico
function Solo_Numerico(variable){

	numero_antec = document.getElementsByName("antec").length;
	letra = '';
	text_final = '';
	for (var i = 0; i < variable.length; i++) {
		letra = variable[i];
		// ,|
		valida = letra.search(/(;|[1-9])+/g);		
		if(valida){
		    Numer=parseInt(letra);
		    if (!isNaN(Numer)){
		        text_final = text_final + Numer;
		    }
		}else{
			text_final = text_final + letra;
		}
	};
    return text_final;
}
function ValNumero(Control){
    Control.value=Solo_Numerico(Control.value);
}
//*** Fin del Codigo para Validar que sea un campo Numerico

function cargar_actividades(cantidad){

	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}

	for (var i = 0; i < cantidad; i++) {		
		$('#content_activities').append('<div><label>Actividad '+(i+1)+': <input type="number" id="tiempo_'+i+'" min="0" max="1000"/></label><label>Antecesores Actividad '+(i+1)+': <input type="text" placeholder="Ejemplo 1;2;..;n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};

	$('#content_activities').append('<div class="contact-but"><input type="submit" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div>');
}

function alista_info()
{
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
	var result = Array(5);
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
	}	
	/*console.log(array_act);
	console.log(array_tiempo);*/
	result[0]=array_act;
	result[1]=array_tiempo;
	result[2]=valida;
	result[3]=tiempos;
	result[4]=antec;
	console.log(result);
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
			info_to_load += '<tr><td>'+'Actividad '+(i+1)+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_tiempo[i].tiempo+'</td></tr>';
		};

		info_to_load += '</tbody></table>';

		info_to_load += '<div class="contact-but" style="float: right; width: 120px;" ><input type="submit" id="volver" value="Volver" style="width: 100%;background: #FF6161;" onClick="javascript:volver_actividades();"/></div>';
		info_to_load += '<div class="contact-but" style="float:left; margin: 0 0 0 5px;width: 120px;" ><input type="submit" id="graficar" value="Graficar" style="width: 100%;background: #1793d1;" onClick="javascript:graficar();" /></div>';

		$('#step_two').html(info_to_load);
		$('#step_two').show();
	}
	else 
	{
		$('#error').html('Debe tener la informaci&oacute;n completa');
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
}

function graficar()
{
	result = alista_info();
	valida = result[2];
	/*array_act = result[0];
	array_tiempo = result[1];*/
	tiempos = result[3];
	array_tiempo = result[1];

	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[1][i];
	}

	$.ajax({
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
	});
	
}

$(document).ready(function(){
	var cantidad = 0;
	$('#cargar').click(function(){
		todoCorrecto=true;
	 	if ($('#nombre_p').val() == null || $('#nombre_p').val().length == 0 || /^\s*$/.test($('#nombre_p').val())){
       		todoCorrecto=false;
       	}

		if( todoCorrecto &&  $('#can_act').val()!=null && $('#can_act').val()!='' ) 
		{
			cantidad = $('#can_act').val();
			if(cantidad>0)
			{
				$('#error').html(null);
				$('#actividades').html(null);
				$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
				cargar_actividades(cantidad);

			}else{
				$('#error').html('La cantidad debe ser Mayor a Cero');
			}
		}else{
			$('#error').html('Informaci&oacute;n Incompleta');
		}
	});
	
});
