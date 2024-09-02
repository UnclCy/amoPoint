<?php

$req = ['для коннекта', 'для функций'];
foreach($req as $reqLink) : require $_SERVER['DOCUMENT_ROOT'].$reqLink; endforeach;
$cityVisit = $uniqVisit = [];
$query = "SELECT `id_ip`, `id_city`, `id_device`, `createdAt` FROM `visitors` WHERE NOT `del` ";
$qDopPar = [];
if($_GET['server'] != null && $_GET['server'] >0) :
	array_push($qDopPar, "`id_server`= '".$_GET['server']."'");
endif;
if($_GET['page'] != null && $_GET['page'] >0) :
	array_push($qDopPar, "`id_page`= '".$_GET['page']."'");
endif;
if($_GET['date'] != null) :
	array_push($qDopPar, "`createdAt` LIKE '%".$_GET['date']."%'");
endif;

if($qDopPar != null) :
	$dopPar = implode(" AND ", $qDopPar);
	$query .= "AND ".$dopPar;
endif;
$UI_city = [];
$SQL = stats($query);
if(mysqli_num_rows($SQL) == 0) :
	err(404);
endif;
foreach($SQL as $RES) :
	$ID_ip = $RES['id_ip'];
	$ID_city = $RES['id_city'];
	$ID_device = $RES['id_device'];
    $UI_city = inArrayDrop($UI_city, $ID_city);
	$uniq = $ID_city.'/'.$ID_ip.'/'.$ID_device;
	$createdAt = $RES['createdAt'];
	list($date, $time) = explode(' ', $createdAt);
	list($hour, $min, $sec) = explode(':', $time);
	$hour = ltrim($hour, '0');
	$cityVisit[$ID_city] = inArrayDrop($cityVisit[$ID_city], $uniq);
	$uniqVisit[$hour] = inArrayDrop($uniqVisit[$hour], $uniq);
endforeach;
$LUI_city = impl($UI_city);
$SQL_city = stats("SELECT `id`, `name` FROM `city` WHERE `id` IN ($LUI_city) ");
$ALL_city = [];
foreach($SQL_city as $RES) :
    $ID_city = $RES['id'];
    $ALL_city[$ID_city]['name'] = $RES['name'];
endforeach;
$responseHour = [];
for ($ihour=0; $ihour < 24; $ihour++) :
	$responseHour[$ihour] = ($uniqVisit[$ihour] != null) ? count($uniqVisit[$ihour]) : 0; //можно реализовать в JS, чтобы передавать меньше данных
endfor;
$responseCity = [];
foreach($cityVisit as $ID_city => $uniq) :
    $nameCity = $ALL_city[$ID_city]['name'];
	$responseCity[$nameCity] = count($uniq);
endforeach;
err(200, ['city' => $responseCity, 'uniq' => $responseHour, 'get' => $_GET]);

?>
