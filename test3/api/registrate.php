<?php

$req = ['адрес базы данных', 'функции'];
foreach($req as $reqLink) : require $_SERVER['DOCUMENT_ROOT'].$reqLink; endforeach;

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') :
	$jsonContent = file_get_contents('php://input');
	$asocContent = json_decode($jsonContent, true);
	if(json_last_error() === JSON_ERROR_NONE) :
		$content = $asocContent['data'];
		if($content != null) :
			
			$serverName	= $content['server'];
			$pageName	= $content['page'];
			$ipName		= $content['ip'];
			$cityName	= $content['city'];
			$deviceName	= $content['device'];
             
			$ID_server = getIDbyName('server', $serverName);
			$ID_page = getIDbyName('page', $pageName);
			$ID_ip = getIDbyName('ip', $ipName);
			$ID_city = getIDbyName('city', $cityName);
			$ID_device = getIDbyName('device', $deviceName);

			$query = stats("INSERT INTO `visitors`(`id_server`, `id_page`, `id_ip`, `id_city`, `id_device`) VALUES ('$ID_server', '$ID_page', '$ID_ip', '$ID_city', '$ID_device') ");
        	if($query) :
				err(200, 'thankYou');
			else :
				err(404);
			endif;
		endif;
	else :
  	err(400);
  endif;
else: 
	err(405);
endif;
?>
