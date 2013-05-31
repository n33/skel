<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>skel.js: A framework for building responsive sites and apps.</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="A lightweight frontend framework for building responsive sites and apps. Provides a configurable grid system, responsive breakpoint handler, and numerous other features. MIT/GPLv2 licensed." />
		<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,600,700|Source+Code+Pro" rel="stylesheet" />
		<!--[if lte IE 8]><script src="assets/js/html5shiv.js" type="text/javascript"></script><![endif]-->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="assets/js/config.js"></script>
		<script src="assets/js/skel.min.js"></script>
		<noscript>
			<link rel="stylesheet" href="assets/css/skel-noscript.css" />
			<link rel="stylesheet" href="assets/css/style.css" />
			<link rel="stylesheet" href="assets/css/style-normal.css" />
			<link rel="stylesheet" href="assets/css/style-wide.css" />
		</noscript>
	</head>
	<body>
	
		<div id="bar">
			<ul>
				<li id="top-link"><a href="#top">Download</a></li>
				<li id="how-link"><a href="#how">Overview</a></li>
				<li id="example-link"><a href="#example">Example</a></li>
				<li id="setup-link"><a href="#setup">Setup</a></li>
				<li id="usage-link"><a href="#usage">Usage</a></li>
				<li id="config-link"><a href="#config">Config Reference</a></li>
				<li id="license-link"><a href="#license">License</a></li>
			</ul>
		</div>
		
		<?php
			require('1-top.php');
			require('2-how.php');
			require('3-example.php');
			require('4-setup.php');
			require('5-usage.php');
			require('6-config.php');
			require('7-license.php');
			require('8-credits.php');
			require('9-about.php');
		?>

		<div id="copyright">
			&copy; skel.js. Product of <a href="http://n33.co">n33</a>.
		</div>

	</body>
</html>