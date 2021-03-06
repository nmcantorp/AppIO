function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function drawChart() {
	var f = new Date();
	var dia = 0;
	var mes = 0;
	var anio = 0;
	dia = parseInt(f.getDate());
	mes = parseInt(f.getMonth());
	anio = parseInt(f.getFullYear());
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task ID');
  data.addColumn('string', 'Task Name');
  data.addColumn('date', null);
  data.addColumn('date', null);
  data.addColumn('number', 'Duration');
  data.addColumn('number', null);
  data.addColumn('string', 'Dependencies');

  data.addRows([
    ['1', 'Actividad 1',
     null, null, daysToMilliseconds(12),  100,  null],
    ['2', 'Actividad 2',
     null, null, daysToMilliseconds(8), 100, '1'],
    ['3', 'Actividad 3',
     null, null, daysToMilliseconds(6), 100, '1'],
    ['4', 'Actividad 4',
     null, null, daysToMilliseconds(6), 100, '1'],
    ['5', 'Actividad 5',
     null, null, daysToMilliseconds(8), 100, '2'],
 	['6', 'Actividad 6',
 	null, null, daysToMilliseconds(12), 100, '3'],
 	['7', 'Actividad 7',
 	null, null, daysToMilliseconds(4), 100, '3'],
 	['8', 'Actividad 8',
 	null, null, daysToMilliseconds(2), 100, '6,7'],
 	['9', 'Actividad 9',
 	null, null, daysToMilliseconds(2), 100, '4,6'],

    ['10', 'Actividad 10',
     null, null, daysToMilliseconds(4), 100, '8,9']
  ]);

  var options = {
    height: 300,
    //width: 400,
    is3D: true,
    gantt:{shadowEnabled:true,
      	barHeight:10,
      	barCornerRadius:15,
      	percentEnabled:false,
      	criticalPathEnabled: true,
          criticalPathStyle: {
          	stroke: '#e64a19',
          	strokeWidth: 4,
          	defaultStartDate:new Date ( 2015 , mes , dia),
          	labelMaxWidth:100
        },
    	arrow:{angle: 100,
          width: 2,
          color: 'green',
          radius: 0},
      	innerGridTrack: {fill: '#CEFF45'},
		innerGridDarkTrack: {fill: '#E4FF70'}  
    }              
  };

  var chart = new google.visualization.GanttChart(document.getElementById('chart_div'));

  chart.draw(data, options);
  var selection = chart.getSelection();
  console.log(selection);
}