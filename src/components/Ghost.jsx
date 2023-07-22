import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { tile } from "../config/tile-config";
import { useMemo } from "react";

function Ghost({ onGhostClick, position }) {
  const mat = useMemo(
    () =>
      new MeshStandardMaterial({
        transparent: true,
        opacity: 0.2,
      }),
    []
  );

  return (
    <>
      <Box
        args={tile.size}
        position={[position[0], 0, position[1]]}
        onClick={() => onGhostClick(position)}
        material={mat}
      />
    </>
  );
}

export default Ghost;
