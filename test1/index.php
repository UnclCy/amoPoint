<!-- 1.	Напишите скрипт, который загружает файл .txt  и сохраняет в папке files в корне проекта. Результат загрузки должен выводиться ниже окна загрузки и представлять собой зеленый либо красный круг в соответствии с успешной загрузкой или ошибкой. 
После загрузки и сохранения файл должен быть прочитан и разбит заданным символом. Полученный массив необходимо вывести построчно на экран в виде строка = количество цифр в строке(использовать регулярное выражение)
Решение должно представлять из себя папку с необходимыми файлами php и css. -->

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>AmoPoint.test1</title>
		<link rel="stylesheet" type="text/css" href="./AmoPointTest1.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
		<script src="./AmoPointTest1.js"></script>
	</head>
	<body>
		<div class="flexCol center">
			<div class="flexRow">
				<input type="file" accept=".txt">
				<button class="uploadFiles button"><span >Загрузить файл .txt</span></button>
			</div> <!-- inputs -->
			<div class="responseDiv"></div>
		</div>
	</body>
</html>
