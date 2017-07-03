$(document).ready(function(){
	var fisicasP=0;
	var moralesP=0;
	var totalesP=0;
	var percentF=0;
	var percentM=0;
	var meta = 2800000000;
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
	var contActiv={series:"cont1",property:"activ"};
	var contInit={series:"cont1",property:"init"};
	var acumulado;
	var tiempo1=0;
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
		}
	};
	Highcharts.setOptions(Highcharts.theme);
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
	Highcharts.setOptions(Highcharts.theme);
	// Flip function not hover function
	$("#flip").flip({axis: 'x'});
	var hover=0;
	window.setInterval(function(){
		$("#flip").hover(function(){hover=1;},function(){hover=0;});
		if(hover==0){$("#flip").flip('toggle');}
	},5000);
	// Apply the theme
	var pagosChart=0;
	var autvsIntChart=0;
	var compareCahrt=0;
	var chartLineas=0;
	var recibidasChar=0;
	var chartVentWeb=0;
	var padding=$('.embed-responsive-32by9').css('padding-bottom');
	$('.others').css('padding-bottom',padding);
	$('.half').css('height',(parseInt(padding)/2));
	$(".panel-default .btn").click(function(e){
		e.preventDefault();
		var $this = $(this);
		$(this).closest('.panel').toggleClass('panel-fullscreen');
		var container=$(this).closest('.panel');
		if($this.children('i').hasClass('fa-expand')){
			$this.children('i').removeClass('fa-expand');
            $this.children('i').addClass('fa-compress');
		}
		else if($this.children('i').hasClass('fa-compress')){
			$this.children('i').removeClass('fa-compress');
            $this.children('i').addClass('fa-expand');
		}
		var id=$this[0].id;
		if(id=='pagosbtn'){
			pagosChart.setSize(
				container[0].offsetWidth - 40,
				container[0].offsetHeight - 40,
				false
			);
		}
		else if(id=='autvsintbtn'){
			autvsIntChart.setSize(
				container[0].offsetWidth - 40,
				container[0].offsetHeight - 40,
				false
			);
		}
		else if(id=='comparbtn'){
			compareCahrt.setSize(
				container[0].offsetWidth - 40,
				container[0].offsetHeight - 40,
				false
			);
		}
		else if(id=='lineasbtn'){
			chartLineas.setSize(
				container[0].offsetWidth - 40,
				container[0].offsetHeight - 40,
				false
			);
		}
		else if(id=='recibidasbtn'){
			chartVentWeb.setSize(
				container[0].offsetWidth - 40,
				container[0].offsetHeight - 40,
				false
			);
		}
	});
	// Histórico de ingresos
	function llenarGraficas(){
		$.post('includes/php/render.php',{series:'pagos'},function(tree){
			
			// prueba obtencion ultimo valor
			if(typeof pagosChart.series !== 'undefined'){//chaca si ya existe la grafica
				//var seriesLen=pagosChart.series[0];// es para obtener la serie
				//var len=seriesLen.data.length;//es para obtener el numero de valores
				//var dato= seriesLen.data[len-1].y;//es para obtener el ultimo valor
				var suma=0;
				for(var i=0;i<pagosChart.series[0].yData.length;i++){
					suma+=pagosChart.series[0].yData[i];
				}
				var suma2=0
				for(var key in tree){
					suma2+=tree[key][1];
				}
				if(suma == suma2){
					if(!$('#panel01').find("img").length){
						$('#panel01').append("<img src='includes/img/nuevo.png' class='bandNew'></img>");
						tiempo1=Date.now() / 1000 | 0;
					}
				}
				var tiempo2=Date.now() / 1000 | 0;
				if((tiempo1+20)<(tiempo2)){
					if($('#panel01').find("img").length){
						$('#panel01').find("img").remove();
					}
				}
			}
			
			pagosChart=Highcharts.stockChart('a',{
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
						acumulado=count;
						return 'Acumulado de '+this.name+':<br>$ '+count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
		$.post('includes/php/render.php',contActiv,function(result1){
			var cont1Activ=result1;
			$.post('includes/php/render.php',contInit,function(result2){
				var cont1Init=result2;
				//chartLineas.series[1].setData(recibidasHist);
				autvsIntChart = Highcharts.stockChart('c1',{
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
						floating:true,
						align:'left',
						verticalAlign:'middle'
					},
					series:[{
						name:'Sesiones Activas',
						data:cont1Activ
					},{
						name:'Inicios de Sesión',
						color:'#50B432',
						data:cont1Init
					}]
				});
				
			},"json");
		},"json");
		$.post('includes/php/render.php',contInit,function(result1){
			var IniciosThis=result1;
			$.post('includes/php/render.php',{series:'cont1'},function(result2){
				var IniciosLast=result2;
				for(var i in IniciosLast){
					IniciosLast[i][0]+=31550400000;
				}
				//chartLineas.series[1].setData(recibidasHist);
				compareCahrt = Highcharts.stockChart('c2',{
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
						floating:true,
						align:'left',
						verticalAlign:'middle'
					},
					series:[{
						name:'Ejercicio Actual',
						data:IniciosThis
					},{
						name:'Ejercicio Anterior',
						color:'#999',
						data:IniciosLast
					}]
				});
				
			},"json");
		},"json");
		$.post('includes/php/render.php',{pie:'obtencion'},function(result){
				// La Cont 3
				obtencionChart=Highcharts.chart('c3',{
					chart:{
						type:'pie',
						zoomType:'x',
						panning:true,
						panKey:'shift'
					},
					title:{text:'',},
					tooltip:{pointFormat:'<b>{point.percentage:.1f}%<br><b>{point.y:,.0f}</b>'},
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
								format:'{point.name}:<br>{y:,.0f}'
							},
							enableMouseTracking:true
						}
					},
					yAxis:{type: 'logarithmic'},
					series:[{
						startAngle:-90,
						name:'Declaraciones',
						data:[{
							name:'CIEC',
							y:parseInt(result[0].CIEC)
						},{
							name:'FIEL',
							y:parseInt(result[0].FIEL)
						},{
							name:'OTP',
							y:parseInt(result[0].OTP)
						},{
							name:'Contraseña',
							y:parseInt(result[0].PSW)
						}]
					}]
				});
		},"json");
		// peticion de datos al cache para marquesina
		$.post('includes/php/render.php',{data:'fetchModel'},function(tree){
			function readModel(tree){
				for(var index1 in tree['children']){
					//autenticaciones
					if(tree['children'][index1]['DName'].indexOf('AtenticacionesyUsuarios') !== -1){	
						for(var index2 in tree['children'][index1]['children']){
							//nuevos contribuyentes
							if(tree['children'][index1]['children'][index2]['DName'].indexOf('NuevosContribuyentes') !== -1){ // checa si está dentro de nuevos contrib
								var sumaNuevos=parseInt(tree['children'][index1]['children'][index2]['children'][0]['children'][0]['values'])+parseInt(tree['children'][index1]['children'][index2]['children'][1]['children'][0]['values']);
								document.getElementById('val_1').innerHTML=sumaNuevos;
								var altainter=parseInt (tree['children'][index1]['children'][index2]['children'][0]['children'][0]['values']);
								document.getElementById('val_3').innerHTML=altainter;
								var rif=parseInt (tree['children'][index1]['children'][index2]['children'][1]['children'][0]['values']);
								document.getElementById('val_3a').innerHTML=rif;
								var algo=parseInt (tree['children'][index1]['children'][index2]['children'][0]['children'][0]['values']);
								document.getElementById('val_4').innerHTML=algo;
								// cambio de color si es menor a 100%
								if(algo<100){
									$( "#val_1" ).removeClass( "color-up" ).addClass( "color-down" );
								}
								// obtener porcentaje
								// porcentaje = ((nuevo/anterior)-1)*100 "Nuevos Contribuyentes"
								var anterior=parseInt(tree['children'][index1]['children'][index2]['children'][1]['children'][0]['values']);
								var nuevo=parseInt(tree['children'][index1]['children'][index2]['children'][0]['children'][0]['values']);	
								var porcentajeautentica = ((nuevo/anterior)-1)*100;
								document.getElementById('per_3').innerHTML=porcentajeautentica.toFixed(1);  	
							}
									//porcentaje Número de Autenticaciones
									// porcentaje = ((nuevo/anterior)-1)*100 "Nuevos Contribuyentes"
									
									//Declaraciones realizadas val_4
						}
						
					}
					//identidades
					else if(tree['children'][index1]['DName'].indexOf('Identidades') !== -1){
					}
					//declaraciones
					else if(tree['children'][index1]['DName'].indexOf('Declaraciones') !== -1){
						for(var index2 in tree['children'][index1]['children']){
							//total declaraciones
							if(tree['children'][index1]['children'][index2]['DName'].indexOf('TotalDeclaraciones') !== -1){
							}
							//total recaudado
							else if(tree['children'][index1]['children'][index2]['DName'].indexOf('TotalRecaudado') !== -1){
							}
						}
					}
					//pruebas sinteticas
					else if(tree['children'][index1]['DName'].indexOf('PruebasSinteticas') !== -1){
						for(var index2 in tree['children'][index1]['children']){
							//flujoCCN
							if(tree['children'][index1]['children'][index2]['DName'].indexOf('FlujoCCN') !== -1){
								var countOkay=0;
								var countWarn=0;
								var countCrit=0;
								var countInfo=0;
								for(var val3 in tree['children'][index1]['children'][index2]['children'][0]['children']){
									if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'OK'){countOkay++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'MINOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'MAJOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'CRITICAL'){countCrit++;}
									else{countInfo++;}
								}
								document.getElementById('okay_6').innerHTML = countOkay;
								document.getElementById('warn_6').innerHTML = countWarn;
								document.getElementById('crit_6').innerHTML = countCrit;
								document.getElementById('info_6').innerHTML = countInfo;
								if(countOkay==0){document.getElementById('okay_6').style.display = 'none';}
								if(countWarn==0){document.getElementById('warn_6').style.display = 'none';}
								if(countCrit==0){document.getElementById('crit_6').style.display = 'none';}
								if(countInfo==0){document.getElementById('info_6').style.display = 'none';}
								
							}
							//TOPPS
							else if(tree['children'][index1]['children'][index2]['DName'].indexOf('TOPPS') !== -1){
								var countOkay=0;
								var countWarn=0;
								var countCrit=0;
								var countInfo=0;
								for(var val3 in tree['children'][index1]['children'][index2]['children'][0]['children']){
									if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'OK'){countOkay++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'MINOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'MAJOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][0]['children'][val3]['condition'] == 'CRITICAL'){countCrit++;}
									else{countInfo++;}
								}
								document.getElementById('okay_7').innerHTML = countOkay;
								document.getElementById('warn_7').innerHTML = countWarn;
								document.getElementById('crit_7').innerHTML = countCrit;
								document.getElementById('info_7').innerHTML = countInfo;
								if(countOkay==0){document.getElementById('okay_7').style.display = 'none';}
								if(countWarn==0){document.getElementById('warn_7').style.display = 'none';}
								if(countCrit==0){document.getElementById('crit_7').style.display = 'none';}
								if(countInfo==0){document.getElementById('info_7').style.display = 'none';}
							}
						}
					}
					//disponibilidad
					else if(tree['children'][index1]['DName'].indexOf('DisponibilidadHW') !== -1){
						for(var index2 in tree['children'][index1]['children']){
							var countOkay=0;
							var countWarn=0;
							var countCrit=0;
							var countInfo=0;
							for(var val3 in tree['children'][index1]['children'][index2]['children']){
								for(var val4 in tree['children'][index1]['children'][index2]['children'][val3]['children']){
									if(tree['children'][index1]['children'][index2]['children'][val3]['children'][val4]['condition'] == 'OK'){countOkay++;}
									else if(tree['children'][index1]['children'][index2]['children'][val3]['children'][val4]['condition'] == 'MINOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][val3]['children'][val4]['condition'] == 'MAJOR'){countWarn++;}
									else if(tree['children'][index1]['children'][index2]['children'][val3]['children'][val4]['condition'] == 'CRITICAL'){countCrit++;}
									else{countInfo++;}
								}
							}
						}
						document.getElementById('okay_8').innerHTML = countOkay;
						document.getElementById('warn_8').innerHTML = countWarn;
						document.getElementById('crit_8').innerHTML = countCrit;
						document.getElementById('info_8').innerHTML = countInfo;
						if(countOkay==0){document.getElementById('okay_8').style.display = 'none';}
						if(countWarn==0){document.getElementById('warn_8').style.display = 'none';}
						if(countCrit==0){document.getElementById('crit_8').style.display = 'none';}
						if(countInfo==0){document.getElementById('info_8').style.display = 'none';}
					}
				}
			}
			readModel(tree);
		},"json");
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
				totalesP=acumulado+moralesP;
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
				window.setTimeout(function(){
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
										+'$ '+acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
					// meta de recaudacion
					fisicasMper = parseFloat(((acumulado/meta)*100).toFixed(4));
					moralesMper = parseFloat(((moralesP/meta)*100).toFixed(4));
					var metaArray={'Físicas':fisicasMper,'Morales':moralesMper,'Total':fisicasMper+moralesMper};
					totalesM = parseFloat(((acumulado+moralesP)*1).toFixed(4));
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
								this.data[0].y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</span>';
							},
							layout:'vertical',
							align:'left',
							verticalAlign:'middle'
						},
						plotOptions:{
							solidgauge:{
								dataLabels:{enabled:false},
								linecap:'round',
								minPointLength:20,
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
								y:acumulado
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
					
				},1*1000);
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
									+'$ '+moralesP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
				// declaraciones recibidas
				var sumVW = document.getElementById('decRec'); 
				document.getElementById('decRec').innerHTML=sumVW.innerHTML+': '+(totalesVen+totalesWeb);
				recibidasChar=Highcharts.chart('e',{
					chart:{type:'pie'},
					title:{text:'',},
					tooltip:{pointFormat:'<b>{point.percentage:.1f}%</b><br><b>{point.y:,.0f}</b>'},
					legend:{
						labelFormatter:function(){
							var nameCh = this.name;
							return'<span style="text-weight:bold;">'+this.name+': '+this.series.data[this.index].y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</span>';
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
					tooltip:{pointFormat:'<b>{point.percentage:.1f}%<br><b>{point.y:,.0f}</b>'},
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
								format:'{point.name}:<br>{y:,.0f}'
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
						chartVentWeb = Highcharts.chart(container,{
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
									return this.name+':<br>Ventanilla: '+this.yData[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+', Internet: '+this.yData[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								},
								verticalAlign:"top",
								backgroundColor:'rgba(255,255,255,0.1)',
								borderWidth:0,
								shadow:false
							},
							tooltip:{
								headerFormat:'<b>{point.x}</b><br/>',
								pointFormat:'{series.name}: {point.y}<br/>Total: {point.stackTotal:,.0f}'
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
			}
			readCache(tree);
		},"json");		
		// fin de post
		// getting series
		var lineasHist=0;
		var recibidasHist=0;
		$.post('includes/php/render.php',{series:'lineas'},function(tree1){
			lineasHist=tree1;
			//chartLineas.series[0].setData(lineasHist);
			$.post('includes/php/render.php',{series:'recibidas'},function(tree2){
				recibidasHist=tree2;
				//chartLineas.series[1].setData(recibidasHist);
				chartLineas = Highcharts.stockChart('g',{
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
							return 'Acumulado de '+this.name+': '+count.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
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
	};
	llenarGraficas();
	window.setInterval(function(){
		llenarGraficas();
	},5*60*1000);
});