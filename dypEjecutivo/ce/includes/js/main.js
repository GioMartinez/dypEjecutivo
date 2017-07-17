$(function(){
	Highcharts.setOptions({
	    lang: {
	        loading: 'Cargando...',
	        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	        exportButtonTitle: "Exportar",
	        printButtonTitle: "Importar",
	        rangeSelectorFrom: "Desde",
	        rangeSelectorTo: "Hasta",
	        rangeSelectorZoom: "Período",
	        downloadPNG: 'Descargar imagen PNG',
	        downloadJPEG: 'Descargar imagen JPEG',
	        downloadPDF: 'Descargar imagen PDF',
	        downloadSVG: 'Descargar imagen SVG',
	        printChart: 'Imprimir',
	        resetZoom: 'Reiniciar zoom',
	        resetZoomTitle: 'Reiniciar zoom',
	        thousandsSep: ",",
	        decimalPoint: '.'
	    }
	});
	$(".panel-default .btn").click(function(e){
		e.preventDefault();
		var $this=$(this);
		$(this).closest('.panel').toggleClass('panel-fullscreen');
		var container=$(this).closest('.panel');
		if($this.children('i').hasClass('fa-expand')){
			$this.children('i').removeClass('fa-expand');
			$this.children('i').addClass('fa-compress');
			$('body').append('<div id="dimmer"></div>');
			map.reflow();
			aduHisto.reflow();
			topPais.reflow();
			fraccAran.reflow();
			pagoDer.reflow();
			tipoRec.reflow();
			esclusa.reflow();
		}
		else if($this.children('i').hasClass('fa-compress')){
			$this.children('i').removeClass('fa-compress');
			$this.children('i').addClass('fa-expand');
			$('#dimmer').remove();
			map.reflow();
			aduHisto.reflow();
			topPais.reflow();
			fraccAran.reflow();
			pagoDer.reflow();
			tipoRec.reflow();
			esclusa.reflow();
		}
	});
	// map
	var mapData=Highcharts.maps['countries/mx/mx-all'];
	var nor=[
	{"name":"Agua Prieta","lat":31.3336371,"lon":-109.5608044,"z":1},
	{"name":"Ciudad Acuña","lat":29.3254445,"lon":-100.9290308,"z":2},
	{"name":"Ciudad Camargo","lat":26.3625103,"lon":-98.8064546,"z":3},
	{"name":"Ciudad Juárez","lat":31.7626791,"lon":-106.4522409,"z":4},
	{"name":"Ciudad Miguel Alemán","lat":26.4030334,"lon":-99.0210913,"z":5},
	{"name":"Ciudad Reynosa","lat":26.0938365,"lon":-98.272469,"z":6},
	{"name":"Colombia","lat":27.6979978,"lon":-99.7490962,"z":7},
	{"name":"Matamoros","lat":25.8721783,"lon":-97.4756417,"z":8},
	{"name":"Mexicali","lat":32.664502,"lon":-115.49621,"z":9},
	{"name":"Naco","lat":31.3260273,"lon":-109.9470019,"z":10},
	{"name":"Nogales","lat":31.3322742,"lon":-110.9658951,"z":11},
	{"name":"Nuevo Laredo","lat":27.5953843,"lon":-99.5449115,"z":12},
	{"name":"Ojinaga","lat":29.5610462,"lon":-104.397800,"z":13},
	{"name":"Piedras Negras","lat":28.6974179,"lon":-100.5130363,"z":14},
	{"name":"Puerto Palomas","lat":31.7837791,"lon":-107.6279926,"z":15},
	{"name":"San Luis Río Colorado","lat":32.4850278,"lon":-114.7824432,"z":16},
	{"name":"Sonoyta","lat":31.8796408,"lon":-112.817394,"z":17},
	{"name":"Tecate","lat":32.5755583,"lon":-116.6275365,"z":18},
	{"name":"Tijuana","lat":32.5409164,"lon":-117.0347035,"z":19}
	];
	var sur=[
	{"name":"Ciudad Hidalgo","lat":14.677030,"lon":-92.149431,"z":1},
	{"name":"Subteniente López","lat":18.492908,"lon":-88.395589,"z":2}
	];
	var mar=[
	{"name":"Acapulco","lat":16.8487227,"lon":-99.9044613,"z":1},
	{"name":"Altamira","lat":22.4465326,"lon":-97.8876941,"z":2},
	{"name":"Cancún","lat":21.0380751,"lon":-86.8717444,"z":3},
	{"name":"Ciudad del Carmen","lat":18.6507086,"lon":-91.8403569,"z":4},
	{"name":"Coatzacoalcos","lat":18.137598,"lon":-94.414351,"z":5},
	{"name":"Dos Bocas","lat":18.4311332,"lon":-93.1894066,"z":6},
	{"name":"Ensenada","lat":31.8585847,"lon":-116.6328216,"z":7},
	{"name":"Guaymas","lat":27.9242262,"lon":-110.8864981,"z":8},
	{"name":"La Paz","lat":24.161326,"lon":-110.318148,"z":9},
	{"name":"Lázaro Cárdenas","lat":17.9643697,"lon":-102.1809156,"z":10},
	{"name":"Manzanillo","lat":19.0754271,"lon":-104.2855907,"z":11},
	{"name":"Mazatlán","lat":23.2006263,"lon":-106.4130736,"z":12},
	{"name":"Progreso","lat":21.2885984,"lon":-89.6647735,"z":13},
	{"name":"Salina Cruz","lat":16.1710189,"lon":-95.1900989,"z":14},
	{"name":"Tampico","lat":22.211374,"lon":-97.858692,"z":15},
	{"name":"Tuxpan","lat":20.9475914,"lon":-97.3460662,"z":16},
	{"name":"Veracruz","lat":19.2141963,"lon":-96.1550045,"z":17}
	];
	var int=[
	{"name":"AICM","lat":19.4436374,"lon":-99.0740646,"z":1},
	{"name":"Aguascalientes","lat":21.8451336,"lon":-102.2911866,"z":2},
	{"name":"Chihuahua","lat":28.7136371,"lon":-106.1007569,"z":3},
	{"name":"Guadalajara","lat":20.5256202,"lon":-103.2963538,"z":4},
	{"name":"Guanajuato","lat":21.0089314,"lon":-101.5098303,"z":5},
	{"name":"México","lat":19.4742611,"lon":-99.165827,"z":6},
	{"name":"Monterrey","lat":25.8071452,"lon":-100.2956808,"z":7},
	{"name":"Puebla","lat":19.0713151,"lon":-98.1606477,"z":8},
	{"name":"Querétaro","lat":20.6279208,"lon":-100.1940256,"z":9},
	{"name":"Toluca","lat":19.3188257,"lon":-99.5649572,"z":10},
	{"name":"Torreón","lat":25.471993,"lon":-103.3701556,"z":11}
	];
	var merged=nor.concat(sur,mar,int);
	merged.sort(function(a, b){return a.z - b.z;});
	merged.reverse();
	for(var i=1;i<11;i++){
		var test=document.getElementById("table-sparkline").rows[i].cells;
		document.getElementById("table-sparkline").rows[i].cells[0].innerHTML = merged[i-1].name;
		document.getElementById("table-sparkline").rows[i].cells[1].innerHTML = merged[i-1].z;
	}
	var map=Highcharts.mapChart('mapa',{
		chart:{},
		title:{text:null},
		legend:{enabled:false},
		mapNavigation:{
			enabled:true,
			buttonOptions:{verticalAlign:'bottom'}
		},
		credits:{enabled:false},
		series:[{
			name:'Aduanas',
			mapData:mapData,
			color:'#E0E0E0',
			enableMouseTracking:false
		},{
			type:'mapbubble',
			mapData:mapData,
			name:'Frontera Norte',
			data:nor,
			minSize:1,
			maxSize:10,
			tooltip:{pointFormat:'{point.name}: {point.z}'}
		},{
			type:'mapbubble',
			mapData:mapData,
			name:'Aduanas Marítimas',
			data:mar,
			minSize:1,
			maxSize:10,
			tooltip:{pointFormat:'{point.name}: {point.z}'}
		},{
			type:'mapbubble',
			mapData:mapData,
			name:'Aduanas Interiores',
			data:int,
			minSize:1,
			maxSize:10,
			tooltip:{pointFormat:'{point.name}: {point.z}'}
		},{
			type:'mapbubble',
			mapData:mapData,
			name:'Frontera Sur',
			data:sur,
			minSize:1,
			maxSize:10,
			tooltip:{pointFormat:'{point.name}: {point.z}'}
		}]
	});
	// lista y sparklines
	Highcharts.SparkLine=function(a,b,c){
		var hasRenderToArg=typeof a==='string'||a.nodeName,
		options=arguments[hasRenderToArg?1:0],
		defaultOptions={
			chart:{
				renderTo:(options.chart&&options.chart.renderTo)||this,
				backgroundColor:null,
				borderWidth:0,
				type:'area',
				margin:[2,0,2,0],
				width:120,
				height:20,
				style:{overflow:'visible'},
				// small optimalization, saves 1-2 ms each sparkline
				skipClone:true
			},
			title:{text:null},
			credits:{enabled:false},
			xAxis:{
				labels:{enabled:false},
				title:{text:null},
				startOnTick:false,
				endOnTick:false,
				tickPositions:[]
			},
			yAxis:{
				endOnTick:false,
				startOnTick:false,
				labels:{enabled:false},
				title:{text:null},
				tickPositions:[0]
			},
			legend:{enabled:false},
			tooltip:{
				backgroundColor:null,
				borderWidth:0,
				shadow:false,
				useHTML:true,
				hideDelay:0,
				shared:true,
				padding:0,
				positioner:function(w,h,point){return{x:point.plotX-w/2,y:point.plotY-h};}
			},
			plotOptions:{
				series:{
					animation:false,
					lineWidth:1,
					shadow:false,
					states:{hover:{lineWidth:1}},
					marker:{
						radius:1,
						states:{hover:{radius:2}}
					},
					fillOpacity:0.25
				},
				column:{
					negativeColor:'#910000',
					borderColor:'silver'
				}
			}
		};
		options=Highcharts.merge(defaultOptions,options);
		return hasRenderToArg ? new Highcharts.Chart(a,options,c):new Highcharts.Chart(options,b);
	};
	var start=+new Date(),
	$tds=$('td[data-sparkline]'),
	fullLen=$tds.length,
	n=0;
	// Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
	// can take some seconds, so we split the input into chunks and apply them in timeouts
	// in order avoid locking up the browser process and allow interaction.
	function doChunk(){
		var time=+new Date(),i,len=$tds.length,$td,stringdata,arr,data,chart;
		for(i=0; i < len; i += 1){
			$td=$($tds[i]);
			stringdata=$td.data('sparkline');
			arr=stringdata.split('; ');
			data=$.map(arr[0].split(', '),parseFloat);
			chart={};
			if(arr[1]){chart.type=arr[1];}
			$td.highcharts('SparkLine',{
				series:[{
					data:data,
					pointStart:1
				}],
				tooltip:{
					headerFormat:'<span style="font-size:10px">' + $td.parent().find('th').html() + ':</span><br/>',
					pointFormat:'<b>{point.y}</b>'
				},
				chart:chart
			});
			n += 1;
			// If the process takes too much time, run a timeout to allow interaction with the browser
			if (new Date() - time > 500){
				$tds.splice(0,i + 1);
				setTimeout(doChunk,0);
				break;
			}
			// Print a feedback on the performance
			if (n === fullLen){
				$('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
			}
		}
	}
	doChunk();
	// grafica para historico de entrada de aduanas
	var seriesOptions = [],seriesCounter = 0,names = ['Frontera Norte'];
	var aduHisto;
	function createChart(){
		 aduHisto = Highcharts.stockChart('aduanaHisto',{
			rangeSelector:{
				selected:4,
				inputEnabled:false
			},
			yAxis:{
				labels:{formatter:function(){return(this.value>0?' + ':'')+this.value+'%';}},
				plotLines: [{
					value: 0,
					width: 2,
					color: 'silver'
				}]
			},
			navigator:{enabled:false},
			scrollbar:{enabled:false},
			credits:{enabled:false},
			plotOptions:{
				series: {
					compare: 'percent',
					showInNavigator: false
				}
			},
			tooltip:{
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
				valueDecimals: 2,
				split: true
			},
			series: seriesOptions
		});
	}
    	var data = data1;
	        seriesOptions[0] = {
	            name: 'Frontera Norte',
	            data: data
	        };
    	var data = data2;
	        seriesOptions[1] = {
	            name: 'Martítima',
	            data: data
	        };
    	var data = data3;
	        seriesOptions[2] = {
	            name: 'Internas',
	            data: data
	        };
	            createChart();
	// top pais de origen
	var topPais=Highcharts.chart('topPais', {
	    chart: {
	        type: 'bar'
	    },
	    title: {
	        text: null
	    },
	    credits:{
	    	enabled:false
	    },
	    xAxis: {
	        categories: ['EEUU', 'China', 'Japón', 'Canadá', 'Francia']
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: null
	        }
	    },
	    legend: {
	        reversed: false
	        
	    },
	    plotOptions: {
	        series: {
	            stacking: 'normal'
	        }
	    },
	    series: [{
	        name: 'FisDoc',
	        data: [5, 3, 4, 7, 2]
	    }, {
	        name: 'Gamma',
	        data: [2, 2, 3, 2, 1]
	    }, {
	        name: 'RNI',
	        data: [3, 4, 4, 2, 5]
	    }, {
	        name: 'Libre',
	        data: [3, 4, 4, 2, 5]
	    }]
	});
	// fraccion arancelaria
	var fraccAran=Highcharts.chart('faccArancel', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    credits:{enabled:false},
	    title: {
	        text:null
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            startAngle:90,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Fracción Arancelaria',
	        colorByPoint: true,
	        data: [{
	            name: 'Animales Vivos',
	            y: 56.33
	        }, {
	            name: 'Prductos del Reino Vegetal',
	            y: 24.03,
	        }, {
	            name: 'Productos Minerales',
	            y: 10.38
	        }, {
	            name: 'Materiales Textiles',
	            y: 4.77
	        }, {
	            name: 'Calzado y Sombreros',
	            y: 56.33
	        }, {
	            name: 'Piedras Preciosas',
	            y: 24.03,
	        }, {
	            name: 'Madera y Carbón',
	            y: 10.38
	        }, {
	            name: 'Plásticos y Manufacturas',
	            y: 4.77
	        }, {
	            name: 'Metales Comunes',
	            y: 0.91
	        }, {
	            name: 'Materiales de Transporte',
	            y: 0.2
	        }]
	    }]
	});
	// pagos de derechos
	var pagoDer;
	$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-v.json&callback=?', function (data) {
	    // create the chart
	    pagoDer=Highcharts.stockChart('pagosDerechos', {
	        chart: {
	            alignTicks: false
	        },
	        navigator:{enabled:false},
	        scrollbar:{enabled:false},
	        credits:{enabled:false},
	        rangeSelector: {
	            selected: 1,
	            inputEnable:false
	        },
	        title: {
	            text: null
	        },
	        series: [{
	            type: 'column',
	            name: 'Pagos de Derechos',
	            data: data,
	            dataGrouping: {
	                units: [[
	                    'week', // unit name
	                    [1] // allowed multiples
	                ], [
	                    'month',
	                    [1, 2, 3, 4, 6]
	                ]]
	            }
	        }]
	    });
	});
	// tipo de reconocimiento aduanero
	var tipoRec=Highcharts.chart('tipoRecono', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: null
	    },
	    credits:{
	    	enabled:false
	    },
	    xAxis: {
	        categories: ['Fronteriza', 'Marítima', 'Interior']
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: null
	        }
	    },
	    legend: {
	        reversed: true
	    },
	    plotOptions: {
	        series: {
	            stacking: 'normal'
	        }
	    },
	    series: [{
	        name: 'FisDoc',
	        data: [5, 3, 4]
	    }, {
	        name: 'Gamma',
	        data: [2, 2, 3]
	    }, {
	        name: 'RNI',
	        data: [3, 4, 4]
	    }]
	});
	// esclusas
	var esclusa = Highcharts.chart('esclusas',{
        chart: {
            type: 'line'
        },
        credits:{enabled:false},
        title:{text:null},
        xAxis:{
        	type:'datetime'
        },
        yAxis: {
            title: {
                text:null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
        	enabled:false
        },
        series: [{
        	name:'esclusas',
            step:true,
            data: [0, 1, 0, 1, 0, 1]
        }]
    });
});