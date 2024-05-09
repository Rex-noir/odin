import { BinaryTree } from "./Binary Tree/binarysearchtree.js";
function randomNumber(max, min) {
  if (max) return Math.round(Math.random() * max);
  if (min) return Math.round(Math.random() * (1 - min) + min);
  else return Math.random();
}
let array = [];
let i = 0;
while (i < 100) {
  array.push(randomNumber(100));
  i++;
}
const tree = new BinaryTree(array);
// console.log(tree.find(tree._root.right));
tree.rebalance();
tree.printTree();
console.log(`Is Balanced : ${tree.isBalanced()}`);

console.log(`Level Order : ${tree.levelOrder()}`);
console.log(`PreOrder : ${tree.preOrder()}`);
console.log(`PostOrder : ${tree.postOrder()}`);
console.log(`InOrder : ${tree.inOrder()}`);

let j = 0;
while (j < 100) {
  tree.insert(randomNumber(false, 100));
  j++;
}

console.log("\n");
console.log(`Is Balanced : ${tree.isBalanced()}`);
tree.printTree();
tree.rebalance();
console.log("\n");
console.log(`Is Balanced : ${tree.isBalanced()}`);

console.log(`Level Order : ${tree.levelOrder()}`);
console.log(`PreOrder : ${tree.preOrder()}`);
console.log(`PostOrder : ${tree.postOrder()}`);
console.log(`InOrder : ${tree.inOrder()}`);
tree.printTree();
