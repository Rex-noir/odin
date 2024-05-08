export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.index = 0;
  }

  append(key, value) {
    const newNode = new Node(key, value);
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

  prepend(key, value) {
    const newNode = new Node(key, value);
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
    return this.head.key;
  }

  getTail() {
    return this.tail.key;
  }

  at(index) {
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp.nextNode;
      if (!temp) return false;
    }
    return temp;
  }

  pop() {
    this.tail = this.tail.prevNode;
    this.tail.nextNode = null;
    this.index--;
  }

  contains(key) {
    let temp = this.head;
    for (let i = 0; i <= this.index; i++) {
      if (!temp) return false;
      if (temp._key == key) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(key) {
    let temp = this.head;
    let index = 0;
    while (temp) {
      if (temp._key === key) {
        return index;
      }
      index++;
      temp = temp.nextNode;
    }
    return false;
  }

  toString() {
    let temp = this.head;
    let result = [];

    for (let i = 0; i <= this.index; i++) {
      if (!temp) {
        result.push("(null)");
      }
      if (temp) {
        result.push(`( ${temp._key} ) ->`);
        temp = temp.nextNode;
      }
    }

    if (!this.head) {
      return "Empty";
    }
    return result.join(" ");
  }

  insertAt(key, value, index) {
    let temp = this.head;
    if (index > this.index || index < 0) {
      this.append(value);
      return;
    }
    if (index == 0) {
      this.prepend(key, value);
      return;
    }
    for (let i = 0; i <= this.index; i++) {
      if (i == index) {
        const node = new Node(key, value);
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
    if (index < 0 || index >= this.size()) {
      throw new Error("Invalid index");
    }
    for (let i = 0; i < index; i++) {
      temp = temp.nextNode;
    }
    temp._key = null;
    temp._value = null;
    if (!temp.nextNode) {
      this.tail = temp;
    } else {
      temp.nextNode.prevNode = temp.prevNode;
    }
    if (!temp.prevNode) {
      this.head = temp;
    } else {
      temp.prevNode.nextNode = temp.nextNode;
    }
    this.index -= 1;
    return;
  }
}
class Node {
  constructor(key, value = null) {
    this._key = key;
    this._value = value;
    this.nextNode = null;
    this.prevNode = null;
  }
  setKey(key) {
    this._key = key;
  }
  getValue() {
    return this._value;
  }
  getKey() {
    return this._key;
  }
  setValue(value) {
    this._value = value;
  }
}
