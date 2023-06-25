import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { tile } from "../config/tile-config";

function Tile({ id, ghostToggle }) {
  const positionCoords = id.split(",").map((coord) => parseInt(coord));
  return (
    <>
      <Box
        args={tile.size}
        position={[positionCoords[0], 0, positionCoords[1]]}
        onClick={() => ghostToggle(id)}
        material={new MeshStandardMaterial()}
      />
    </>
  );
}

export default Tile;
