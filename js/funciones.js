$(document).on('ready',document, function(){
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
	var cantidad_actividad = 0;
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

function cargar_actividades(cantidad){

	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}

	for (var i = 0; i < cantidad; i++) {		
		$('#content_activities').append('<div class="act_detail"><label>Actividad '+(i+1)+': <input type="number" id="tiempo_'+i+'" min="0" max="999" onkeyUp="return ValNumero(this, 3);" required="required"/></label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');
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
		$('#content_activities').append('<div class="act_detail"><span>Actividad '+(i+1)+'</span><label>T. Optimista '+(i+1)+': <input type="number" id="tiempo_o_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" /></label><label>T. Pesimista '+(i+1)+': <input type="number" id="tiempo_e_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/></label><label>T. Probable '+(i+1)+': <input type="number" id="tiempo_pr_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" /></label><label>Costo Act. '+(i+1)+': <input type="number" id="costo_'+i+'" min="0" max="1000" /></label><label>Precede '+(i+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades_avanzado(this);">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function agregar_actividades(value){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><label>Actividad '+(cantidad_actividad+1)+': <input type="number" id="tiempo_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/></label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades(this);">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide(); $(\'#actividades\').hide();" value="Regresar" /></div>');
	cantidad_actividad++;
}

function agregar_actividades_avanzado(value){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador"></div>');

	$('#content_activities').append('<div class="act_detail"><span>Actividad '+(cantidad_actividad+1)+'</span><label>T. Optimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_o_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/></label><label>T. Pesimista '+(cantidad_actividad+1)+': <input type="number" id="tiempo_e_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/></label><label>T. Probable '+(cantidad_actividad+1)+': <input type="number" id="tiempo_pr_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/></label><label>Costo Act. '+(cantidad_actividad+1)+': <input type="number" id="costo_'+cantidad_actividad+'" min="0" max="1000"/></label><label>Precede '+(cantidad_actividad+1)+': <input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" /></label></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades_avanzado(this);">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
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

	for (var i = 0; i < tiempos.length; i++) {
		if( tiempos[i].value==null || tiempos[i].value<= 0 )
		{
			valida = false;
			break;
		}
		array_tiempo[i] = {tiempo:tiempos[i].value};		
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
	//console.log(valida);return false;
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

function alista_info_avanzado()
{
	var antec 				= document.getElementsByName("antec");
	var tiempos_o 			= $("[id^='tiempo_o']");
	var tiempos_p 			= $("[id^='tiempo_e']");
	var tiempos_pr 			= $("[id^='tiempo_pr']");
	var valida 				= false;
	var array_act 			= [];
	var array_t_optimista 	= [];
	var array_t_pesimista 	= [];
	var array_t_probable 	= [];
	var array_t_esperado 	= [];
	var array_d_estandar 	= [];
	var array_varianza  	= [];
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
			break;
		}
		array_t_optimista[i]	= {tiempo:tiempos_o[i].value};		
		array_t_pesimista[i]	= {tiempo:tiempos_p[i].value};		
		array_t_probable[i]  	= {tiempo:tiempos_pr[i].value};		
		array_t_esperado[i]  	= {tiempo: tiempo_esperado( tiempos_o[i].value, tiempos_p[i].value, tiempos_pr[i].value) };		
		array_varianza[i]  		= {tiempo: varianza( tiempos_o[i].value, tiempos_p[i].value) };		
		array_d_estandar[i]  	= {tiempo: Math.sqrt(parseFloat(array_varianza[i]['tiempo'])) };		
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
	
	if(valida)
	{
		$('#error').html(null);		
		$('#step_one').hide();
		
		/**
		 * Se genera la tabla con la informacion en resumen de las actividades
		 */
		
		info_to_load = '<div style="overflow-x: auto;"><table class="table table-bordered"><thead><tr>';
		info_to_load += '<th>Actividad</th><th style="text-align:center;">Predecesor</th><th style="text-align:center;">a</th><th style="text-align:center;">m</th><th style="text-align:center;">b</th><th style="text-align:center;">te</th><th style="text-align:center;">Desv. Est</th><th style="text-align:center;">Varianza</th></tr></thead>';
		info_to_load += '<tbody>';
		for (var i = 0; i < tiempos.length; i++) {
			var predecesor = '-';
			if( typeof array_act[i] != "undefined") predecesor = array_act[i].antec;
			info_to_load += '<tr><td>'+'Actividad '+(i+1)+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_t_op[i]['tiempo']+'</td><td style="text-align:center;">'+array_t_pr[i]['tiempo']+'</td><td style="text-align:center;">'+ array_t_pe[i]['tiempo'] +'</td><td style="text-align:center;">'+array_tiempo[i]['tiempo'].toFixed(0)+'</td><td style="text-align:center;">'+array_d_estandar[i]['tiempo'].toFixed(2)+'</td><td style="text-align:center;">'+array_varianza[i]['tiempo'].toFixed(2)+'</td></tr>';
		};

		info_to_load += '</tbody></table></div><br>';
		//a=optimista, m=promedio, b=pesimista 
		info_to_load += '<table class="table"><thead><tr><th>a = Tiempo optimista</th></tr><tr><th>m = Tiempo promedio</th></tr><tr><th>b = Tiempo pesimista</th></tr><tr><th>te = Tiempo esperado <img src="images/tiempo_esperado.png" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Desv. Est = Desviaci&oacute;n est&aacute;ndar<img src="images/desv_est.png" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Varianza = <img src="images/varianza.png" style="float: right; margin-right: 40px;"/></th></tr>';

		info_to_load += '</thead></table>';

		info_to_load += '<div class="contact-but" style="float: right; width: 120px;" ><input type="submit" id="volver" value="Volver" style="width: 100%;background: #FF6161;" onClick="javascript:volver_actividades();"/></div>';
		info_to_load += '<div class="contact-but" style="float:left; margin: 0 0 0 5px;width: 120px;" ><input type="submit" id="graficar" value="Graficar" style="width: 100%;background: #1793d1;" onClick="javascript:graficar_avanzado();" /></div>';

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

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[7][i];
	}
	console.log(tiempos);
	console.log(array_tiempo);

	localStorage["actividad"] = JSON.stringify(array_act);
	localStorage["tiempo"] = JSON.stringify(array_tiempo);
	localStorage["validacion"] = JSON.stringify(valida);

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
			cargar_actividades(cantidad);
			$('#info_proyecto').hide();

		}else{
			$('#error').html('Debe completar la información del formulario');
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
			cargar_actividades_avanzado(cantidad);
			$('#info_proyecto').hide();

		}else{
			$('#error').html('Debe completar la información del formulario');
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
