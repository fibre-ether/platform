import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { tile } from "../config/tile-config";
import { useMemo } from "react";

function Tile({ id, ghostToggle }) {
  const positionCoords = id.split(",").map((coord) => parseInt(coord));
  const mat = useMemo(() => new MeshStandardMaterial(), []);
  return (
    <>
      <Box
        args={tile.size}
        position={[positionCoords[0], 0, positionCoords[1]]}
        onClick={() => ghostToggle(id)}
        material={mat}
      />
    </>
  );
}

export default Tile;
