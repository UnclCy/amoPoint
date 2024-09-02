/*2. Необходимо написать js код, который в зависимости от выбранного значения поля Тип отражает разный набор полей на странице http://test.amopoint-dev.ru/testzz/testlist.html
Должны отображаться только те поля в атрибуте name которых есть значение выбранного элемента списка. 
Решение должно представлять из себя файл для подключения к странице, либо сниппет для запуска в браузере в консоли.
*/


function letsFilterThis(value){ //функция фильтрации по значению
  	$('#content [name]').each(function() {
      var name = $(this).attr('name');
      if(name != 'type_val'){
        if (name.indexOf(value) === -1) {
          $(this).parent().hide();
        } else {
          $(this).parent().show();
        }
      }
    });
  }
  
  $(document).ready(function(){ // при загрузке страницы добавляю div, куда буду грузить страницу
  	$('body').append(`<div id="content"></div>`);
    $.get('https://test.amopoint-dev.ru/testzz/testlist.html',function(data){
      $('#content').html(data);
      let value = $('[name="type_val"]').val();
  	  letsFilterThis(value); //послезагрузки фильтрую
    });
});

$(document).on('change', '[name="type_val"]', function(){ //при изменении селекта - фильтрую
  	let value = $(this).val();
  	letsFilterThis(value);
});
