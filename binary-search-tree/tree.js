function Tree () {
  this.root = null;
}

// to explore the binary tree
Tree.prototype.traverse = function () {
  this.root.visit()
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
  } else {
    this.root.addNode(n);
  }

}