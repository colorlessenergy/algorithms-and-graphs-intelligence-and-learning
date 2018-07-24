// constructor function
function Cell(i, j) {
  // col # row #
  this.i = i;
  this.j = j;
  // first start every wall is true
  // top right bottom left
  // only show walls if it is true
  this.walls = [true, true, true, true];

  // boolean for the cell to not be visited more than once
  this.visited = false;

  // get all the neighbor surrounding the "rect"

  this.checkNeighbors = function () {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)]
    var bottom = grid[index(i, j + 1)]
    var left = grid[index(i - 1, j)]

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = Math.floor(Math.random() * neighbors.length);

      return neighbors[r];
    } else {
      return undefined;
    }

  };

  // highlight where the current step of the maze
  this.highlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    context.fillStyle = "green";
    context.fillRect(x, y, w, w);
  }

  // generate the walls

  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    context.strokeStyle = "white";

    if (this.walls[0]) {
      // top line
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + w, y);
      context.stroke();
      context.closePath();
    }
    if (this.walls[1]) {
      // right line
      context.beginPath();
      context.moveTo(x + w, y);
      context.lineTo(x + w, y + w);
      context.stroke();
      context.closePath();
    }
    if (this.walls[2]) {
      //bottom line
      context.beginPath();
      context.moveTo(x + w, y + w);
      context.lineTo(x, y + w);
      context.stroke();
      context.closePath();
    }
    if (this.walls[3]) {
      // left line
      context.beginPath();
      context.moveTo(x, y + w);
      context.lineTo(x, y);
      context.stroke();
      context.closePath();
    }

    // rectangle
    if (this.visited) {
      context.fillStyle = "purple"
      context.fillRect(x, y, w, w);
    }
  }
}