import { Box } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import { tile } from '../config/tile-config';
import { useMemo } from 'react';
import { convertCoordsToOrigin } from '../config/defaults';

function Tile({ coords, ghostToggle, color }) {
  // const positionCoords = id.split(',').map((coord) => parseInt(coord));
  const mat = useMemo(() => new MeshStandardMaterial({ color }), [color]);
  const coordsRelativeToOrigin = convertCoordsToOrigin(coords);
  const position = [coordsRelativeToOrigin[0], 0, coordsRelativeToOrigin[1]];
  return (
    <>
      <Box
        args={tile.size}
        position={position}
        onClick={() => ghostToggle(coords)}
        material={mat}
      />
    </>
  );
}

export default Tile;
