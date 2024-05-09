export class BinaryTree {
  constructor(arr) {
    this._root = this.buildTree(arr);
  }
  buildTree(arr) {
    let rootNode;
    for (let element of arr) {
      if (!rootNode) {
        rootNode = new Node(element);
      } else {
        let newnode = new Node(element);
        this.insertNode(rootNode, newnode);
      }
    }
    return rootNode;
  }
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.leftNode(newNode);
      else if (node.value !== newNode.value) {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (node.right === null) node.rightNode(newNode);
      else if (node.value !== newNode.value)
        this.insertNode(node.right, newNode);
    }
  }
  printTree(node = this._root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value) {
    this.insertNode(this._root, new Node(value));
  }
  find(value) {
    let result = this.traverse(value);
    return result ? result : null;
  }
  deleteItem(value) {
    let parentNode = this.traverse(value, true);
    let node = this.traverse(value);
    if (node) {
      if (node.left || node.right) withChild();
      else {
        if (node.value > parentNode.value) parentNode.rightNode(null);
        if (node.value < parentNode.value) parentNode.leftNode(null);
      }
    }
    function withChild() {
      if (node.right) parentNode.rightNode(node.right);
      if (node.left) parentNode.leftNode(node.left);
    }
  }
  levelOrder(callback, node = this._root) {
    let array = [];
    let queue = [];

    queue.push(node);

    while (queue.length > 0) {
      let current = queue.shift();
      array.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    if (callback) {
      return callback(array);
    }
    return array;
  }
  levelOrderR(callback, queue = [this._root]) {
    let array = [];
    if (queue.length == 0) {
      return array;
    }
    while (queue.length > 0) {
      let current = queue.shift();
      array.push(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) queue.push(current.right);
    }
    this.levelOrderR(false, queue);
    return array;
  }
  inOrder(callback) {
    let array = [];
    let node = this._root;
    function traverse(node) {
      if (node) {
        traverse(node.left);
        array.push(node.value);
        traverse(node.right);
      } else return;
    }
    traverse(node);
    if (callback) return callback(array);
    return array;
  }
  preOrder(callback) {
    let array = [];
    let node = this._root;
    function traverse(node) {
      if (node) {
        array.push(node.value);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(node);
    if (callback) return callback(array);
    return array;
  }
  postOrder(callback) {
    let array = [];
    let node = this._root;
    function traverse(node) {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        array.push(node.value);
      }
    }
    traverse(node);
    if (callback) return callback(array);
    return array;
  }
  height(node) {
    let rightNumber = 0;
    let leftNumber = 0;
    function traverseRight(node) {
      if (node) {
        traverseRight(node.right);
        rightNumber++;
      }
    }
    function traverseLeft(node) {
      if (node) {
        traverseLeft(node.left);
        leftNumber++;
      }
    }
    traverseRight(node.right);
    traverseLeft(node.left);
    return Math.max(rightNumber, leftNumber);
  }
  depth(node) {
    let depth = 0;
    let predecessor = node;
    if (!predecessor) return 0;
    while (predecessor !== this._root) {
      predecessor = this.traverse(predecessor.value, true);
      depth++;
    }
    return depth;
  }
  isBalanced() {
    const left = this.height(this._root.left);
    const right = this.height(this._root.right);

    return left === right;
  }
  rebalance() {
    // Helper function to perform inorder traversal and push values to result array
    const inorderTraversal = (node, result) => {
      if (node !== null) {
        inorderTraversal(node.left, result);
        result.push(node.value);
        inorderTraversal(node.right, result);
      }
    };

    // Helper function to build a balanced tree from a sorted array
    const buildBalancedTree = (arr, start, end) => {
      if (start > end) return null;
      const mid = parseInt((start + end) / 2);
      const node = new Node(arr[mid]);
      node.leftNode(buildBalancedTree(arr, start, mid - 1));
      node.rightNode(buildBalancedTree(arr, mid + 1, end));
      return node;
    };

    // Perform inorder traversal to get sorted values
    let result = [];
    inorderTraversal(this._root, result);

    // Sort the array numerically
    result.sort((a, b) => a - b);

    // Build a balanced tree from the sorted array
    this._root = buildBalancedTree(result, 0, result.length - 1);
  }
  traverse(value, parentNode) {
    let predecessor = null;
    let current = this._root;
    while (current !== null && current.value !== value) {
      if (value < current.value) {
        predecessor = current;
        current = current.left;
      } else if (value > current.value) {
        predecessor = current;
        current = current.right;
      } else {
        break;
      }
    }
    if (parentNode) {
      if (current === null) return null;
      return predecessor;
    } else {
      return current;
    }
  }
}
class Node {
  constructor(value = null) {
    this._value = value;
    this._rightNode = null;
    this._leftNode = null;
  }

  rightNode(node) {
    this._rightNode = node;
  }

  leftNode(node) {
    this._leftNode = node;
  }

  get left() {
    return this._leftNode;
  }

  get right() {
    return this._rightNode;
  }

  get value() {
    return this._value;
  }
}
