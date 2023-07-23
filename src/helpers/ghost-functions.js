// const getTileCoords = (id) => {
//   return id.split(',').map((coord) => parseInt(coord));
// };

import { convertCoordsToOrigin } from "../config/defaults";


// const getTileID = (tile) => {
//   return `${tile[0]},${tile[1]}`;
// };

export const helper_showGhosts =
  ({ setGhosts, direction, neighbors }) =>
  (coords) => {
    setGhosts((state) =>
      state.map((item, key) => {
        const newItem = [
          coords[0] + direction[key][0],
          coords[1] + direction[key][1],
        ];
        // const newItemKey = `${newItem[0]},${newItem[1]}`;
        // console.log(
        //   `neighbouring element: neighbors[${newItem[0]}][${newItem[0]}] -> ${
        //     neighbors[newItem[0]][newItem[1]]
        //   }`
        // );
        if (!neighbors[newItem[0]][newItem[1]]) {
          // console.log('returning new ghost: ' + String(newItem));
          return newItem;
        }
        // console.log('returning item: ' + item);
        return item;
      })
    );
  };

export const helper_hideGhosts = ({ setGhosts }) => {
  setGhosts([0, 0, 0, 0]);
};

export const helper_ghostToggle =
  ({ isAnyTileClicked, setIsAnyTileClicked, hideGhosts, showGhosts }) =>
  (coords) => {
    /* TODO: make it so that if a tile cannot have anymore ghosts, then isanytileclicked will not be true if that tile is clicked */
    if (isAnyTileClicked.is) {
      setIsAnyTileClicked({ is: false, tile: null });
      hideGhosts();
    } else {
      setIsAnyTileClicked({ is: true, tile: coords });
      showGhosts(coords);
    }
  };

export const helper_resurrectGhosts =
  ({
    ghostToggle,
    setLatestTiles,
    setNeighbors,
    // direction,
    // neighbors,
    isAnyTileClicked,
  }) =>
  (coords) => {
    ghostToggle(coords);

    setLatestTiles([
      convertCoordsToOrigin(coords),
      convertCoordsToOrigin(isAnyTileClicked.tile),
    ]);
    const ghostX = coords[0];
    const ghostY = coords[1];

    setNeighbors((state) => [
      ...state.slice(0, ghostX),
      [...state[ghostX].slice(0, ghostY), 1, ...state[ghostX].slice(ghostY+1)],
      ...state.slice(ghostX + 1),
    ]);
  };
