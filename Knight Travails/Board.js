import Moves from "./Moves.js";

export default class Board {
  constructor() {
    this.board = {};
    this.createBoard();
  }
  addItems(positionX, positiony, value) {
    if (!this.board[positionX]) {
      this.board[positionX] = [];
    }
    this.board[positionX].push({ positionY: positiony, value: value });
  }
  setValue(positionX, positionY, value) {
    if (!this.board[positionX]) {
      return "Postion invalid";
    }
    this.board[positionX][positionY].value = value;
  }
  createBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.addItems(i, j, [i, j]);
      }
    }
  }
  isValid(x, y) {
    if (this.board[x] && this.board[x][y]) {
      return true;
    } else return false;
  }
  getValue(positionX, positionY) {
    if (!positionX) return "Invalid positionX";
    if (!positionY) return "Invalid positionY";
    if (this.board[positionX] && this.board[positionX][positionY]) {
      return this.board[positionX][positionY].value;
    } else return "Invalid position";
  }
  Availability() {
    let available = {};
    for (let posX in this.board) {
      available[posX] = [];
      for (let posY in this.board[posX]) {
        if (this.board[posX][posY].value === null) {
          available[posX].push({ positionY: parseInt(posY), value: null });
        }
      }
    }
    return available;
  }
  shortestPath(initial, destination) {
    let queue = [];
    let visited = new Set();
    queue.push({ position: initial, path: [] });
    while (queue.length > 0) {
      const { position, path } = queue.shift();
      if (isEqual(position, destination)) {
        return [initial].concat([path]);
      }
      let allPossibleMoves = new Moves(this).possibleMoves(position);
      allPossibleMoves.forEach((nextPosition) => {
        if (!visited.has(nextPosition)) {
          visited.add(nextPosition);
          queue.push({ position: nextPosition, path: [...path, nextPosition] });
        }
      });
    }
    function isEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    }
    return null;
  }
}
