var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');


function setup () {
  context.width = 400;
  context.height = 400;
}

function draw () {

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw)
