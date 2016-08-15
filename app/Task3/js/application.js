var trash = document.getElementsByClassName('trash');

function move(img) {
  img.onmousedown = function(e) {
    moveAt(e)

    img.style.position = 'absolute';
    img.style.zIndex = 1000;

    function moveAt(e) {
      img.style.left = e.pageX - img.offsetWidth / 2 + 'px';
      img.style.top = e.pageY - img.offsetHeight / 2 + 'px';
    }

    document.onmousemove = function(e) {
      moveAt(e);
      event = e;
    }

    img.onmouseup = function() {
      img.onmouseup = null;
      document.onmousemove = null;
      finishDrag(event);
    }

    img.ondragstart = function() {
      return false;
    };

    function finishDrag(e) {
      var dropElem = findDroppable(e);

      if (dropElem) {
        img.remove();
      }
    }

    function findDroppable(event) {
      img.style.display = "none";
      var elem = document.elementFromPoint(event.clientX, event.clientY);
      img.style.display = "block";

      return elem.closest('.trash');
    }
  }
}
