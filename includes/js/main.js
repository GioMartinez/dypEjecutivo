$(document).ready(function(){
	$.post('includes/php/render.php',{data:'fetch'},function(tree){
		function readCache(tree){
			for(var values in tree){
				if(values=='ResponseTime'){
					$.post('includes/php/render.php',{series:tree[values]},function(series){
						document.getElementById('g').innerHTML+="<br> DN: "+tree[values];
						document.getElementById('g').innerHTML+="<br> data: "+JSON.stringify(series);
					},"json");
				}
				if(values=='children'){
					for(var children in tree[values]){
						readCache(tree[values][children]);
					}
				}
			}
		}
		readCache(tree);
	},"json");
	$.getJSON('includes/php/data.json',function(data){
		Highcharts.stockChart('c',{
			rangeSelector:{selected:1},
			credits:{enabled:false},
			series:[{
				name:'AAPL',
				data:data,
				tooltip:{valueDecimals:2}
			}]
		});
	});
	var data=[
		{"hc-key":"mx-bc","z":1},
		{"hc-key":"mx-bs","z":2},
		{"hc-key":"mx-so","z":3},
		{"hc-key":"mx-cl","z":4},
		{"hc-key":"mx-na","z":5},
		{"hc-key":"mx-cm","z":6},
		{"hc-key":"mx-qr","z":7},
		{"hc-key":"mx-mx","z":8},
		{"hc-key":"mx-mo","z":9},
		{"hc-key":"mx-df","z":10},
		{"hc-key":"mx-qt","z":11},
		{"hc-key":"mx-tb","z":12},
		{"hc-key":"mx-cs","z":13},
		{"hc-key":"mx-nl","z":14},
		{"hc-key":"mx-si","z":15},
		{"hc-key":"mx-ch","z":16},
		{"hc-key":"mx-ve","z":17},
		{"hc-key":"mx-za","z":18},
		{"hc-key":"mx-ag","z":19},
		{"hc-key":"mx-ja","z":20},
		{"hc-key":"mx-mi","z":21},
		{"hc-key":"mx-oa","z":22},
		{"hc-key":"mx-pu","z":23},
		{"hc-key":"mx-gr","z":24},
		{"hc-key":"mx-tl","z":25},
		{"hc-key":"mx-tm","z":26},
		{"hc-key":"mx-co","z":27},
		{"hc-key":"mx-yu","z":28},
		{"hc-key":"mx-dg","z":29},
		{"hc-key":"mx-gj","z":30},
		{"hc-key":"mx-sl","z":31},
		{"hc-key":"mx-hg","z":32}
	];
	Highcharts.mapChart('a',{
		chart:{
			map:'countries/mx/mx-all',
				events:{
				load:function(){
					var each=Highcharts.each,
					color=Highcharts.Color,
					chart=this,
					series=chart.series[1],
					colorAxis=this.colorAxis[0],
					points=series.points,
					color;
					each(points,function(p,i){
						color=colorAxis.toColor(p.z);
						p.update({
							color:color,
							marker:{
								states:{
									hover:{fillColor:color}
								}
							}
						},false);
					});
					chart.redraw();
				}
			}
		},
		credits:{enabled:false},
		title:{text:''},
		subtitle:{text:''},
		legend:{enabled:false},
		mapNavigation:{
			enabled:true,
			buttonOptions:{verticalAlign:'bottom'}
		},
		series:[{
			name:'Countries',
			colorAxis:true,
			enableMouseTracking:false
		},{
			type:'mapbubble',
			name:'Test',
			joinBy:'hc-key',
			data:data,
			minSize:3,
			maxSize:15,
			tooltip:{pointFormat:'{point.hc-key}: {point.z} tantos'}
		},{
			type:'heatmap',
			data:[[0,0,0]],
			showInLegend:false,
			visible:false
		}],
		colorAxis:{
			min:1,
			max:32,
			stops:[
				[0,'#18bc23'],
				[0.5,'#ffd300'],
				[1.0,'#c4463a']
			],
			startOnTick:false,
			endOnTick:false
		}
	});
	(function(H){
		var Series=H.Series,
		each=H.each;
		Series.prototype.getContext=function(){
			if(!this.canvas){
				this.canvas=document.createElement('canvas');
				this.canvas.setAttribute('width',this.chart.chartWidth);
				this.canvas.setAttribute('height',this.chart.chartHeight);
				this.image=this.chart.renderer.image('',0,0,this.chart.chartWidth,this.chart.chartHeight).add(this.group);
				this.ctx=this.canvas.getContext('2d');
			}
			return this.ctx;
		};
		Series.prototype.canvasToSVG=function(){
			this.image.attr({href:this.canvas.toDataURL('image/png') });
		};
		H.wrap(H.seriesTypes.heatmap.prototype,'drawPoints',function(){
			var ctx=this.getContext();
			if(ctx){
				each(this.points,function(point){
					var plotY=point.plotY,
					shapeArgs,
					pointAttr;
					if(plotY!==undefined&&!isNaN(plotY)&&point.y!==null){
						shapeArgs=point.shapeArgs;
						pointAttr=(point.pointAttr&&point.pointAttr['']) || point.series.pointAttribs(point);
						ctx.fillStyle=pointAttr.fill;
						ctx.fillRect(shapeArgs.x,shapeArgs.y,shapeArgs.width,shapeArgs.height);
					}
				});
				this.canvasToSVG();
			}
			else{this.chart.showLoading('Your browser doesn\'t support HTML5 canvas, <br>please use a modern browser');}
		});
		H.seriesTypes.heatmap.prototype.directTouch=false;// Use k-d-tree
	}(Highcharts));
	var start;
	Highcharts.chart('d',{
		data:{
			csv:document.getElementById('csv').innerHTML,
			parsed:function(){start=+new Date();}
		},
		chart:{
			type:'heatmap',
			margin:[0,70,15,55]
		},
		legend:{
			align:'right',
			verticalAlign:'bottom',
			layout:'vertical',
			x:0,
			y:0,
			navigation:{enabled:false}
		},
		credits:{enabled:false},
		title:{text:''},
		xAxis:{
			type:'datetime',
			min:Date.UTC(2013,0,1),
			max:Date.UTC(2014,0,1),
			labels:{
				align:'left',
				x:0,
				y:10,
				format:'{value:%B}'
			},
			showLastLabel:false,
			tickLength:8
		},
		yAxis:{
			title:{text:null},
			labels:{format:'{value}:00'},
			minPadding:0,
			maxPadding:0,
			startOnTick:false,
			endOnTick:false,
			tickPositions:[0,6,12,18,24],
			tickWidth:1,
			min:0,
			max:23,
			reversed:true
		},
		colorAxis:{
			stops:[
				[0,'#18bc23'],
				[0.5,'#ffd300'],
				[1.0,'#c4463a']
			],
			min:-15,
			max:25,
			startOnTick:false,
			endOnTick:false,
			labels:{format:'{value}℃'}
		},
		series:[{
			borderWidth:0,
			nullColor:'#EFEFEF',
			colsize:24 * 36e5,// one day
			tooltip:{
				headerFormat:'Temperature<br/>',
				pointFormat:'{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b>'
			},
			turboThreshold:Number.MAX_VALUE // #3404, remove after 4.0.5 release
		}]
	});
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
				skipClone:true
			},
			title:{text:''},
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
				positioner:function(w,h,point){return{x:point.plotX-w/2,y:point.plotY-h };}
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
		return hasRenderToArg?new Highcharts.Chart(a,options,c):new Highcharts.Chart(options,b);
	};
	var start=+new Date(),
	$tds=$('td[data-sparkline]'),
	fullLen=$tds.length,
	n=0;
	function doChunk(){
		var time=+new Date(),
			i,
			len=$tds.length,
			$td,
			stringdata,
			arr,
			data,
			chart;
		for(i=0;i<len;i+=1){
			$td=$($tds[i]);
			stringdata=$td.data('sparkline');
			arr=stringdata.split('; ');
			data=$.map(arr[0].split(', '),parseFloat);
			chart={};
	
			if(arr[1]){
				chart.type=arr[1];
			}
			$td.highcharts('SparkLine',{
				series:[{
					data:data,
					pointStart:1
				}],
				tooltip:{
					headerFormat:'<span style="font-size: 10px">'+$td.parent().find('th').html()+', Q{point.x}:</span><br/>',
					pointFormat:'<b>{point.y}.000</b> USD'
				},
				chart:chart
			});
			n+=1;
			if(new Date()-time<500){
				$tds.splice(0,i+1);
				setTimeout(doChunk,0);
				break;
			}
		}
	}
	doChunk();
	Highcharts.chart('e',{
		chart:{type:'bar'},
		credits:{enabled:false},
		title:{text:''},
		xAxis:{categories:['Apples','Oranges','Pears','Grapes','Bananas']},
		yAxis:{
			min:0,
			title:{text:'total'}
		},
		legend:{reversed:true},
		plotOptions:{series:{stacking:'normal'}},
		series:[{
			name:'John',
			data:[5,3,4,7,2]
		},{
			name:'Jane',
			data:[2,2,3,2,1]
		},{
			name:'Joe',
			data:[3,4,4,2,5]
		}]
	});
	Highcharts.getOptions().plotOptions.pie.colors=(function(){
		var colors=[],
		base=Highcharts.getOptions().colors[0],
		i;
		for(i=0;i<10;i+=1){colors.push(Highcharts.Color(base).brighten((i-3)/7).get());}
		return colors;
	}());
	Highcharts.chart('f',{
		chart:{type:'pie'},
		credits:{enabled:false},
		title:{text:''},
		plotOptions:{
			pie:{
				dataLabels:{enabled:false},
				cursor:'pointer',
				allowPointSelect:true
			}
		},
		series:[{
			name:'Brands',
			data:[
				{name:'Microsoft Internet Explorer',y:56.33},
				{name:'Chrome',y:24.03},
				{name:'Firefox',y:10.38},
				{name:'Safari',y:4.77},
				{name:'Opera',y:0.91},
				{name:'Proprietary or Undetectable',y:0.2}
			]
		}]
	});
});