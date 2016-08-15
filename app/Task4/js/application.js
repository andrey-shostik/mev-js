addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 36:
      changeClassNameActiveSquare();
      break;
    case 40:
      moveDown();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 37:
      moveLeft();
      break;
    case 32:
      space();
      break;
  }
});

function space() {
  active = findActive();
  active.id = 'ext-element';
  activeColor = active.classList[1];

  sleep(1000).then(() => {
    newActive = findActive()

    if (activeColor == 'active-green') {
      changeColor('#76FF03');
    } else {
      changeColor('#F44335');
    }
  })
}

function changeColor(color) {
  active.style.transitionDuration = '0.5s';
  active.style.background = color;

  if (active.classList[1] === undefined) {
    sleep(400).then(() => {
      active.style.transitionDuration = '0s';
      active.style.background = '#FFEB3B';
    })
  }

  sleep(400).then(() => {
    newActive.removeAttribute('style', '');
    newActive.id = '';
  })
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function moveLeft() {
  var activeInner = parseInt(findActive().innerHTML);

  if ([1, 5, 9, 19].indexOf(activeInner) == -1) {
    var activeNext = findSquareByInnerHtml(activeInner - 1);
    changeActiveSquare(activeNext);
  }
}

function moveRight() {
  var activeInner = parseInt(findActive().innerHTML);

  if ([4, 8, 12, 16].indexOf(activeInner) == -1) {
    var activeNext = findSquareByInnerHtml(activeInner + 1);
    changeActiveSquare(activeNext);
  }
}

function moveUp() {
  var activeInner = parseInt(findActive().innerHTML);

  if (activeInner - 4 > 0 ) {
    var activeNext = findSquareByInnerHtml(activeInner - 4);
    changeActiveSquare(activeNext);
  }
}

function moveDown() {
  var activeInner = parseInt(findActive().innerHTML);

  if (activeInner + 4 <= document.getElementsByClassName('square').length) {
    var activeNext = findSquareByInnerHtml(activeInner + 4);
    changeActiveSquare(activeNext);
  }
}

function changeActiveSquare(activeNext) {
    var activeClassList = findActive().classList;
    activeColorName =  activeClassList[1];
    activeClassList.remove(activeClassList[1]);
    activeNext.className = 'square ' + activeColorName;
}

function changeClassNameActiveSquare() {
  active = findActive()

  if (active.classList[1] == "active-green") {
    active.className = 'square active-red';
  } else {
    active.className = 'square active-green';
 }
}

function findSquareByInnerHtml(elem) {
  var elems = document.getElementsByClassName('square');

  for (var i = 0; elems.length > i; i++) {
    if (elems[i].innerHTML == elem.toString()) {
      var activeNext = elems[i];
    }
  }

  return activeNext;
}

function findActive() {
  var active_green = document.getElementsByClassName("active-green");
  var active_red = document.getElementsByClassName("active-red");

  if (active_green.length > 0) {
    return active_green[0];
  } else if (active_red.length > 0) {
    return active_red[0];
  } else {
    return false;
  }
}
