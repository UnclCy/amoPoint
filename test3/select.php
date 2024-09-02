<?php

$req = ['бла-бла', 'все важные файлы для работы с БД и функциями'];
foreach($req as $reqLink) : require $_SERVER['DOCUMENT_ROOT'].$reqLink; endforeach;
$id = $_GET['id'];
if($_GET['type'] == null || $_GET['id'] == 0) :
	$query = "SELECT `id_server`, `id_page` FROM `visitors` WHERE NOT `del` ";	
elseif($_GET['type'] == 'server') :
	$query = "SELECT `id_server`, `id_page` FROM `visitors` WHERE NOT `del` AND `id_server` = '$id' ";	
elseif($_GET['type'] == 'page') :
	$query = "SELECT `id_server`, `id_page` FROM `visitors` WHERE NOT `del` AND `id_page` = '$id' ";	
endif;
$SQL = stats($query);
$UI = [];
if(nRows($SQL)>0) :
    foreach($SQL as $RES) :
    	foreach($RES as $key => $value) :
    		$UI[$key] = inArrayDrop($UI[$key], $value, 'pos');
    	endforeach;
    endforeach;
else :
    err(404);
endif;
$response = [];
if($UI != null) :
    foreach($UI as $key => $array) :
    	list($temp, $table) = explode('_', $key);
    	$LUI = impl($array);
    	$query = "SELECT `id`, `name` FROM `$table` WHERE `id` IN ($LUI) AND NOT `del` ORDER BY `name`";
    	$SQL = stats($query);
    	if(nRows($SQL)>0) :
    		foreach($SQL as $RES) :
    			$ID = $RES['id'];
    			$NAME = $RES['name'];
    			$response[$table][$ID] = $NAME;
    		endforeach;
    	endif;
    endforeach;
endif;
($response != null) ? err(200, $response) : err(404, 'notFound, no Cry, please');
?>
