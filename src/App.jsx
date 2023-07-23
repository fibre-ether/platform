import { Canvas } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  Stats,
  CameraControls,
} from '@react-three/drei';
import Tile from './components/Tile';
import { useEffect, useRef, useState } from 'react';
import Ghost from './components/Ghost';
import { cameraConfig } from './config/camera-config';
import {
  helper_ghostToggle,
  helper_hideGhosts,
  helper_resurrectGhosts,
  helper_showGhosts,
} from './helpers/ghost-functions';
import { Controls } from './helpers/controls';
import { onValue, ref, set } from 'firebase/database';
import { NEIGHBORS, database } from './config/firebase';
import {
  deleteAllNeighbors,
  getFirstTimeNeighbors,
} from './helpers/database-functions';
import { defaultLatestTiles, defaultNeighbors } from './config/defaults';
import { direction } from './config/defaults';

function App() {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <Environment preset="apartment" />
      <Scene />
      <PerspectiveCamera position={[0, 2, 2]} makeDefault />
      <Stats />
    </Canvas>
  );
}

function Scene() {
  /* STATE */
  const cameraControlsRef = useRef();
  const [isfirstTimeDataFetched, setIsfirstTimeDataFetched] = useState(false);
  /* TODO: add a loader to wait for the above boolean to be true*/
  const [neighbors, setNeighbors] = useState(defaultNeighbors);
  /* TODO: change name to board everywhere */
  const [ghosts, setGhosts] = useState([0, 0, 0, 0]);
  const [isAnyTileClicked, setIsAnyTileClicked] = useState({
    is: false,
    tile: null,
  });
  const [latestTiles, setLatestTiles] = useState(defaultLatestTiles);
  const [{ tileColor, ghostColor, ghostTransparency, reset }, setControls] =
    Controls();

  /* EFFECTS */
  useEffect(() => {
    /* TODO: when reset is triggered, also reset all players' cameras */
    if (reset) {
      deleteAllNeighbors({ setControls });
    }
    /* eslint-disable-next-line */
  }, [reset]);

  useEffect(() => {
    const position = [
      3 * latestTiles[1][0] - 2 * latestTiles[0][0],
      1 * cameraConfig.positionOffset,
      3 * latestTiles[1][1] - 2 * latestTiles[0][1],
    ];
    const lookAt = [latestTiles[0][0], 0, latestTiles[0][1]];
    cameraControlsRef.current?.setLookAt(...position, ...lookAt, true);
  }, [latestTiles]);

  // useEffect(() => {
  //   getFirstTimeNeighbors({ setIsfirstTimeDataFetched, setNeighbors });
  //   const neighborsRef = ref(database, NEIGHBORS);
  //   return onValue(neighborsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     // console.log(data);
  //     setNeighbors(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (isfirstTimeDataFetched) {
  //     set(ref(database, NEIGHBORS), neighbors);
  //     console.log('setting neighbors');
  //   }
  // }, [neighbors, isfirstTimeDataFetched]);

  /* HELPER FUNCTIONS */
  /* TODO: create interface to pass all required states to ghost functions and return all required curried functions */
  const showGhosts = helper_showGhosts({ setGhosts, direction, neighbors });

  const hideGhosts = () => helper_hideGhosts({ setGhosts });

  const ghostToggle = helper_ghostToggle({
    isAnyTileClicked,
    setIsAnyTileClicked,
    hideGhosts,
    showGhosts,
  });

  const resurrectGhosts = helper_resurrectGhosts({
    ghostToggle,
    setLatestTiles,
    setNeighbors,
    direction,
    neighbors,
    isAnyTileClicked,
  });

  return (
    <>
      <CameraControls ref={cameraControlsRef} enabled zoom={false} />
      {neighbors.map((row, rowKey) => {
        return (
          <mesh key={rowKey}>
            {row.map((item, colKey) => {
              return item === 1 ? (
                <Tile
                  {...{
                    coords: [rowKey, colKey],
                    ghostToggle,
                    color: tileColor,
                  }}
                  key={colKey}
                />
              ) : null;
            })}
          </mesh>
        );
      })}
      {ghosts.map((position, key) => {
        return position ? (
          <Ghost
            {...{
              onGhostClick: resurrectGhosts,
              position,
              color: ghostColor,
              transparency: ghostTransparency,
            }}
            key={key}
          />
        ) : null;
      })}
    </>
  );
}

export default App;
