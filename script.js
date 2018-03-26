var cpu = new chip8();
cpu.initialize();

var c = document.getElementByID("display");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(128,64);
ctx.stroke();

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    var reader = new FileReader();

    var xhr = new XMLHttpRequest;
    xhr.open("GET", "PONG", true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
       var program = new Uint8Array(xhr.response);
       cpu.loadProgram(program);
    };

    xhr.send();

  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'link'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
