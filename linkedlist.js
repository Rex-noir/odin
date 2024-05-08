export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.index = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prevNode = this.tail;
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.index++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.index++;
  }

  size() {
    return this.index;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    return this.tail.value;
  }

  at(index) {
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp.nextNode;
      if (!temp) return "Invalid Index";
    }
    return temp.value;
  }

  pop() {
    this.tail = this.tail.prevNode;
    this.tail.nextNode = null;
    this.index--;
  }

  contains(value) {
    let temp = this.head;
    for (let i = 0; i <= this.index; i++) {
      if (!temp) return false;
      if (temp.value == value) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    let temp = this.head;
    let index = 0;
    while (temp) {
      if (temp.value === value) {
        return index;
      }
      index++;
      temp = temp.nextNode;
    }
    return "Not found!";
  }

  toString() {
    let temp = this.head;
    let result = [];

    for (let i = 0; i <= this.index; i++) {
      if (!temp) {
        result.push("(null)");
      }
      if (temp) {
        result.push(`( ${temp.value} ) ->`);
        temp = temp.nextNode;
      }
    }

    if (!this.head) {
      return "Empty";
    }
    return result.join(" ");
  }

  insertAt(value, index) {
    let temp = this.head;
    if (index > this.index || index < 0) {
      this.append(value);
      return;
    }
    if (index == 0) {
      this.prepend(value);
      return;
    }
    for (let i = 0; i <= this.index; i++) {
      if (i == index) {
        const node = new Node(value);
        node.prevNode = temp.prevNode;
        node.nextNode = temp;
        temp.prevNode.nextNode = node;
        temp.prevNode = node;
        this.index++;
      }
      if (!temp) return;
      temp = temp.nextNode;
    }
  }
  removeAt(index) {
    let temp = this.head;

    for (let i = 0; i < this.index; i++) {
      if (i == index) {
        if (!temp.nextNode) {
          this.tail = temp;
        } else {
          temp.nextNode.prevNode = temp.prevNode;
        }
        temp.prevNode.nextNode = temp.nextNode;
        this.index--;
        return;
      }
      if (!temp) return "Invalid index";
      temp = temp.nextNode;
    }
  }
}
class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
    this.prevNode = null;
  }
}
