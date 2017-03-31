<?php
include_once('includes/php/config.php');
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
	<title>Declaraciones Anuales</title>
	<link rel="icon" type="image/png" href="includes/img/SATIcon.png"/>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="includes/css/normalize.css"/>
	<link rel="stylesheet" href="includes/css/bootstrap.css"/>
	<link rel="stylesheet" href="includes/css/main.css"/>
</head>
<body>
	<header>
		<div class="branding">
			<a class="logo" href="http://www.gob.mx/hacienda"><img src="includes/img/SHCPLogo.svg" alt="SHCP - "></a>
			<a class="logo" href="http://www.sat.gob.mx/Paginas/Inicio.aspx"><img src="includes/img/SATLogo.svg" alt="SAT"></a>
		</div>
	</header>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Histórico de Pagos por Linea de Captura</h4></div>
						<div class="embed-responsive embed-responsive-32by9">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="a"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-2 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Tipo de Contribuyente</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12 half" id="b"></div>
									<div class="col-xs-12 half" id="c"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Meta de Recaudación (2.8 Billones)</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="d"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3 col-xs-12" style="display: none;">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title" id="decRec">Declaraciones Recibidas</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="e"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Contencion</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="c1"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Contencion</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="c2"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Contencion</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="c3"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Recepción vs Línea de Captura</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="f"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Histórico de Recepción vs Línea de Captura</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="g"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Declaraciones Recibidas</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="h"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Entidades Financieras</h4></div>
						<div class="embed-responsive others">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="i"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="includes/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="includes/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="includes/js/highstock.min.js"></script>
	<script type="text/javascript" src="includes/js/funnel.min.js"></script>
	<script type="text/javascript" src="includes/js/data.min.js"></script>
	<script type="text/javascript" src="includes/js/highcharts-more.min.js"></script>
	<script type="text/javascript" src="includes/js/exporting.min.js"></script>
	<script type="text/javascript" src="includes/js/export-csv.js"></script>
	<script type="text/javascript" src="includes/js/solid-gauge.min.js"></script>
	<script type="text/javascript" src="includes/js/dyp.js"></script>
</body>
</html>