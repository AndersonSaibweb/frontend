<?php
try {
	$db = "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.1.254)(PORT = 1521)))(CONNECT_DATA =(SERVICE_NAME = SAIB)))" ;
	$user = 'SAIB2000';
	$pass = 'M4R1Z4';	

	$conectar = new PDO('oci:dbname=' . $db, $user, $pass);
	$conectar->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// echo "Conectado";

} catch(PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}