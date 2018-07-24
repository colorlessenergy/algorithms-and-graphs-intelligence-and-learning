// depth first search
// recursive back tracker

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var cols, rows;

var w = 20;
// 1 d array > 2d array
var grid = [];

var current;

var stack = [];

function setup () {

  canvas.width = 400;
  canvas.height = 400;


  cols = Math.floor(canvas.width / w);
  rows = (Math.floor(canvas.height / w));

  // create cell object for every cell in the grid

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0]
}

function draw () {
  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
  
  // step 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // step 2

    stack.push(current);

    // step 3
    removeWalls(current, next)

    // step 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  window.requestAnimationFrame(draw)

}

function index (i, j) {
  // edge cases
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }

  // to locate the cell in the 1d array

  return i + j * cols;
}

// subtraction to find which wall to remove

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }

}

setup();

window.requestAnimationFrame(draw)

