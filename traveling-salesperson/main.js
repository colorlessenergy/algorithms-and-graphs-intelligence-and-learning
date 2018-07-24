var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var cities = [];

var totalCities = 5;

var order = [];

var totalPermutations;
var count = 0;


var recordDistance;
var bestEver;
let finished = false;

function setup () {
  canvas.width = 400;
  canvas.height = 600;

  for (let i = 0; i < totalCities; i++) {
    cities[i] = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height / 2)
    }
    order[i] = i;
  }

  var d = calcDistance(cities, order);
  recordDistance = d;
  
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);

}

function draw () {

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height)

  // draw points on the canvas
  context.strokeStyle = "white";
  for (let i = 0; i < totalCities; i++) {
    context.beginPath();
    context.lineWidth = 1;
    context.arc(cities[i].x, 
      cities[i].y,
      8, 0, 2*Math.PI);
    context.stroke()
    context.closePath();
  }

  context.translate(0, canvas.height / 2);
  // draw line between the cities
  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(cities[0].x, cities[0].y);
  for (let i = 0; i < order.length; i++) {
    var n = order[i];
    context.lineTo(cities[n].x, cities[n].y)
    context.stroke()
  }
  context.closePath();
  context.setTransform(1, 0, 0, 1, 0, 0);


  // draw the best line
  context.beginPath();
  context.strokeStyle = "purple";
  context.lineWidth = 5;
  context.moveTo(cities[0].x, cities[0].y);
  for (let i = 0; i < order.length; i++) {
    var n = bestEver[i];
    context.lineTo(cities[n].x, cities[n].y)
    context.stroke()
  }
  context.closePath();

  var d = calcDistance(cities, order);

  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
    console.log(recordDistance)
  }

  // var s = '';
  // for (let i = 0; i < order.length; i++) {
  //   s += order[i];
  // }

  context.font = "30px Arial";
  context.fillStyle = "white";
  var percent = 100 * (count / totalPermutations);
  context.fillText(percent.toFixed(2) + " % Completed", 20, canvas.height / 2 - 50);

  nextOrder();

  if (!finished) {
    window.requestAnimationFrame(draw);
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// return total distance between every
// point in the array
function calcDistance(points, order) {
  var sum = 0;
  for (let i = 0; i < order.length-1; i++) {
    var cityAIndex = order[i]
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];

    var d = dist(
      cityA.x,
      cityA.y,
      cityB.x,
      cityB.y
    );

    sum += d;
  }
  return sum;
}

function dist (x1, y1, x2, y2) {
  return Math.sqrt(
    Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)
  )
}


// this is my lexical order algorithm

function nextOrder() {
  count++

  var largestI = -1;

  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }

  if (largestI == -1) {
    console.log('finished');
    finished = true;
    return window.cancelAnimationFrame(draw);
  }

  var largestJ = -1
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ)


  // reverse from largest I + 1 to the end
  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial (n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial(n-1)
}

setup();

window.requestAnimationFrame(draw)
