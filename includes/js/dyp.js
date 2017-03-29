$(document).ready(function(){
	var fisicasP=0;
	var moralesP=0;
	var totalesP=0;
	var percentF=0;
	var percentM=0;
	var meta = 2800000000000;
	var totalesVen = 0;
	var totalesWeb = 0;
	var CVen002 = 0;
	var CVen003 = 0;
	var CVen004 = 0;
	var CVen005 = 0;
	var CVen006 = 0;
	var CWeb002 = 0;
	var CWeb003 = 0;
	var CWeb004 = 0;
	var CWeb005 = 0;
	var CWeb006 = 0;
	var TotalPFLC =0;
	var TotalPMLC =0;
	var TotalPFLCPagada =0;
	var TotalPMLCPagada =0;
	var LCTotalesNull = 0; //PagosPMEfectivo
	var TotalesNormalVen = 0;
	var TotalesNormalWeb = 0;
	$.post('includes/php/render.php',{data:'fetch'},function(tree){
		function readCache(tree){
			for(var values in tree['children']){
				if(tree['children'][values]['DName']=='PFTotalPagos=PFTotalPagosPFTotalPagos/Ejecutivo=Ejecutivo/DyPAnuales=DyPAnuales/root=Elements'){
					fisicasP = parseInt(tree['children'][values]['values']); 
				}
				if(tree['children'][values]['DName'].indexOf('PagosPMEfectivo')>=0){
					moralesP = parseInt(tree['children'][values]['values']);
				}
				if(tree['children'][values]['DName']=='TotalesVenDia=TotalesVenTotalesVen/Ejecutivo=Ejecutivo/DyPAnuales=DyPAnuales/root=Elements'){
					totalesVen = parseInt(tree['children'][values]['values']); 
				}
				if(tree['children'][values]['DName']=='TotalesWebDia=TotalesWebTotalesWeb/Ejecutivo=Ejecutivo/DyPAnuales=DyPAnuales/root=Elements'){
					totalesWeb = parseInt(tree['children'][values]['values']); 
				}
				if(tree['children'][values]['DName'].indexOf('CVen002')>=0){CVen002 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CVen003')>=0){CVen003 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CVen004')>=0){CVen004 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CVen005')>=0){CVen005 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CVen006')>=0){CVen006 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CWeb002')>=0){CWeb002 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CWeb003')>=0){CWeb003 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CWeb004')>=0){CWeb004 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CWeb005')>=0){CWeb005 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('CWeb006')>=0){CWeb006 = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('TotalPFLCT')>=0){TotalPFLC = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('TotalPMLCT')>=0){TotalPMLC = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('TotalPFLCPagada')>=0){TotalPFLCPagada = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('PagosPMEfectivo')>=0){TotalPMLCPagada = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('LCTotalesNull')>=0){LCTotalesNull = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('TotalesnormalVen')>=0){TotalesNormalVen = parseInt(tree['children'][values]['values']);}
				if(tree['children'][values]['DName'].indexOf('TotalesNormalWeb')>=0){TotalesNormalWeb = parseInt(tree['children'][values]['values']);}
			}
			totalesP=fisicasP+moralesP;
			percentF=((TotalPFLCPagada/TotalPFLC)*100).toFixed(2);
			percentM=((TotalPMLCPagada/TotalPMLC)*100).toFixed(2);			
			// Personas Físicas contra Morales
			var gaugeOptions={
				chart:{type:'solidgauge'},
				pane:{
					center:['50%','75%'],
					size:'140%',
					startAngle:-90,
					endAngle:90,
					background:{
						innerRadius:'60%',
						outerRadius:'100%',
						shape:'arc'
					}
				},
				tooltip:{enabled:true},
				yAxis:{
					minorTickInterval:null,
					title:{enabled:false},
					minorTickWidth: 0,
					labels:{enabled:false,y:15}
				}
			};
			// The fisicas gauge
			var chartFisicas = Highcharts.chart('b',Highcharts.merge(gaugeOptions,{
				title:'Fisicas',
				yAxis:{
					min:0,
					max:TotalPFLC,
					title:{text:'Físicas'}
				},
				plotOptions:{
					solidgauge:{
						dataLabels:{
							formatter:function(){
								return'<span style="text-weight:bold;font-size:8px;">'
								+this.series.name+'<br>'
								+percentF+'%</span><br>'
								+'$ '+fisicasP;
							},
							y:20,
							align:'center',
							borderWidth:0,
							useHTML:true
						}
					}
				},
				series:[{
					name:'Físicas',
					data:[TotalPFLCPagada]
				}]
			}));
			// The morales gauge
			var chartMorales = Highcharts.chart('c',Highcharts.merge(gaugeOptions,{
				title:'Morales',
				yAxis:{
					min:0,
					max:TotalPMLC,
					title:{text:'Morales'}
				},
				plotOptions:{
					solidgauge:{
						dataLabels:{
							formatter:function(){
								return'<span style="text-weight:bold;font-size:8px;">'
								+this.series.name+'<br>'
								+percentM+'%</span><br>'
								+'$ '+moralesP;
							},
							y:20,
							align:'center',
							borderWidth:0,
							useHTML:true
						}
					}
				},
				series:[{
					name:'Morales',
					data:[TotalPMLCPagada]
				}]
			}));
			// meta de recaudacion
			fisicasMper = parseFloat(((fisicasP/meta)*100).toFixed(4));
			moralesMper = parseFloat(((moralesP/meta)*100).toFixed(4));
			var metaArray={'Físicas':fisicasMper,'Morales':moralesMper,'Total':fisicasMper+moralesMper};
			totalesM = parseFloat(((fisicasP+moralesP)*1).toFixed(4));
			Highcharts.chart('d',{
				chart:{type:'solidgauge'},
				title:{text:''},
				tooltip:{
					borderWidth:0,
					backgroundColor:'none',
					shadow:false,
					style:{fontSize:'16px'},
					positioner:function(labelWidth){
						return{
							x:0,
							y:0
						};
					}
				},
				pane:{
					startAngle:0,
					endAngle:360,
					background:[{
						// Track for Move
						outerRadius:'112%',
						innerRadius:'88%',
						backgroundColor:Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
						borderWidth:0
					},{ // Track for Exercise
						outerRadius:'87%',
						innerRadius:'63%',
						backgroundColor:Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
						borderWidth:0
					},{ // Track for Stand
						outerRadius:'62%',
						innerRadius:'38%',
						backgroundColor:Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
						borderWidth:0
					}]
				},
				yAxis:{
					min:0,
					max:meta,
					lineWidth:0,
					tickPositions:[]
				},
				legend:{
					labelFormatter:function(){
						var nameCh = this.name;
						return'<span style="text-weight:bold;color:'+this.data[0].color+';">'+this.name+': '+
						metaArray[nameCh]+'%</span><br><span style="text-weight:bold;color:'+this.data[0].color+';">$ '+
						this.data[0].y+'</span>';
					},
					layout:'vertical',
					align:'left',
					verticalAlign:'middle'
				},
				plotOptions:{
					solidgauge:{
						dataLabels:{enabled:false},
						linecap:'round',
						stickyTracking:false,
						rounded:true
					}
				},
				series:[{
					name:'Total',
					borderColor:Highcharts.getOptions().colors[0],
					showInLegend: true,
					data:[{
						color:Highcharts.getOptions().colors[0],
						radius:'112%',
						innerRadius:'88%',
						y:totalesM
					}]
				},{
					name:'Físicas',
					borderColor:Highcharts.getOptions().colors[1],
					showInLegend: true,
					data:[{
						color:Highcharts.getOptions().colors[1],
						radius:'87%',
						innerRadius:'63%',
						y:fisicasP
					}]
				},{
					name:'Morales',
					borderColor:Highcharts.getOptions().colors[2],
					showInLegend: true,
					data:[{
						color:Highcharts.getOptions().colors[2],
						radius:'62%',
						innerRadius:'38%',
						y:moralesP
					}]
				}]
			});
			// declaraciones recibidas
			var sumVW = document.getElementById('decRec'); 
			document.getElementById('decRec').innerHTML=sumVW.innerHTML+': '+(totalesVen+totalesWeb);
			Highcharts.chart('e',{
				chart:{type:'pie'},
				title:{text:'',},
				tooltip:{pointFormat:'<b>{point.percentage:.1f}%</b><br><b>{point.y}</b>'},
				legend:{
					labelFormatter:function(){
						var nameCh = this.name;
						return'<span style="text-weight:bold;">'+this.name+': '+this.series.data[this.index].y+'</span>';
					},
					layout:'vertical',
					align:'left',
					verticalAlign:'middle'
				},
				plotOptions:{
					pie:{
						allowPointSelect:true,
						size:"110%",
						dataLabels:{enabled:false},
						showInLegend:true
					}
				},
				series:[{
					name:'Declaraciones',
					innerSize: '50%',
					data:[{
						name:'Ventanilla',
						y:totalesVen
					},{
						name:'Internet',
						y:totalesWeb
					}]
				}]
			});
			// recepcion vs linea de captura
			Highcharts.chart('f',{
				chart:{
					type:'pie',
					zoomType:'x',
					panning:true,
					panKey:'shift'
				},
				title:{text:'',},
				tooltip:{pointFormat:'<b>{point.percentage:.1f}%<br><b>{point.y}</b>'},
				plotOptions:{
					pie:{
						allowPointSelect:true,
						size:"80%",
					}
				},
				plotOptions:{
					pie:{
						dataLabels:{
							enabled:true,
							format:'{point.name}:<br>{y}'
						},
						enableMouseTracking:true
					}
				},
				yAxis:{type: 'logarithmic'},
				series:[{
					startAngle:-90,
					name:'Declaraciones',
					data:[{
						name:'L. de C.<br>Pagadas',
						y:(TotalPFLCPagada+TotalPMLCPagada)
					},{
						name:'Sin L. de C.',
						y:LCTotalesNull
					},{
						name:'L. de C.<br>Pendientes',
						y:(TotalPFLC+TotalPMLC)-(TotalPFLCPagada+TotalPMLCPagada)
					}]
				}]
			});
			// declaraciones recibidas
			var ventanilla=[{
					name:'Normales',
					data:[TotalesNormalVen,TotalesNormalWeb]
				},{
					name:'Dejar sin Efecto Obligación',
					data:[CVen002,CWeb002]
				},{
					name:'Modificación de Obligaciones',
					data:[CVen003,CWeb003]
				},{
					name:'Obligación no presentada',
					data:[CVen004,CWeb004]
				},{
					name:'Actualización de Importe',
					data:[CVen005,CWeb005]
				},{
					name:'Esquema Anterior',
					data:[CVen006,CWeb006]
				}];
		
			var me={
				init: function(){
					me.sorting();
					me.render('h');
				},
				render: function(container){
					var chartVentWeb = Highcharts.chart(container,{
						chart:{
							type:'column'
						},
						title:{text:''},
						xAxis:{
							title:{text:''},
							categories:['Ventanilla','Internet']
						},
						yAxis:{
							stackLabels:{
								enabled:true,
								style:{fontWeight:'bold'}
							}
						},
						legend:{
							floating:false,
							align:"left",
							layout:"vertical",
							labelFormatter:function(){
								return this.name+':<br>Ventanilla: '+this.yData[0]+', Internet: '+this.yData[1];
							},
							verticalAlign:"top",
							backgroundColor:'rgba(255,255,255,0.1)',
							borderWidth:0,
							shadow:false
						},
						tooltip:{
							headerFormat:'<b>{point.x}</b><br/>',
							pointFormat:'{series.name}: {point.y}<br/>Total: {point.stackTotal}'
						},
						yAxis:{
							title:{text:''},
							//type: 'logarithmic',
							minorTickInterval: 2
						},
						plotOptions:{
							column:{
								stacking:'normal',
								dataLabels:{
									enabled:false
								}
							}
						},
						series:ventanilla
					});
				},
				sorting:function(){
					Highcharts.Chart.prototype.renderSeries=function(){
						var each=Highcharts.each,
						is_col=this.options.chart.type=='column',
						far_left,
						current_left;
						cols={};
						each(this.series,function(serie){
							serie.translate();
							if(is_col){
								each(serie.points,function(point,index){
									var colKey=serie.stackKey+': '+point.category;
									if(typeof far_left=='undefined'){far_left=point.shapeArgs.y+point.shapeArgs.height;}
									if(typeof cols[colKey]=='undefined'){cols[colKey]=[];}
									cols[colKey].push(point);
								});
							}
						});
						if(is_col){
							$.each(cols,function(colKey,points){
								current_left=far_left;
								points.sort(function(a,b){return(a.shapeArgs.height<b.shapeArgs.height)?1:(a.shapeArgs.height>b.shapeArgs.height)?-1:0;});
								each(points,function(point,index){
									point.shapeArgs.y=current_left-point.shapeArgs.height;
									current_left =point.shapeArgs.y+0;
								});
							});
						}
						each(this.series,function(serie){
							serie.render();
						});
					}
				}
			};
			me.init();
			// entidades financieras
			Highcharts.chart('i',{
				chart:{type:'bar'},
				title:{text:''},
				xAxis:{categories:['Bancomer','Banamex','Scotiabank','Banorte','L.de C. Inexistente']},
				yAxis:{title:{text:''}},
				plotOptions:{bar:{dataLabels:{enabled:true}}},
				legend:{enabled:false},
				series:[{
					name:'Total',
					data:[0,0,0,0,0]//pendiente
				}]
			});
		}
		readCache(tree);
	},"json");
	// fin de post
	// Tema de Highcharts
	Highcharts.theme={
		colors:['#0056B8','#FFA300','#50B432','#D5007D','#DAFA00','#007348','#FFF263','#6AF9C4','#B1CC14'],
		chart:{
			spacingBottom:5,
			spacingTop:5,
			spacingLeft:10,
			spacingRight:10
		},
		credits:{enabled:false},
		title:{
			style:{
				color:'#000',
				font:'bold 12px "Helvetica Neue",Helvetica,Arial,sans-serif'
			}
		},
		subtitle:{
			style:{
				color:'#666666',
				font:'bold 9px "Helvetica Neue",Helvetica,Arial,sans-serif'
			}
		},
		rangeSelector:{
			allButtonsEnabled:true,
			buttons:[{
				type:'day',
				count:1,
				text:'1d'
			},{
				type:'week',
				count:1,
				text:'1w'
			},{
				type:'month',
				count:1,
				text:'1m'
			},{
				type:'month',
				count:3,
				text:'3m'
			},{
				type:'all',
				text:'All'
			}]
		},
		exporting:{
			buttons:{
				contextButton:{
					menuItems:[{
						textKey:'downloadJPEG',
						onclick:function(){this.exportChart({type:'image/jpeg'});}
					},{
						textKey:'downloadPDF',
						onclick:function(){this.exportChart({type:'application/pdf'});}
					},{
						textKey:'downloadCSV',
						onclick:function(){this.downloadCSV();}
					},{
						textKey:'downloadXLS',
						onclick:function(){this.downloadXLS();}
					}]
				}
			}
		},
		legend:{
			itemStyle:{
				font:'9pt "Helvetica Neue",Helvetica,Arial,sans-serif',
				color:'black'
			},
			itemHoverStyle:{color:'gray'}
		}
	};
	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);
	var padding=$('.embed-responsive-32by9').css('padding-bottom');
	$('.others').css('padding-bottom',padding);
	$('.half').css('height',(parseInt(padding)/2));
	$(window).resize(function(){
		var padding = $('.embed-responsive-32by9').css('padding-bottom');
		$('.others').css('padding-bottom',padding);
		$('.half').css('height',(parseInt(padding)/2));
	});
	// Histórico de ingresos
	// getting series
	var lineasHist=0;
	var recibidasHist=0;
	$.post('includes/php/render.php',{series:'lineas'},function(tree1){
		lineasHist=tree1;
		//chartLineas.series[0].setData(lineasHist);
		$.post('includes/php/render.php',{series:'recibidas'},function(tree2){
			recibidasHist=tree2;
			//chartLineas.series[1].setData(recibidasHist);
			var chartLineas = Highcharts.stockChart('g',{
				chart:{
					type:'line',
					zoomType:'x',
					panning:true,
					panKey:'shift'
				},
				title:{text:''},
				navigator:{enabled:false},
				scrollbar:{enabled:false},
				rangeSelector:{selected:0},
				legend:{
					enabled:true,
					layout:'vertical',
					labelFormatter:function(){
						var count=0;
						for(var i=0;i<this.yData.length;i++){
							count+=this.yData[i];
						}
						return 'Acumulado de '+this.name+': '+count;
					},
					floating:true,
					align:'left',
					verticalAlign:'middle'
				},
				series:[{
					name:'L. de C.',
					data:lineasHist
				},{
					name:'Recepción',
					data:recibidasHist
				}]
			});
		},"json");
	},"json");
	$.post('includes/php/render.php',{series:'pagos'},function(tree){
		Highcharts.stockChart('a',{
			chart:{
				type:'line',
				zoomType:'x',
				panning:true,
				panKey:'shift'
			},
			title:{text:''},
			navigator:{enabled:false},
			scrollbar:{enabled:false},
			tooltip:{valueDecimals:0},
			rangeSelector:{selected:0},
			legend:{
				enabled:true,
				labelFormatter:function(){
					var count=0;
					for(var i=0;i<this.yData.length;i++){
						count+=this.yData[i];
					}
					return 'Acumulado de '+this.name+':<br>$ '+count;
				},
				floating:true,
				align:'left',
				verticalAlign:'middle'
			},
			xAxis:{minTickInterval:3600*1000},
			series:[{
				name:'Pagos',
				dataGrouping:{enabled:false},
				data:tree
			}]
		});
	},"json");
	// ventanilla o internet
	/*var internet=[{name: 'Internet',
		data: [
				['Normales',0],
				['Dejar sin Efecto Obligación',40],
				['Modificación de Obligaciones',1866],
				['Obligación no presentada',17],
				['Actualización de Importe',0],
				['Esquema Anterior',1]
			]}];
	internet.forEach(function(name){
		name.data.sort(function (a,b) {
			if(a[1] < b[1]) {
				return 1;
			}
			else if (a[1] > b[1]) {
				return -1;
			}
			return 0;
		});
	});
	Highcharts.chart('hi',{
		chart:{
			type:'pyramid',
			marginRight: 200
		},
		title:{text:''},
		type: 'logarithmic',
		plotOptions:{
			series: {dataLabels: {enabled: true}},
			pyramid:{
				minSize:30,
				width:'70%',
				events: {
					legendItemClick: function () {
						return false;
					}
				}
			}
		},
		legend: {enabled: true},
		series: internet
	});
	// ventanilla o internet
	var ventanilla=[{name: 'Ventanilla',
		data: [
				['Normales',0],
				['Dejar sin Efecto Obligación',0],
				['Modificación de Obligaciones',0],
				['Obligación no presentada',0],
				['Actualización de Importe',0],
				['Esquema Anterior',0]
			]}];
	ventanilla.forEach(function(name){
		name.data.sort(function (a,b) {
			if(a[1] < b[1]) {
				return 1;
			}
			else if (a[1] > b[1]) {
				return -1;
			}
			return 0;
		});
	});
	Highcharts.chart('h',{
		chart:{
			type:'pyramid',
			marginRight: 200
		},
		title:{text:''},
		type: 'logarithmic',
		plotOptions:{
			series: {dataLabels: {enabled: true}},
			pyramid:{
				minSize:30,
				width:'70%',
				events: {
					legendItemClick: function () {
						return false;
					}
				}
			}
		},
		legend: {enabled: true},
		series: ventanilla
	});*/
	// ingresos por banco
});