Highcharts.theme={
	lang:{
		loading:'Cargando...',
		months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		weekdays:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
		shortMonths:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		exportButtonTitle:"Exportar",
		printButtonTitle:"Importar",
		rangeSelectorFrom:"Desde",
		rangeSelectorTo:"Hasta",
		rangeSelectorZoom:"Período",
		downloadPNG:'Descargar imagen PNG',
		downloadJPEG:'Descargar imagen JPEG',
		downloadPDF:'Descargar imagen PDF',
		downloadSVG:'Descargar imagen SVG',
		printChart:'Imprimir',
		resetZoom:'Reiniciar zoom',
		resetZoomTitle:'Reiniciar zoom',
		thousandsSep:",",
		decimalPoint:'.'
	},
	chart:{
		zoomType:'x',
		panning:true,
		panKey:'shift',
		margin:0,
		spacing:[0,0,0,0],
		backgroundColor:'transparent',
		style:{
			color:'#000',
			font:'bold 10px "Helvetica Neue",Helvetica,Arial,sans-serif'
		}
	},
	colors:['#0056B8','#50B432','#ffbc19','#ED561B','#DDDF00','#24CBE5','#64E572','#FF9655','#FFF263','#6AF9C4'],
	exporting:{enabled:false},
	legend:{
		enabled:false,
		itemStyle:{
			fontWeight:'bold',
			fontSize:'10px',
			color:'#000'
		}
	},
	title:{
		text:'',
		style:{
			color:'#000',
			font:'bold 10px "Helvetica Neue",Helvetica,Arial,sans-serif'
		}
	},
	subtitle:{
		text:'',
		style:{
			color:'#000',
			font:'bold 9px "Helvetica Neue",Helvetica,Arial,sans-serif'
		}
	},
	tooltip:{
		borderWidth:0,
		backgroundColor:'rgba(255,255,255,1)',
		shadow:false,
		shared:true,
		followPointer:true,
		pointFormat:'<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'/*,
		dateTimeLabelFormats:{
			millisecond:'%H:%M:%S.%L',
			second:'%H:%M:%S',
			minute:'%e %b %H:%M',
			hour:'%e %b %H:%M',
			day:'%e. %b %H:%M',
			week:'%e. %b %H:%M',
			month:'%b \'%y',
			year:'%Y'
		}*/
	},
	xAxis:{
		allowDecimals:false,
		crosshair:true,
		title:{text:''},
		type:'datetime',
		labels:{
			enabled:false,
			style:{
				fontSize:'9px',
				color:'#000'
			}
		},
		visible:false,
		endOnTick:false,
		tickPixelInterval:50,
		minTickInterval:60000/*,
		dateTimeLabelFormats:{
			millisecond:'%H:%M:%S.%L',
			second:'%H:%M:%S',
			minute:'%e %b %H:%M',
			hour:'%e %b %H:%M',
			day:'%e. %b %H:%M',
			week:'%e. %b %H:%M',
			month:'%b \'%y',
			year:'%Y'
		}*/
	},
	yAxis:{
		allowDecimals:false,
		title:{text:''},
		labels:{
			enabled:false,
			style:{
				fontSize:'9px',
				color:'#000'
			}
		},
		visible:false,
		endOnTick:false,
		tickPixelInterval:30,
		minTickInterval:0
	},
	credits:{enabled:false},
	plotOptions:{
		series:{
			marker:{enabled:false},
			fillOpacity:0.1
		},
		column:{
			borderWidth:0,
			groupPadding:0,
			pointPadding:0.1,
		}
	}
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);