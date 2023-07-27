/* camera  */
export const CAMERA_HEIGHT = 2
export const DISTANCE_BEHIND_TILE = 5



/* baord */
const BOARD_WIDTH = 51;
const BOARD_HEIGHT = 51;

export const CELL = {
  // empty: 'empty',
  tile: 'tile',
  wall: 'wall',
};

export const boardMiddle = {
  x: Math.floor(BOARD_WIDTH / 2),
  y: Math.floor(BOARD_HEIGHT / 2),
};

export const getTileObject = (type=CELL.tile) => {
  return { type, fill:true };
};

const getEmptySpaceObject = () => {
  return {fill:false}
}

export const convertCoordsToOrigin = (coords) => {
  const newCoords = [coords[0] - boardMiddle.x, coords[1] - boardMiddle.y];
  return newCoords;
};

const emptyBoard = new Array(BOARD_HEIGHT).fill().map(() => {
  return new Array(BOARD_WIDTH).fill(getEmptySpaceObject());
});

// setting starting tile
emptyBoard[boardMiddle.x][boardMiddle.y] = getTileObject();

//setting boundaries
emptyBoard[0] = emptyBoard[0].map(()=>getTileObject(CELL.wall))
emptyBoard[BOARD_WIDTH-1] = emptyBoard[0].map(()=>getTileObject(CELL.wall))

for (let i = 1; i<BOARD_WIDTH-1; i++) {
  emptyBoard[i][0] = getTileObject(CELL.wall)
  emptyBoard[i][BOARD_HEIGHT-1] = getTileObject(CELL.wall)
}

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
