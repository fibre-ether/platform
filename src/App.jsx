import { Canvas } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  Stats,
  CameraControls,
} from '@react-three/drei';
import Tile from './components/Tile';
import { useRef, useState } from 'react';
import Ghost from './components/Ghost';
import {
  helper_ghostToggle,
  helper_hideGhosts,
  helper_resurrectGhosts,
  helper_showGhosts,
} from './helpers/ghost-functions';
import { Controls } from './helpers/controls';
import {
  resetNeighbors,
  getFirstTimeNeighbors,
} from './helpers/database-functions';
import { defaultLatestTiles, defaultNeighbors } from './config/defaults';
import { direction } from './config/defaults';
import useFirebase from './hooks/useFirebase';
import useGameCamera from './hooks/useGameCamera';

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
  /* TODO: add a loader to wait for the above boolean to be true*/
  const [neighbors, setNeighbors] = useState(defaultNeighbors);
  /* TODO: change name to board everywhere */
  const [ghosts, setGhosts] = useState([0, 0, 0, 0]);
  const [isAnyTileClicked, setIsAnyTileClicked] = useState({
    is: false,
    tile: null,
  });
  const [latestTiles, setLatestTiles] = useState(defaultLatestTiles);
  const [
    { tileColor, wallColor, ghostColor, ghostTransparency, reset },
    setControls,
  ] = Controls();

  /* EFFECTS */
  useGameCamera({
    reset,
    resetNeighbors,
    setControls,
    latestTiles,
    cameraControlsRef,
  });
  useFirebase({ getFirstTimeNeighbors, setNeighbors, neighbors });

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
      {/* make all wall tiles a single mesh to remove all the event handlers  */}
      {neighbors?.map((row, rowKey) => {
        return (
          <mesh key={rowKey}>
            {row.map((item, colKey) => {
              return item.fill ? (
                <Tile
                  {...{
                    type: item.type,
                    coords: [rowKey, colKey],
                    ghostToggle,
                    colors: { tile: tileColor, wall: wallColor },
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
