<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Страница вывода статистики</title>
  <script src="https://cdn.jsdelivr.net/npm/pageSelect@4.1.0-rc.0/dist/js/pageSelect.min.js"></script>
  <link rel="stylesheet" href="./stat.css">
</head>
<body class="flexRow">
  <div class="sidebar flexCol">
    <div class="select-container flexCol">
      <select id="server" style="width: 100%;"><option value="0">Не выбрано</option></select>
      <select id="page" style="width: 100%;"><option value="0">Не выбрано</option></select>
    </div>
    <input type="date" id="calendar">
  </div>
  <div class="content flexCol" id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/pageSelect@4.1.0-rc.0/dist/js/pageSelect.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src ="./stat.js"></script>
</body>
</html>
