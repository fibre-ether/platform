const getTileCoords = (id) => {
  return id.split(',').map((coord) => parseInt(coord));
};

const getTileID = (tile) => {
  return `${tile[0]},${tile[1]}`;
};

export const helper_showGhosts =
  ({ setGhosts, direction, neighbors }) =>
  (id) => {
    const tile = getTileCoords(id);
    setGhosts((state) =>
      state.map((item, key) => {
        const newItem = [tile[0] + direction[key][0], tile[1] + direction[key][1]];
        const newItemKey = `${newItem[0]},${newItem[1]}`;
        if (!neighbors[newItemKey]) {
          return newItem;
        }
        return item;
      })
    );
  };

export const helper_hideGhosts = ({ setGhosts }) => {
  setGhosts([0, 0, 0, 0]);
};

export const helper_ghostToggle =
  ({ isAnyTileClicked, setIsAnyTileClicked, hideGhosts, showGhosts }) =>
  (id) => {
    if (isAnyTileClicked.is) {
      setIsAnyTileClicked({ is: false, tile: null });
      hideGhosts();
    } else {
      setIsAnyTileClicked({ is: true, tile: getTileCoords(id) });
      showGhosts(id);
    }
  };

export const helper_resurrectGhosts =
  ({ ghostToggle, setLatestTiles, setNeighbors, direction, neighbors, isAnyTileClicked }) =>
  (tile) => {
    ghostToggle(tile);

    setLatestTiles([tile, isAnyTileClicked.tile]);

    const itemKey = getTileID(tile);
    const defaultNeighbors = [0, 0, 0, 0];
    setNeighbors((state) => ({
      ...state,
      [itemKey]: defaultNeighbors.map((_, key) => {
        const neighborKey = `${tile[0] + direction[key[0]]},${tile[1] + direction[key[1]]}`;
        if (neighbors[neighborKey]) {
          return 1;
        }
        return 0;
      }),
    }));
  };
