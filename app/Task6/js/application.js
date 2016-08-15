window.onload = function() {
  var buttonProgressBar = document.getElementById('progress-bar-button');
  buttonProgressBar.onclick = function() {
    move();
  };

  function move() {
    var elem = document.getElementById("progress");
    var width = 0;
    var id = setInterval(frame, 250);
    var textStatus = document.getElementsByClassName('text-status')[0];

    buttonProgressBar.disabled = true;

    function frame() {
      if (width >= 100) {
        textStatus.innerHTML = 'All finished!';
        buttonProgressBar.disabled = false;
        clearInterval(id);
      } else {
        width += 5;
        elem.style.width = width + '%';
        textStatus.innerHTML =  width + '% completed...';
      }
    }
  }
}
