<!DOCTYPE html>
<html lang="es-MX">
<head>
	<title>Comercio Exterior</title>
	<link rel="icon" type="image/png" href="includes/img/SATIcon.png"/>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="includes/css/normalize.css"/>
	<link rel="stylesheet" href="includes/css/bootstrap.css"/>
	<link rel="stylesheet" href="includes/css/font-awesome.css"/>
	<link rel="stylesheet" href="includes/css/main.css"/>
</head>
<body>
	<header>
		<div class="branding">
			<a class="logo" href="http://www.gob.mx/hacienda"><img src="includes/img/SHCPLogo.svg" alt="SHCP - "></a>
			<a class="logo" href="http://www.sat.gob.mx/Paginas/Inicio.aspx"><img src="includes/img/SATLogo.svg" alt="SAT"></a>
		</div>
	</header>
	<div class="container-fluid">
		<div class="row">
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-7">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Operaciones por Aduana</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-6 content" id="mapa"></div>
						<div class="col-xs-12 col-sm-6 content" id="listAduana">
							<table id="table-sparkline" class="table table-hover table-condensed">
								<thead>
									<tr>
										<th>Aduana</th>
										<th>Operaciones</th>
										<th>Semana</th>
									</tr>
								</thead>
								<tbody id="tbody-sparkline">
									<tr>
										<th>AICM</th>
										<td>254</td>
										<td data-sparkline="71, 78, 39, 66 "/>
									</tr>
									<tr>
										<th>Monterrey</th>
										<td>246</td>
										<td data-sparkline="87, 44, 74, 41 "/>
									</tr>
									<tr>
										<th>Tijuana</th>
										<td>101</td>
										<td data-sparkline="56, 12, 8, 25 "/>
									</tr>
									<tr>
										<th>Reynosa</th>
										<td>303</td>
										<td data-sparkline="81, 50, 78, 94 "/>
									</tr>
									<tr>
										<th>Juárez</th>
										<td>200</td>
										<td data-sparkline="61, 80, 10, 49 "/>
									</tr>
									<tr>
										<th>Mazatlán</th>
										<td>254</td>
										<td data-sparkline="71, 78, 39, 66 "/>
									</tr>
									<tr>
										<th>Cancún</th>
										<td>246</td>
										<td data-sparkline="87, 44, 74, 41 "/>
									</tr>
									<tr>
										<th>Progreso</th>
										<td>101</td>
										<td data-sparkline="56, 12, 8, 25 "/>
									</tr>
									<tr>
										<th>Piedras Negras</th>
										<td>303</td>
										<td data-sparkline="81, 50, 78, 94 "/>
									</tr>
									<tr>
										<th>Guadalajara</th>
										<td>200</td>
										<td data-sparkline="61, 80, 10, 49 "/>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-5">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Total de Entradas por Día</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="aduanaHisto"></div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Top País de Orígen</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="topPais"></div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Entradas por Fracción Arancelaria</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="faccArancel"></div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Pagos de Derechos</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="pagosDerechos"></div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Por Tipo de Reconocimiento Aduanero</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="tipoRecono"></div>
					</div>
				</div>
			</div>
			<!-- primer caja en orden -->
			<div class="col-xs-12 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h5>Esclusas</h5>
						<a class="btn" id="pagosbtn"><i class="fa fa-expand" aria-hidden="true"></i></a>
					</div>
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 content" id="esclusas"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<footer>
		<div class="footer">
			<a class="microfocus" href="https://www.microfocus.com"><img src="includes/img/mf_logo_blue.png" alt="MicroFocus Inc."></a>
		</div>
	</footer>
	<script type="text/javascript" src="includes/js/data1.js"></script>
	<script type="text/javascript" src="includes/js/data2.js"></script>
	<script type="text/javascript" src="includes/js/data3.js"></script>
	<script type="text/javascript" src="includes/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="includes/js/bootstrap.js"></script>
	<script type="text/javascript" src="includes/js/highstock.min.js"></script>
	<script type="text/javascript" src="includes/js/proj4.js"></script>
	<script type="text/javascript" src="includes/js/map.min.js"></script>
	<script type="text/javascript" src="includes/js/heatmap.min.js"></script>
	<script type="text/javascript" src="includes/js/data.min.js"></script>
	<script type="text/javascript" src="includes/js/mx-all.js"></script>
	<script type="text/javascript" src="includes/js/main.js"></script>
</body>
</html>