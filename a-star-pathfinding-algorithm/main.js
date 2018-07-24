// a * path finding algorithm

// heuristics: could be described
// as a educated guess

// formula: f(n) = g(n) + h(n)

// g = cost of distance from begin to end
// h = heuristics
// h = how long it takes to get to end

function removeFromArray(arr, elt) {
  for (let i = arr.length-1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1)
    }
  }
}

function heuristic (a, b) {
  // Euclidean distance
  // https://www.cut-the-knot.org/pythagoras/DistanceFormula.shtml
  // √(x - a)² + (y - b)²
  // var d = Math.sqrt(Math.pow((a.i - a.j), 2) + Math.pow((b.i - b.j), 2))

  // manhattan / taxi distance

  var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  return d;
}



var canvas;
var ctx;

var cols = 25;
var rows = 25;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;

var w, h;
var path = [];
var once = true;

function Spot(i, j) {
  this.i = i;
  this.j = j;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];
  this.previous = undefined;

  this.wall = false;

  // 30 percent chance to be a wall
  if (Math.random() < 0.3) {
    this.wall = true;
  }

  this.show = function (col) {
    ctx.fillStyle = col;
    if (this.wall) {
      ctx.fillStyle = "black";
    }

    ctx.fillRect(this.i*w, this.j*h, w-1, h-1);
  }

  this.addNeighbors = function (grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols-1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    } 
    if (j < rows -1) {
      this.neighbors.push(grid[i][j + 1]);
    } 
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }

    if (i < cols-1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }

    if (i > 0 && j < rows-1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }

    if (i < cols-1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
    
  }
}

function setup() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;

  w = canvas.width / cols;
  h = canvas.height / rows;

  // Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  start.wall = false;
  end.wall = false;

  openSet.push(start)

  console.log(grid)

}

function draw () {
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    if (current === end) {

      // to stop the animation
      window.cancelAnimationFrame(draw);
      // find the path;
      console.log('DONE!')
    }

    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        var newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor)
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

    // we can keep checking
  } else {
    console.log('no solution');
    window.cancelAnimationFrame(draw)
    return;
    // no solution
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // for debugging
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show("#fff");
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show("red");
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show("green");
  }

  path = [];
  var temp = current;
  path.push(temp);

  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show('blue')
  }


  // to draw a line for the path


  // ctx.beginPath();
  // if (once) {
  //   ctx.moveTo(0, 0);
  //   once =false;
  // }
  // for (let i = 0; i < path.length; i++) {
  //   ctx.lineTo(path[i].i * w + w/2, path[i].j * h + h/2);
  //   ctx.stroke();
  // }
  // ctx.closePath();


  if (current !== end) {
    window.requestAnimationFrame(draw)
  }
}

setup();

window.requestAnimationFrame(draw)