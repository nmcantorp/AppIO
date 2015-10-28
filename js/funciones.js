$(document).on('ready',document, function(){
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
	var cantidad_actividad = 0;
});


//*** Este Codigo permite Validar que sea un campo Numerico
function Solo_Numerico(variable){

	numero_antec = document.getElementsByName("antec").length;
	letra = '';
	text_final = '';
	for (var i = 0; i < variable.length; i++) {
		letra = variable[i];
		// ,|
		valida = letra.search(/(,|[1-9])+/g);		
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
		$('#content_activities').append('<div class="act_detail"><label>Actividad '+(i+1)+': <input type="number" id="tiempo_'+i+'" min="0" max="1000"/></label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades(this);">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function cargar_actividades_avanzado(cantidad){

	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}

	for (var i = 0; i < cantidad; i++) {		
		$('#content_activities').append('<div class="act_detail"><span>Actividad '+(i+1)+'</span><label>T. Optimista '+(i+1)+': <input type="number" id="tiempo_o_'+i+'" min="0" max="1000"/></label><label>T. Pesimista '+(i+1)+': <input type="number" id="tiempo_p_'+i+'" min="0" max="1000"/></label><label>T. Probable '+(i+1)+': <input type="number" id="tiempo_pr_'+i+'" min="0" max="1000"/></label><label>Costo Act. '+(i+1)+': <input type="number" id="costo_'+i+'" min="0" max="1000"/></label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades_avanzado(this);">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function agregar_actividades(value){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><label>Actividad '+(cantidad_actividad+1)+': <input type="number" id="tiempo_'+cantidad_actividad+'" min="0" max="1000"/></label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades(this);">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide(); $(\'#actividades\').hide();" value="Regresar" /></div>');
	cantidad_actividad++;
}

function agregar_actividades_avanzado(value){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><span>Actividad '+(cantidad_actividad+1)+'</span><label>T. Optimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_o_'+cantidad_actividad+'" min="0" max="1000"/></label><label>T. Pesimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_p_'+cantidad_actividad+'" min="0" max="1000"/></label><label>T. Probable '+(cantidad_actividad+1)+': <input type="number" id="tiempo_pr_'+cantidad_actividad+'" min="0" max="1000"/></label><label>Costo Act. '+(cantidad_actividad+1)+': <input type="number" id="costo_'+cantidad_actividad+'" min="0" max="1000"/></label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades_avanzado(this);">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
	cantidad_actividad++;
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

	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[1][i];
	}

	localStorage["actividad"] = JSON.stringify(array_act);
	localStorage["tiempo"] = JSON.stringify(array_tiempo);
	localStorage["validacion"] = JSON.stringify(valida);
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

$(document).ready(function(){
	var cantidad = 0;
	$('#cargar').click(function(){ 
		todoCorrecto=true;
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == '' ){
       		todoCorrecto=false;
       	}

		cantidad = 2;
		if(cantidad>0)
		{
			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
			cargar_actividades(cantidad);
			$('#info_proyecto').hide();

		}else{
			$('#error').html('La cantidad debe ser Mayor a Cero');
		}
		
	});

	$('#cargar_a').click(function(){ 
		todoCorrecto=true;
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == '' ){
       		todoCorrecto=false;
       	}

		cantidad = 2;
		if(cantidad>0)
		{
			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
			cargar_actividades_avanzado(cantidad);
			$('#info_proyecto').hide();

		}else{
			$('#error').html('La cantidad debe ser Mayor a Cero');
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
		window.location="menu_pert.html";
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
	
});
