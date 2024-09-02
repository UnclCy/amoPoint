<?php
require './globalFunc.php';

if(isset($_POST['my_file_upload']) && isset($_FILES)) :
  //$uploadDir = $_SERVER['DOCUMENT_ROOT'].'/files'; использовать для сохранения на корневой папки сервера
  $uploadDir = './files'; //использовать для корневой папки проекта
  if(!is_dir($uploadDir)) : 
    mkdir($uploadDir, 0777);
  endif;
  $file = $_FILES[0];
  $fileName = cyrillic_translit($file['name']);
  $filePath = $uploadDir.'/'.$fileName;
  if(!move_uploaded_file($file['tmp_name'], $filePath)) :
    err(400, 'Ошибка загрузки файла');
  elseif(empty(file_get_contents($filePath))) :
      err(422, 'Файл успешно загружен, но файл пуст.');
    else : 
        err(200, ['url' => $filePath]);
  endif;
endif;

?>
