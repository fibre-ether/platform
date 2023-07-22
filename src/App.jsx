import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stats, CameraControls } from '@react-three/drei';
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
  const direction = {
    0: [1, 0],
    1: [-1, 0],
    2: [0, 1],
    3: [0, -1],
  };
  const cameraControlsRef = useRef();
  const [neighbors, setNeighbors] = useState({
    '0,0': [0, 0, 0, 0],
  });
  const [ghosts, setGhosts] = useState([0, 0, 0, 0]);
  const [isAnyTileClicked, setIsAnyTileClicked] = useState({ is: false, tile: null });
  const [latestTiles, setLatestTiles] = useState([
    [0, 0],
    [0, 1],
  ]);

  useEffect(() => {
    const position = [
      3 * latestTiles[1][0] - 2 * latestTiles[0][0],
      1 * cameraConfig.positionOffset,
      3 * latestTiles[1][1] - 2 * latestTiles[0][1],
    ];
    const lookAt = [latestTiles[0][0], 0, latestTiles[0][1]];
    cameraControlsRef.current?.setLookAt(...position, ...lookAt, true);
  }, [latestTiles]);

  const showGhosts = helper_showGhosts({ setGhosts, direction, neighbors });

  const hideGhosts = () => helper_hideGhosts({ setGhosts });

  const ghostToggle = helper_ghostToggle({ isAnyTileClicked, setIsAnyTileClicked, hideGhosts, showGhosts });

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
      <CameraControls ref={cameraControlsRef} enabled />
      {Object.keys(neighbors).map((id, key) => {
        return <Tile {...{ id, ghostToggle }} key={key} />;
      })}
      {ghosts.map((position, key) => {
        return position ? <Ghost onGhostClick={resurrectGhosts} position={position} key={key} /> : null;
      })}
    </>
  );
}

export default App;
