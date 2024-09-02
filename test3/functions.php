<?php
function err($code, $result = null){
    return exit(json_encode(array('code' => $code, 'result' => $result)));
    
}
function stats($query){
	global $linkStat;
	return mysqli_query($linkStat, $query);
}
function nRows($SQL) {
	return mysqli_num_rows($SQL);
}
function res($SQL){
	return mysqli_fetch_array($SQL);
}
function getIDbyName($table, $name){
	$query = "SELECT `id` FROM `$table` WHERE `name` = '$name' AND NOT `del` LIMIT 1 ";
	$SQL = stats($query);
	if(nRows($SQL)==0) :
		stats("INSERT INTO `$table`(`name`) VALUES ('$name') ");
	endif;
	$SQL = stats($query);
	$RES = res($SQL);
	$ID = $RES['id'];
	return $ID;
}
function inArrayDrop($array, $needle, $tag = null) {
	if($tag == 'pos') :
		$tag = ($needle >0);
	elseif($tag == 'unsign') :
		$tag = ($needle >=0);
	elseif($tag == 'nozero') :
		$tag = ($needle != 0);
	else :
	    $tag = true;
	endif;
	if($array == null && $needle != null) :
		$array = [$needle];
	elseif(!in_array($needle, $array) && $needle != null && $tag):
		array_push($array, $needle);
	endif;
	return $array;
}

function getArrayParByLUI($table, $LUI, $par  = null){
	if(is_null($LUI)) :
		return false;
	else :
		$query = "SELECT * FROM `$table` WHERE `id` IN ($LUI) AND NOT `del` ";
		$SQL = stats($query);
		if(nRows($SQL)==0) :
			return false;
		else :
			$array = [];
			foreach($SQL as $RES) :
				$ID = $RES['id'];
				if(is_null($par)) :
					$array[$ID] = $RES;
				else :
					foreach($par as $key) :
						$array[$ID][$key] = $RES[$key];
					endforeach;
				endif;
			endforeach;
			return $array;
		endif;
	endif;
}
function getNamebyID($table, $ID){
	$query = "SELECT `name` FROM `$table` WHERE `id` = '$ID' AND NOT `del` LIMIT 1 ";
	$SQL = stats($query);
	if(nRows($SQL)==0) :
		return false;
	else :
		$RES = res($SQL);
		$NAME = $RES['name'];
		return $NAME;
	endif;
}

function impl($array){
	return (!is_null($array)) ? implode(', ', $array) : false;		
}

?>
