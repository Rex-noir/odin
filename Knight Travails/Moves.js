export default class Moves {
  constructor(boardManager) {
    this.boardManager = boardManager;
  }
  possibleMoves(initialPostition) {
    const [positionX, positionY] = initialPostition;
    if (!this.boardManager.isValid(positionX, positionY)) {
      return "Invalid Initial Postition";
    }
    let moves = [];
    for (const moveOffset of this.movesOffsets) {
      if (
        this.boardManager.isValid(
          positionX + moveOffset.dx,
          positionY + moveOffset.dy
        )
      ) {
        moves.push(
          this.boardManager.board[positionX + moveOffset.dx][
            positionY + moveOffset.dy
          ].value
        );
      }
    }
    return moves;
  }
  get movesOffsets() {
    return [
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: 1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: 2 },
      { dx: -1, dy: -2 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 },
    ];
  }
}
