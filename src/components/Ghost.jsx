import { Box } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import { tile } from '../config/tile-config';
import { useMemo } from 'react';

function Ghost({ onGhostClick, position, color, transparency }) {
  const mat = useMemo(
    () =>
      new MeshStandardMaterial({
        transparent: true,
        opacity: transparency,
        color,
      }),
    [color, transparency]
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
