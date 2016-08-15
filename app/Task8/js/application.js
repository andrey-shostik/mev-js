if(window.addEventListener) {
  window.addEventListener('load', function () {

  var canvas, context, tool;

  function init() {
    // Находим canvas элемент
    var canvas = document.getElementById('tablet');
    var btnCleanCanvas = document.getElementById('btn-clean-canvas')
    var color_select = document.getElementById('colors');
    var size_select = document.getElementById('sizes');
    var color_default = color_select.value;
    var size_default = size_select.value;

    if (!canvas) {
      alert('Ошибка! Canvas элемент не найден!');
      return;
    }

    if (!canvas.getContext) {
      alert('Ошибка: canvas.getContext не существует!');
      return;
    }

    // Получаем 2D canvas context. set default
    context = canvas.getContext('2d');
    context.lineWidth = size_default;
    context.strokeStyle = color_default;
    context.lineCap = 'round';

    tool = new tool_pencil();
    console.log(context)
    color_select.addEventListener('change', ev_color_change, false);
    size_select.addEventListener('change', ev_size_change, false);

    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);

    document.getElementById('clean-canvas').addEventListener('click', function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }, false);
  }

  function ev_color_change() {
    context.strokeStyle = this.value;
  }

  function ev_size_change() {
    context.lineWidth = this.value;
  }

  // Здесь мы будем ловить движения мыши
  function tool_pencil() {
    var tool = this;
    var points = []

    this.started = false;

    this.mousedown = function (ev) {
      context.beginPath();
      context.moveTo(ev._x, ev._y);
      tool.started = true;
    };

    // Эта функция вызывается каждый раз, когда вы перемещаете мышь.
    // Но рисование происходит только когда вы удерживаете кнопку мыши
    // нажатой.
    this.mousemove = function (ev) {
      if (tool.started) {
        console.log()
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };

        // Событие при отпускании мыши
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
  }

    // Эта функция определяет позицию курсора относительно холста
  function ev_canvas(ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Вызываем обработчик события tool
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  init();

}, false); }
