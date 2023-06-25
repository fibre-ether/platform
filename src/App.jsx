import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import Tile from "./components/Tile";
import { useEffect, useState } from "react";
import Ghost from "./components/Ghost";

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <Environment preset="apartment" />
      <Scene />
      <OrthographicCamera position={[5, 5, 5]} zoom={100} makeDefault />
      <OrbitControls maxPolarAngle={Math.PI / 3} minPolarAngle={Math.PI / 4} />
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
  const [neighbors, setNeighbors] = useState({ "0,0": [0, 0, 0, 0] });
  const [ghosts, setGhosts] = useState([0, 0, 0, 0]);
  const [isGhostVisible, setIsGhostVisible] = useState(false);

  // useEffect(() => {
  //   console.log(neighbors);
  // }, [neighbors]);

  function showGhosts(id) {
    const tile = id.split(",").map((coord) => parseInt(coord));
    setGhosts((state) =>
      state.map((item, key) => {
        const newItem = [
          tile[0] + direction[key][0],
          tile[1] + direction[key][1],
        ];
        const newItemKey = `${newItem[0]},${newItem[1]}`;
        if (!neighbors[newItemKey]) {
          return newItem;
        }
        return item;
      })
    );
  }

  function hideGhosts() {
    setGhosts([0, 0, 0, 0]);
  }

  function ghostToggle(id) {
    if (isGhostVisible) {
      setIsGhostVisible(false);
      hideGhosts();
    } else {
      setIsGhostVisible(true);
      showGhosts(id);
    }
  }

  function resurrectGhosts(id) {
    ghostToggle(id);
    const itemKey = `${id[0]},${id[1]}`;
    const defaultNeighbors = [0, 0, 0, 0];
    setNeighbors((state) => ({
      ...state,
      [itemKey]: defaultNeighbors.map((_, key) => {
        const neighborKey = `${id[0] + direction[key[0]]},${
          id[1] + direction[key[1]]
        }`;
        if (neighbors[neighborKey]) {
          return 1;
        }
        return 0;
      }),
    }));
  }

  return (
    <>
      {Object.keys(neighbors).map((id, key) => {
        return <Tile {...{ id, ghostToggle }} key={key} />;
      })}
      {ghosts.map((position, key) => {
        return position ? (
          <Ghost onGhostClick={resurrectGhosts} position={position} key={key} />
        ) : null;
      })}
    </>
  );
}

export default App;
