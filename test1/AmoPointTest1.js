function label(responseCode){ //кругляш
	var color = 'red';
	if(responseCode == 200){
		color = 'green';
	}
	return `<div class="labelCode ${color}"></div>`;
}

$(document).on('click', '#erase', function(){ //стираем инпут
  $('input[type=text]').val('');
  $(".splitFiles").hide();
});

$(document).on('input', 'input[type=text]', function(){ //управляем показом инпута, ограничиваем по вводу на символ
  let inputText = $('input[type=text]').val();
  if(inputText ==''){
    $(".splitFiles").hide();
  } else{
    if(inputText.length>1){
      $('input[type=text]').val(inputText[0]);
    }
    $(".splitFiles").show();    
  }
});

$(document).on('click', '.splitFiles', function(){ //управляем кнопкой отправки POST на fileSplit
  let char = $('input[type=text]').val(), url = $('input[type=hidden]').val();
  let data = new FormData();
  data.append('split', char);
  data.append('filePath', url);
  $.ajax({
    url: './fileSplit.php',
    type: 'POST',
    data: data,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(response) {
      let code = response.code;
      let result = response.result;
      if(code != 200){
        $('.responseDiv').append(label(code) + code + result);
        $('input[type=file]').show();
      }
      else {
        $('.responseSplit').remove();
        $('.responseDiv').append('<div class="responseSplit"></div>');
        $.each(result, function(key, value){
          if(value.length>0) {
            $('.responseSplit').append(`<p style="margin:0;">${value} = ${value.length}</p>`);
          }
        });
      }
    },
    error: function(xhr, status, error) {
      $('.responseDiv').html('Ошибка POST: ' + xhr.responseText);
    }
  });
});

$(document).ready(function(){ //остальные элементы ужеможно использовать и так, они появляются при загрузке страницы
	var files = [];
	$('input[type=file]').on('change', function(){ //управляем заменой файла
    $('.responseDiv').html('');
    files = this.files;
    if (files.length > 0) {
      $(".uploadFiles").show(); // Показываем кнопку загрузки
    }
  });
  
  $('.uploadFiles').on('click', function(event){ // загружаем файл
    event.stopPropagation();
    event.preventDefault();
    var data = new FormData();
    var file = files[0];
    if(file.name.split('.').pop() != "txt"){
      $('.responseDiv').html('Ошибка: Неверный формат файла. Пожалуйста, выберите файл с расширением txt.');
      
    } else{
      data.append(0, file);
      data.append('my_file_upload', 1);
      $('input[type=file]').hide();
      $('.responseDiv').html('Загружаю файл...');
      $.ajax({
        url: './fileUpload.php',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(response) {
          let code = response.code;
          let result = response.result;
          if(code != 200){
              $('.responseDiv').html(label(code) + code + result);
              $('input[type=file]').show();
          } else {
            var url = result.url;
            $('.responseDiv').html('').append(`
              <p>${label(code)} ${code}Успешно</p>
            	<input type="hidden" value="${url}"/>
            	<div class="flexRow">
                <span>Введите символ разбиения строки</span>
                <input type="text" maxlegth="1">
                <button id="erase">X</button>
                <button class="splitFiles button"><span>Получить результат</span></button>
              </div>`);
          }
        },
        error: function(xhr, status, error) {
          $('.responseDiv').html('Ошибка POST: ' + xhr.responseText);
        }
      });
    }
  });
});
