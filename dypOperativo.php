<?php
include_once('includes/php/config.php');
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
	<title>Dashboard</title>
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
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Login</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="a"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">DyP</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="b"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Autenticaciones</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="c"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Peticiones</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="d"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-12">
					<table class="table table-hover table-bordered">
						<tbody>
							<tr class="success" height="100px">
								<td width="10%">Contención Contribuyente</td>
								<td width="10%">300k</td>
								<td width="10%" id="band1"><span class="label label-success pull-right">OK</span></td>
								<td width="10%">Contención Empleado</td>
								<td width="10%">50k</td>
								<td width="10%" id="band2"><span class="label label-success pull-right">OK</span></td>
								<td width="10%">DyP Cont</td>
								<td width="10%">500k</td>
								<td width="10%" id="band3"><span class="label label-success pull-right">OK</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Portales</h4></div>
						<div class="embed-responsive embed-responsive-4by3">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="e">
										<div class="list-group">
											<button type="button" class="list-group-item">CFDi<span class="label label-success pull-right">OK</span></button>
											<button type="button" class="list-group-item">Anuales<span class="label label-warning pull-right">Warning</span></button>
											<button type="button" class="list-group-item">App1<span class="label label-danger pull-right">Critical</span></button>
											<button type="button" class="list-group-item">App2<span class="label label-info pull-right">Info</span></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Servicios en la nube</h4></div>
						<div class="embed-responsive embed-responsive-4by3">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="">
										<table class="table table-hover">
											<tbody>
												<tr>
													<td>Servicio 1</td>
													<td><span class="label label-success pull-right">OK</span></td>
													<td>Servicio 1</td>
													<td><span class="label label-success pull-right">OK</span></td>
												</tr>
												<tr>
													<td>Servicio 1</td>
													<td><span class="label label-success pull-right">OK</span></td>
													<td>Servicio 1</td>
													<td><span class="label label-success pull-right">OK</span></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Identidades</h4></div>
						<div class="embed-responsive embed-responsive-4by3">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="g">
										<table class="table table-hover">
											<tbody>
												<tr>
													<td>Balanceo</td>
													<td>
														<ul>
															<li><span class="label label-success pull-right">OK</span></li>
															<li><span class="label label-success pull-right">OK</span></li>
															<li><span class="label label-success pull-right">OK</span></li>
														</ul>
													</td>
													<td><span class="label label-success pull-right">OK</span></td>
												</tr>
												<tr>
													<td>LAG1</td>
													<td>
														<ul>
															<li>IDP1<span class="label label-success pull-right">OK</span></li>
															<li>IDP2<span class="label label-success pull-right">OK</span></li>
															<li>IDP3<span class="label label-success pull-right">OK</span></li>
														</ul>
													</td>
													<td><span class="label label-success pull-right">OK</span></td>
												</tr>
												<tr>
													<td>LAG2</td>
													<td>
														<ul>
															<li>IDP1<span class="label label-success pull-right">OK</span></li>
															<li>IDP2<span class="label label-success pull-right">OK</span></li>
															<li>IDP3<span class="label label-success pull-right">OK</span></li>
														</ul>
													</td>
													<td><span class="label label-success pull-right">OK</span></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer"><?php include_once 'includes/html/maps.html';?></div>
	<script type="text/javascript" src="includes/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="includes/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="includes/js/highstock.min.js"></script>
	<script type="text/javascript" src="includes/js/map.min.js"></script>
	<script type="text/javascript" src="includes/js/data.min.js"></script>
	<script type="text/javascript" src="includes/js/heatmap.min.js"></script>
	<script type="text/javascript" src="includes/js/highcharts-more.min.js"></script>
	<script type="text/javascript" src="includes/js/solid-gauge.min.js"></script>
	<script type="text/javascript" src="includes/js/mexico.js"></script>
	<script type="text/javascript" src="includes/js/dyp.js"></script>
</body>
</html>