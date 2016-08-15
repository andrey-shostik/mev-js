window.onload = function() {
  var block = document.getElementById("img-container"); // Получаем основной блок
  var img = document.getElementsByClassName('resize-img')[0];

  document.onmouseup = clearXY; // Ставим обработку на отпускание кнопки мыши

  document.getElementsByClassName('show-img')[0].onclick = function () {
    resizeE = document.getElementsByClassName('resize-handle-e')[0];
    resizeN = document.getElementsByClassName('resize-handle-n')[0];
    resizeS = document.getElementsByClassName('resize-handle-s')[0];
    resizeW = document.getElementsByClassName('resize-handle-w')[0];

    block.style.display = 'block';
    block.style.top = Math.ceil(clientHeight() / 4) + 'px';
    block.style.height = img.height;
    block.style.width = img.width;
    block.style.left = Math.ceil(clientWidth() / 2) - Math.ceil(img.width / 2) + 'px';
    changeResizersPosition();
  }

  block.onmousedown = function(event) {
    var target = event.target; // где был клик?

    if (target.classList[0] == 'resize-handle') {
      var resizeHandle = target;
      chooseResize(resizeHandle);
    }
  };

  /* Функция для получения текущих координат курсора мыши */
  function getXY(obj_event) {
    if (obj_event) {
      x = obj_event.pageX;
      y = obj_event.pageY;
    }
    else {
      x = window.event.clientX;
      y = window.event.clientY;
    }
    return new Array(x, y);
  }

  function chooseResize(obj_event) {
    var count = obj_event.classList[1].length
    var resizeElem = obj_event.classList[1];
    var elem = resizeElem[count - 2] + resizeElem[count - 1];

    if (resizeElem[count - 2] == '-') {
      var elem = resizeElem[count - 1];
    } else {
      var elem = resizeElem[count - 2] + resizeElem[count - 1];
    }

    switch (elem) {
      case 'se':
        document.onmousedown = moveResizerSE;
        break;
      case 'ne':
        document.onmousedown = moveResizerNE;
        break;
      case 'nw':
        document.onmousedown = moveResizerNW;
        break;
      case 'sw':
        document.onmousedown = moveResizerSW;
        break;
      case 'e':
        document.onmousedown = moveResizerE;
        break;
      case 'n':
        document.onmousedown = moveResizerN;
        break;
      case 's':
        document.onmousedown = moveResizerS;
        break;
      case 'w':
        document.onmousedown = moveResizerW;
        break;
    }
  }

  function moveResizerN(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top);

        var y = blockTop - point[1];

        if ( !(img.height <= 100 && y <= 0) ) {
          img.style.height =  img.height + y + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.top =  parseInt(block.style.top) - y;
          block.style.left = parseInt(block.style.left) - y;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerS(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top)  + parseInt(block.style.height);

        var y = blockTop - point[1];

        if ( !(img.height <= 100 && y >= 0) ) {
          img.style.height =  img.height - y + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.left = parseInt(block.style.left) + y;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerW(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockLeft = parseInt(block.style.left);

        var x = blockLeft - point[0];

        if ( !(img.height <= 100 && x <= 0) ) {
          img.style.height =  img.height + x + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.top =  parseInt(block.style.top) - x;
          block.style.left = parseInt(block.style.left) - x;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerE(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockLeft = parseInt(block.style.left) + parseInt(block.style.width);

        var x = blockLeft - point[0];

        if ( !(img.height <= 100 && x >= 0) ) {
          img.style.height =  img.height - x + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerSW(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top) + parseInt(block.style.height);
        var blockLeft = parseInt(block.style.left);

        var y = blockTop - point[1];
        var x = blockLeft - point[0];
        var cord = (-y + x) / 2;

        if ( !(img.height <= 100 && cord <= 0) ) {
          img.style.height =  img.height + cord + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.left = parseInt(block.style.left) - cord;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerNE(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top);
        var blockLeft = parseInt(block.style.left)  + parseInt(block.style.width);

        var y = blockTop - point[1];
        var x = blockLeft - point[0];
        var cord = (-y + x) / 2;

        if ( !(img.height <= 100 && cord >= 0) ) {
          img.style.height =  img.height - cord + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.top = parseInt(block.style.top) + cord;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerNW(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top);
        var blockLeft = parseInt(block.style.left);

        var y = blockTop - point[1];
        var x = blockLeft - point[0];

        cord = (y + x) / 2;

        if ( !(img.height <= 100 && cord <= 0) ) {
          img.style.height =  img.height + cord + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          block.style.top =  parseInt(block.style.top) - cord;
          block.style.left = parseInt(block.style.left) - cord;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function moveResizerSE(obj_event) {
    saveWH(obj_event);

    if (obj_event.srcElement.classList[0] == 'resize-handle') {
      document.onmousemove = function (obj_event) {
        var point = getXY(obj_event);
        var blockTop = parseInt(block.style.top) + parseInt(block.style.height);
        var blockLeft = parseInt(block.style.left) + parseInt(block.style.width);

        var y = blockTop - point[1];
        var x = blockLeft - point[0];

        cord = (y + x) / 2;

        if ( !(img.height <= 100 && cord >= 0) ) {
          img.style.height =  img.height - cord + "px";
          block.style.width = img.width;
          block.style.height = img.style.height;
          changeResizersPosition()
        }
      }
    return false;
    }
  }

  function saveWH(obj_event) {
    var point = getXY(obj_event);
    w_block = block.clientWidth; // Текущая ширина блока
    h_block = block.clientHeight; // Текущая высота блока
    delta_w = w_block - point[0]; // Измеряем текущую разницу между шириной и x-координатой мыши
    delta_h = h_block - point[1]; // Измеряем текущую разницу между высотой и y-координатой мыши
  }

  function changeResizersPosition() {
    resizeS.style.left = Math.ceil(img.width / 2) + 'px';
    resizeN.style.left = Math.ceil(img.width / 2) + 'px';

    resizeE.style.top = Math.ceil(img.height / 2) + 'px';
    resizeW.style.top = Math.ceil(img.height / 2) + 'px';
  }

  /* Функция для измерения ширины окна */
  function clientWidth() {
    return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
  }

  /* Функция для измерения высоты окна */
  function clientHeight() {
    return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
  }

  /* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
  function clearXY() {
    document.onmousemove = null;
  }
}
