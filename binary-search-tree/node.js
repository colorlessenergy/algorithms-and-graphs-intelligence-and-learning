
// to traverse the binary search tree
Node.prototype.visit = function (parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  //  text with the current number in the binary search tree
  ctx.fillStyle = "white";
  ctx.fillText(this.value, this.x, this.y)
  ctx.strokeStyle = "white";

  // draws a ellipse where the number is
  ctx.beginPath();
  ctx.ellipse(this.x, this.y, 10, 10, 90 * Math.PI / 180, 0, 2 * Math.PI)
  ctx.stroke();
  ctx.closePath();
  
  // draws a line connecting the root to the other numbers it is connected with
  ctx.beginPath();
  ctx.moveTo(parent.x, parent.y);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
  
  if (this.right != null) {
    this.right.visit(this);
  }
}

// search the binary search tree
// recursively checks the tree by checking if the value equals
// the value that is wanted

Node.prototype.search = function (val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
   return  this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

// adds a new node to the binary search tree
// adds a node to the left if the value is smaller than the current value 
// otherwise if it is bigger than the current value it adds it to the right
  // if the value of the node is null make that node the new value otherwise recall the
  //  function with the new node that is trying to be added
  Node.prototype.addNode = function (n) {
  if ( n.value < this.value) {
    if ( this.left === null) {
      this.left = n;
      this.left.x = this.x - 50;
      this.left.y = this.y + 20;
    } else {
      this.left.addNode(n);
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + 50;
      this.right.y = this.y + 20;
    } else {
      this.right.addNode(n)
    }
  }
}

// constructor function for the node

function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
}
