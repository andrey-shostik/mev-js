window.onload = function() {
  gmapWindow = document.getElementById('gmap-window');

  document.getElementById('show-map').addEventListener("click", function(event) {
    modalWindow.show([600]);
    showMap('gmap');
  });

  document.getElementById('open-map').addEventListener("click", function(event) {
    gmapWindow.style.display = 'block';
    showMap('map');
  });

  document.getElementById('close-window').addEventListener("click", function(event) {
    gmapWindow.style.display = 'none';
  });

  function showMap(mapId) {
    var myLatlng = new google.maps.LatLng(49.4481811,32.0483866);
    var myOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById(mapId), myOptions);
    var myLatlng = new google.maps.LatLng(49.4481811,32.0483866);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Тайтл",
    });
  }

  var modalWindow = {
    block: null,
    win: null,

  initBlock: function() {
        block = document.getElementById('blockscreen'); //Получаем наш блокирующий фон по ID

        //Если он не определен, то создадим его
        if (!block) {
            var parent = document.getElementsByTagName('body')[0]; //Получим первый элемент тега body
            var obj = parent.firstChild; //Для того, чтобы вставить наш блокирующий фон в самое начало тега body
            block = document.createElement('div'); //Создаем элемент div
            block.id = 'blockscreen'; //Присваиваем ему наш ID
            parent.insertBefore(block, obj); //Вставляем в начало
            block.onclick = function() { modalWindow.close(); } //Добавим обработчик события по нажатию на блокирующий экран - закрыть модальное окно.
        }
        block.style.display = 'inline'; //Установим CSS-свойство
    },

  initWin: function(width) {
        win = document.getElementById('modalwindow'); //Получаем наше диалоговое окно по ID

        //Если оно не определено, то также создадим его по аналогии
        if (!win) {
            var parent = document.getElementsByTagName('body')[0];
            var obj = parent.firstChild;
            win = document.createElement('div');
            win.id = 'modalwindow';
            win.style.padding = '0 0 5px 0';
            parent.insertBefore(win, obj);
        }
        win.style.width = width + 'px'; //Установим ширину окна
        win.style.display = 'inline'; //Зададим CSS-свойство


        //Установим позицию по центру экрана
        win.style.left = '50%'; //Позиция по горизонтали
        win.style.top = '50%'; //Позиция по вертикали

        //Выравнивание по центру путем задания отрицательных отступов
        win.style.marginTop = -(win.offsetHeight / 2) + 'px';
        win.style.marginLeft = -(width / 2) + 'px';

        map = document.getElementById('gmap')
        map.style.height = width - 12;
        map.style.width = width - 12;

        gmapWindow.style.display = 'none';
    },

    close: function() {
      document.getElementById('blockscreen').style.display = 'none';
      document.getElementById('modalwindow').style.display = 'none';
    },

    show: function(width) {
      modalWindow.initBlock();
      modalWindow.initWin(width);
    }
  }

  document.getElementById('gmap-header').onmousedown = function(e) {
    var coords = getCoords(gmapWindow);

    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    gmapWindow.style.position = 'absolute';
    gmapWindow.style.zIndex = 1000;

    moveAt(e)

    function moveAt(e) {
      gmapWindow.style.left = e.pageX - shiftX + 'px';
      gmapWindow.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
      moveAt(e);
    }

    gmapWindow.onmouseup = function() {
      document.onmousemove = null;
      gmapWindow.onmouseup = null;
    }

    gmapWindow.ondragstart = function() {
      return false;
    };
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
 }
}
