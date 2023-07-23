import { Box } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import { tile } from '../config/tile-config';
import { useMemo } from 'react';
import { convertCoordsToOrigin } from '../config/defaults';

function Ghost({ onGhostClick, position, color, transparency }) {
  const coordsRelativeToOrigin = convertCoordsToOrigin(position);
  const ghostPosition = [
    coordsRelativeToOrigin[0],
    0,
    coordsRelativeToOrigin[1],
  ];

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
        position={ghostPosition}
        onClick={() => onGhostClick(position)}
        material={mat}
      />
    </>
  );
}

export default Ghost;
