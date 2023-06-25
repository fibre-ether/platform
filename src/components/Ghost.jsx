import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { tile } from "../config/tile-config";

function Ghost({ onGhostClick, position }) {
  return (
    <>
      <Box
        args={tile.size}
        position={[position[0], 0, position[1]]}
        onClick={() => onGhostClick(position)}
        material={
          new MeshStandardMaterial({
            transparent: true,
            opacity: 0.2,
          })
        }
      />
    </>
  );
}

export default Ghost;
