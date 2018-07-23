
// to traverse the binary search tree
Node.prototype.visit = function () {
  if (this.left != null) {
    this.left.visit();
  }
  console.log(this.value);
  if (this.right != null) {
    this.right.visit();
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
    } else {
      this.left.addNode(n);
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n)
    }
  }
}

// constructor function for the node

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}
