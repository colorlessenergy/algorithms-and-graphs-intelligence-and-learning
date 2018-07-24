var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var vals = [0, 1, 2]
let done = false;

function setup () {
  canvas.width = 400;
  canvas.height = 400;
}

function draw () {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var largestI = -1;

  for (let i = 0; i < vals.length-1; i++) {
    if (vals[i] < vals[i+1]) {
      largestI = i;
    } 
  }

  if (largestI == -1) {
    window.cancelAnimationFrame(draw);
    console.log('finished');
  }

  var largestJ = -1
  for (let j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  swap(vals, largestI, largestJ)


  // reverse from largest I + 1 to the end
  let endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);

  var s = '';
  for (let i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  context.font = "30px Arial";
  context.fillStyle = "white"
  context.fillText(s, 30, canvas.height/2);

  console.log(vals)
  window.requestAnimationFrame(draw);
  
}


function swap (a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

setup();

window.requestAnimationFrame(draw)
