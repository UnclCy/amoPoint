<?php
require './globalFunc.php';
$filePath = $_POST['filePath'];

if(isset($filePath) && file_exists($filePath)) :
  $content = file_get_contents($filePath);
  if(empty($content)) :
    err(422, 'Файл был очищен.');
  else :
    err(200, explode($_POST['split'], str_replace("\n", '', $content)));
  endif;
else :
  err(404, 'Файл был удален.');
endif;
?>
