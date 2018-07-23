var tree;

// runs the binary tree.
function setUp() {
  tree = new Tree();

  // gives the binary tree 10 different values from 0 - 10
  for (var i = 0; i < 10; i++) {
    tree.addValue(Math.floor(Math.random() * 100))
  }

  // looks through binary tree
  tree.traverse();

  var result = tree.search(10);

  if (result === null) {
    console.log('not found');
  } else {
    console.log(result)
  }
}

setUp();
