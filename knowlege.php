
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Prueba </title>
	<link rel="stylesheet" href="">
	<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
</head>
	<script>
		$(document).ready(function(){

			$('#consulta').click(function(){
				consulta();
			});
		});

		function consulta()
		{
			$.ajax({
				url: 'JSON_knowlege/Dutch_Pharmacogenetics_Working_Group_Guideline_for_fluorouracil_and_DPYD.json',
				//type: 'default GET (Other values: POST)',
				dataType: 'json',
				//data: {param1: 'value1'},
			})
			.done(function(data, res) {
				
				console.log(data);
				$('#title').html(data.name);
				$('#title').html(data.relatedDrugs[0]['@id']);
		
				$('#summaryHtml').html(data.textHtml);
				$('#textHtml').html(data.summaryHtml);
				$('#symbol').html(data.relatedGenes[0].symbol);
				$('#relatedGenes').html(data.relatedGenes[0].name);
				$('#relatedDrugs').html(data.relatedDrugs[0].name);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}

	</script>
<body>
	<div id="consulta">Mostrar</div>

	<?php $directorio = opendir("./JSON_knowlege"); //ruta actual
while ($archivo = readdir($directorio)) //obtenemos un archivo y luego otro sucesivamente
{
    if (is_dir($archivo))//verificamos si es o no un directorio
    {

        //echo "[".$archivo . "]<br />"; //de ser un directorio lo envolvemos entre corchetes
    }
    else
    {
        echo "<a href='javascript:consulta(".$archivo.");'>".$archivo . "</a><br />";
    }
} ?>

<!DOCTYPE html>

<href  src=""
	<table  border="1" cellpadding="0">
		<caption id="title"></caption>
		<tbody>
			<tr >
				<td id="summaryHtml"></td>
				<td id="textHtml" colspan="2"></td>
			<tr>
				<td id="relatedGenes"></td>
				<td id="symbol"></td>
				<td id="relatedDrugs"></td>
			</tr>
			</tr>
		</tbody>
	</table>
	<!-- <div id="resultado_gen"></div> -->
<!-- <video width="1400" height="1200" controls autoplay>
  <source src="VID_20150831_214134841.mp4" type="video/mp4">
Your browser does not support the video tag.
</video> -->
</body>
</html>