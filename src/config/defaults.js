const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;

export const boardMiddle = {
  x: Math.floor(BOARD_WIDTH / 2),
  y: Math.floor(BOARD_HEIGHT / 2),
};

export const convertCoordsToOrigin = (coords) => {
  const newCoords = [coords[0]-boardMiddle.x,coords[1]-boardMiddle.y]
  return newCoords
}

// (new Array(60)).fill().map(function(){ return new Array(30).fill(false);})
const emptyBoard = new Array(BOARD_HEIGHT).fill().map(() => {
  return new Array(BOARD_WIDTH).fill(0);
});

emptyBoard[boardMiddle.x][boardMiddle.y] = 1;

export const defaultNeighbors = emptyBoard;

export const defaultLatestTiles = [
  convertCoordsToOrigin([boardMiddle.x, boardMiddle.y]),
  convertCoordsToOrigin([boardMiddle.x, boardMiddle.y + 1]),
];

export const direction = {
  0: [1, 0],
  1: [-1, 0],
  2: [0, 1],
  3: [0, -1],
};
