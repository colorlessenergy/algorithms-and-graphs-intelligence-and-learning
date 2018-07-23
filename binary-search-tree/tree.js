function Tree () {
  this.root = null;
}

// to explore the binary tree
Tree.prototype.traverse = function () {
  this.root.visit(this.root)
}


Tree.prototype.search = function (val) {
  var found = this.root.search(val);
  return found;
}

Tree.prototype.addValue = function (val) {
  var n = new Node(val);
  // inititalize the root 
  if (this.root == null) {
    this.root = n;
    // make the first node centered and at the top of the canvas
    this.root.x = canvas.width / 2;
    this.root.y = 16;
  } else {
    this.root.addNode(n);
  }

}