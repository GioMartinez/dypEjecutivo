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
	<link rel="stylesheet" href="includes/css/font-awesome.css"/>
	<link rel="stylesheet" href="includes/css/main.css"/>
</head>
<body>
	<header>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-4 col-xs-12">
					<div class="branding">
						<a class="logo" href="http://www.gob.mx/hacienda"><img src="includes/img/SHCPLogo.svg" alt="SHCP - "></a>
						<a class="logo" href="http://www.sat.gob.mx/Paginas/Inicio.aspx"><img src="includes/img/SATLogo.svg" alt="SAT"></a>
					</div>
				</div>
				<div class="col-sm-8 col-xs-12" style="display:none;">
					<div id="flip" style="margin:5px;">
						<div class="front">
							<div class="container-fluid">
								<div class="row">
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-lock"></i> Número de Autenticaciones</span>
										<h5 class="color-up" id="val_1">0</h5>
										<span class="diff"><b class="color-up" id="color_1"><i class="fa fa-arrow-up" id="icon_1"></i> <span id="per_1">0</span>%</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-user"></i> Usuarios Activos Totales</span>
										<h5 class="color-up" id="val_2">0</h5>
										<span class="diff"><b class="color-up" id="color_2"><i class="fa fa-arrow-up" id="icon_2"></i> <span id="per_2">0</span>%</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-desktop"></i> Experiencia de Usuario</span><br>
										<span class="diff"><b>
											<span class="label label-success" id="okay_6">0</span>
											<span class="label label-warning" id="warn_6">0</span>
											<span class="label label-danger" id="crit_6">0</span>
											<span class="label label-info" id="info_6">0</span>
										</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-list-alt"></i> Principales portales</span><br>
										<span class="diff"><b>
											<span class="label label-success" id="okay_7">0</span>
											<span class="label label-warning" id="warn_7">0</span>
											<span class="label label-danger" id="crit_7">0</span>
											<span class="label label-info" id="info_7">0</span>
										</b></span>
									</div>
								</div>
							</div>
						</div>
						<div class="back">
							<div class="container-fluid">
								<div class="row">
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-user-plus"></i> Nuevos Contribuyentes</span>
										<h5 class="color-up" id="val_3">0</h5>
										<span class="diff"><b class="color-up" id="color_3"><i class="fa fa-arrow-up" id="icon_3"></i> <span id="per_3">0</span>%</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-file-text"></i> Declaraciones Realizadas</span>
										<h5 class="color-up" id="val_4">0</h5>
										<span class="diff"><b class="color-up" id="color_4"><i class="fa fa-arrow-up" id="icon_4"></i> <span id="per_4">0</span>%</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-money"></i> Total Recaudado</span>
										<h5 class="color-up" id="val_5">0</h5>
										<span class="diff"><b class="color-up" id="color_5"><i class="fa fa-arrow-up" id="icon_5"></i> <span id="per_5">0</span>%</b></span>
									</div>
									<div class="col-sm-3 con-xs-12">
										<span class="title"><i class="fa fa-server"></i> Identidades</span><br>
										<span class="diff"><b>
											<span class="label label-success" id="okay_8">0</span>
											<span class="label label-warning" id="warn_8">0</span>
											<span class="label label-danger" id="crit_8">0</span>
											<span class="label label-info" id="info_8">0</span>
										</b></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Histórico de Pagos por Linea de Captura</h4>
							<a class="btn" id="pagosbtn">
								<i class="fa fa-expand" aria-hidden="true"></i>
							</a>
						</div>
						<div class="panel-body">
							<div class="col-xs-12" id="a"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-2 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Tipo de Contribuyente</h4></div>
						<div class="panel-body">
							<div class="col-xs-12 half" id="b"></div>
							<div class="col-xs-12 half" id="c"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Meta de Recaudación (2.8 Billones)</h4></div>
						<div class="panel-body">
							<div class="col-xs-12" id="d"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Autenticaciones vs Intentos</h4>
							<a class="btn" id="autvsintbtn">
								<i class="fa fa-expand" aria-hidden="true"></i>
							</a>
						</div>
						<div class="panel-body">
							<div class="col-xs-12" id="c1"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Ejercicio Actual vs Anterior</h4>
							<a class="btn" id="comparbtn">
								<i class="fa fa-expand" aria-hidden="true"></i>
							</a>
						</div>
						<div class="panel-body">
							<div class="col-xs-12" id="c2"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Obtención de nuevas Contraseñas</h4></div>
						<div class="panel-body">
							<div class="col-xs-12" id="c3"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3 col-xs-12" style="display: none;">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title" id="decRec">Declaraciones Recibidas</h4></div>
						<div class="panel-body">
							<div class="col-xs-12" id="e"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Recepción vs Línea de Captura</h4></div>
						<div class="panel-body">
							<div class="col-xs-12" id="f"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Histórico de Recepción vs Línea de Captura</h4>
							<a class="btn" id="lineasbtn">
								<i class="fa fa-expand" aria-hidden="true"></i>
							</a>
						</div>
						<div class="panel-body">
							<div class="col-xs-12" id="g"></div>
						</div>
					</div>
				</div>
				<div class="col-sm-5 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Declaraciones Recibidas</h4>
							<a class="btn" id="recibidasbtn">
								<i class="fa fa-expand" aria-hidden="true"></i>
							</a>
						</div>
						<div class="panel-body">
							<div class="col-xs-12" id="h"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="includes/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="includes/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="includes/js/flip.js"></script>
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