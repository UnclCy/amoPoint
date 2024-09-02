function segodnya(){ //функция вернет отформатированную дату сегодняшнего дня
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, '0'), month = String(currentDate.getMonth() + 1).padStart(2, '0'), year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
}

function testDate(string) { //данная функция будет проверять строку даты на соответсвие yyyy-mm-dd
    var datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(string)) {return false;}
    var parts = string.split('-');
    var year = parseInt(parts[0], 10), month = parseInt(parts[1], 10), day = parseInt(parts[2], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) {return false;}
    if (month === 2) {
        var isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        return day <= (isLeapYear ? 29 : 28);
    } else if (month === 4 || month === 6 || month === 9 || month === 11) { 
        return day <= 30;
    } else {
        return day <= 31;
    }
}

function letsFilterThis(type = null, id = null) { //будем управлять содержимым, отправлять запрос на доступные элементы фильтра
    let url = `http://svitex.ru/api/visitors/select.php`; //стандартный ЮРЛ
    if (type !== null && id !== null) { //обрабатываем  исключение, остальное по логике нам не нужно
        url += `?type=${type}&id=${id}`;
    }
    $.ajax({ //используем API для выгрузки
        url: url,
        method: 'GET',
        success: function(response) {
            try {
                let answer = JSON.parse(response);
                if (answer.code == 200) { // положительный результат, остальное не интересно
                    let result = answer.result;
                    console.log(result);
                    $.each(result, function(key, array) { //получаем массив селектов
                        let old = $(`#${key}`).val(); //получаем старое айди селекта
                        if(key !== type){ //текущий селект не трогаем оброабатываем другой селект, сокращаем его записи
                            $(`#${key} option`).each(function() {
                                if ($(this).val() !== "0" && $(this).val() != old) { //удалим все кроме дефолтного(0) и старого значения в другом селекте
                                    $(this).remove(); //собственно :)
                                }
                            });
                            $.each(array, function(idKey, name) { //загрузим в данный селект весь словарь полученный из запроса
                                if (idKey !== old) {
                                    var option = $('<option>', { value: idKey, text: name });
                                    $(`#${key}`).append(option);
                                }
                            }); 
                        }
                    });
                }
            } catch (e) {
                console.error('JSONTrouble:', e);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX Error:', textStatus, errorThrown);
        }
    });
}

function getInfo(inputs = null){ //будем отправлять запрос GET на API базы данных для получения информации
    let getPar = [];
    let url = `http://svitex.ru/api/visitors/get.php`;
    if (Object.keys(inputs).length > 0) {
        $.each(inputs, function(key, value) {
            getPar.push(`${key}=${value}`);
        });
    }
    if (getPar.length > 0) { // если параметры найдены, то создаем верный URL
        url += `?${getPar.join('&')}`;
    }
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
            try {
                let answer = JSON.parse(response);
                if (answer.code == 200) {
                    
                    loadInfo(answer.result); //будем выводить дамграммы
                } else {
                    loadInfo(); //или пустые диаграммы
                }
            } catch (e) {
                console.error('JSON ERROR ', e);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX Error:', textStatus, errorThrown);
        }
    });
}

function rgbR(){
    return Math.floor(Math.random() * 256); //для ленивых(рандомное значение RGB канала для оформления диаграмм)
}

function genRGB(){ // ну сотственно генерация RGBA
    let r = rgbR(), g = rgbR(), b = rgbR();
    let string = `rgba(${r}, ${g}, ${b}`;
    return [`${string}, 0.5)`, `${string}, 1)`];
}

function loadInfo(array = null){
    $('#content').html(null).append(`
      <canvas id="roundDiagram" width="300" height="300"></canvas>
      <canvas id="lineDiagram" width="480" height="300"></canvas>`);
    let infoCity = {
        label: [],
        data: [],
        backgroundColor: [],
        borderColor: []
    };
    let city, uniq;
    if(array === null ){ //обработаем исключение
        city = {'Посещения не найдены' : 0};
    } else {
        city = array.city, uniq = array.uniq;
    }

    $.each(city, function(nameCity, kol_vo){
        var color = genRGB();
        var backgroundColor = color[0], borderColor = color[1];
        infoCity.label.push(nameCity);
        infoCity.data.push(kol_vo);
        infoCity.backgroundColor.push(backgroundColor);
        infoCity.borderColor.push(borderColor);
    });

    const ctxRound = document.getElementById('roundDiagram').getContext('2d');
    const roundChart = new Chart(ctxRound, {
        type: 'pie',
        data: {
            labels: infoCity.label,
            datasets: [{
                label: 'Посещения по городам',
                backgroundColor: infoCity.backgroundColor,
                borderColor: infoCity.borderColor,
                data: infoCity.data
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });

    let lineData = [], color = genRGB(), lineLabels = [];
    var backgroundColor = color[0], borderColor = color[1];
    if(array == null){
        lineLabels = Array.from({length: 24}, (_, i) => i);
        lineData = new Array(24).fill(0);
    } else {
        $.each(uniq, function(hour, visits){
            lineData.push(visits);
            lineLabels.push(hour);
        });
    }

    const ctxLine = document.getElementById('lineDiagram').getContext('2d');
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: lineLabels,
            datasets: [{
                label: 'Посещения по часам',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                data: lineData,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {beginAtZero: true}
            },
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

function getValues(){
    var response = {
        server : $('#server').val(),
        page : $('#page').val(),
        date : $('#calendar').val()
    };
    return response;
    
}

function setSelectValue(key, value){
    if (value) {
        var select = $(`#${key}`);
        if (select.find(`option[value="${value}"]`).length > 0) {
            select.val(value);
            letsFilterThis(key, value);
        }
    }
}

$(document).ready(function(){
    var getQueryPar = {}; // //давайте проверим есть ли открытые запросы
    var getString = window.location.search.substring(1);
    var pairs = getString.split('&');
    
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        getQueryPar[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    //тестируем гет параметры на верность формата даты
    if(getQueryPar.date !== null && testDate(getQueryPar.date)){
        $('#calendar').val(getQueryPar.date);
    } else {
        $('#calendar').val(segodnya());
    }
    //проверяем сервер и страницу из гет параметров
    let id_server = getQueryPar.server || 0;
    let id_page = getQueryPar.page || 0;

    letsFilterThis(); //обновим селекты по всем доступным запросам
    setSelectValue('server', id_server); //усстанавливаем оптион серверу
    setSelectValue('page', id_page);// и странице
    let inputs = getValues(); // получаем массив по селекту
    getInfo(inputs); //грузим данные для диаграмм
});

$(document).on('change', '#server', function(){ //обрабатываем замену селекта Сервера
    let inputs = getValues();
    let id_server = inputs.server;
    (id_server === 0) ? letsFilterThis() : letsFilterThis('server', id_server);
    getInfo(inputs);
});

$(document).on('change', '#page', function(){ //тут обрабатываем замену страницы
    let inputs = getValues();
    let id_page = inputs.page;
    (id_page === 0) ? letsFilterThis() : letsFilterThis('page', id_page);
    getInfo(inputs);        
});

$(document).on('change', '#calendar', function(){ // не забыли и про календарь
    let inputs = getValues();
    
    getInfo(inputs); 
});
