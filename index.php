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
		<ul class="nav nav-tabs nav-justified">
			<li role="presentation" class="active"><a href="#">Home</a></li>
			<li role="presentation"><a href="#">Profile</a></li>
			<li role="presentation"><a href="#">Messages</a></li>
		</ul>
	</header>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 1</h4></div>
						<div class="embed-responsive embed-responsive-32by9">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-6" id="a"></div>
									<table class="col-xs-6" id="table-sparkline">
										<thead>
											<tr>
												<th>Aduana</th>
												<th>Op</th>
												<th>Semana</th>
											</tr>
										</thead>
										<tbody id="tbody-sparkline">
											<tr>
												<th>Alabama</th>
												<td>254</td>
												<td data-sparkline="71, 78, 39, 66 "/>
											</tr>
											<tr>
												<th>Alaska</th>
												<td>246</td>
												<td data-sparkline="87, 44, 74, 41 "/>
											</tr>
											<tr>
												<th>Arizona</th>
												<td>101</td>
												<td data-sparkline="56, 12, 8, 25 "/>
											</tr>
											<tr>
												<th>Arkansas</th>
												<td>303</td>
												<td data-sparkline="81, 50, 78, 94 "/>
											</tr>
											<tr>
												<th>California</th>
												<td>200</td>
												<td data-sparkline="61, 80, 10, 49 "/>
											</tr>
											<tr>
												<th>Colorado</th>
												<td>118</td>
												<td data-sparkline="13, 48, 21, 36 "/>
											</tr>
											<tr>
												<th>Connecticut</th>
												<td>201</td>
												<td data-sparkline="6, 64, 44, 87 "/>
											</tr>
											<tr>
												<th>Delaware</th>
												<td>161</td>
												<td data-sparkline="7, 27, 49, 78 "/>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 2</h4></div>
						<div class="embed-responsive embed-responsive-32by9">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="c"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 3</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="d"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 4</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="e"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 5</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="f"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading"><h4 class="panel-title">Gráfica 6</h4></div>
						<div class="embed-responsive embed-responsive-16by7">
							<div class="panel-body embed-responsive-item">
								<div class="row">
									<div class="col-xs-12" id="g" style="overflow:scroll;"></div>
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
	<script type="text/javascript" src="includes/js/mexico.js"></script>
	<script type="text/javascript" src="includes/js/main.js"></script>
</body>
</html>