import { LinkedList } from "../linkedlist.js";

export class HashMap {
  constructor() {
    this._capacity = 16;
    this._map = new Array(this._capacity);
    this._loadfactor = 0.75;
  }
  //generate a hash code
  hash(key, capacity) {
    let hashcode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashcode = primeNumber * hashcode + key.charCodeAt(i);
      hashcode %= capacity;
    }
    return hashcode;
  }
  //set a key
  set(key, value) {
    let hashcode = this.hash(key, this._capacity);
    let bucket = this._map[hashcode];

    if (!bucket) {
      this._map[hashcode] = new LinkedList();
      bucket = this._map[hashcode];
    }

    const node = this.has(key, true);
    if (node) {
      node.setValue(value);
    } else {
      bucket.append(key, value);
    }

    this.checkMapSize();
  }
  //remove the key from the entry
  remove(key) {
    let bucket = this._map[this.hash(key, this._capacity)];
    if (bucket) {
      const index = bucket.find(key);
      if (index !== false) {
        bucket.removeAt(index);
        return true;
      }
    }
    return false;
  }
  //check if the hash map have the key
  has(key, getNode) {
    const bucket = this._map[this.hash(key, this._capacity)];
    const index = bucket.find(key);
    if (index !== false) {
      const node = bucket.at(index);
      if (getNode) {
        return node;
      }
      return true;
    }
    return false;
  }
  //get the key
  get(key) {
    const node = this.has(key, true);
    if (node) {
      return node.getValue();
    }
    return undefined;
  }
  //checkActiveBuckets
  _getActiveBuckets() {
    let active = 0;
    for (let i = 0; i < this._map.length; i++) {
      if (this._map[i]) {
        active++;
      }
    }
    return active;
  }
  //check the map size
  checkMapSize() {
    if (this._getActiveBuckets() / this._capacity > this._loadfactor) {
      this.resize();
    }
  }
  //returns all the values
  values() {
    return this.loopOver(false, true, false);
  }
  //return all the keys
  keys() {
    return this.loopOver(true, false, false);
  }
  //return all entries
  entries() {
    return this.loopOver(false, false, true);
  }
  //loop over and return the corresponding keys
  loopOver(key, value, entry) {
    let keys = [];
    let values = [];
    let entries = [];

    for (let bucket of this._map) {
      if (bucket) {
        let length = bucket.size();
        for (let i = 0; i < length; i++) {
          let node = bucket.at(i);

          if (value) values.push(node.getValue());
          if (key) keys.push(node.getKey());
          if (entry) entries.push([node.getKey(), node.getValue()]);
        }
      }
    }
    if (key) return keys;
    else if (value) return values;
    else if (entry) return entries;
  }
  //return the length
  length() {
    return this._getActiveBuckets();
  }
  //clear the hashmap
  clear() {
    const newMap = new Array(this.capacity);
    this._map = newMap;
  }
  //resize the map
  resize() {
    const new_capactiy = this._capacity * 2;
    const newMap = new Array(new_capactiy);

    for (const bucket of this._map) {
      if (bucket) {
        const length = bucket.size();
        for (let i = 0; i < length; i++) {
          let node = bucket.at(i);
          let newIndex = this.hash(node.getKey(), new_capactiy);
          if (!newMap[newIndex]) newMap[newIndex] = new LinkedList();
          newMap[newIndex].append(node.getKey(), node.getValue());
        }
      }
    }
    this._map = newMap;
    this.capacity = new_capactiy;
  }
}
