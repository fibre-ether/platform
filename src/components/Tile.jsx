import { Box } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import { tile } from '../config/tile-config';
import { useMemo } from 'react';
import { CELL, convertCoordsToOrigin } from '../config/defaults';

function Tile({ type, coords, ghostToggle, colors }) {
  // const positionCoords = id.split(',').map((coord) => parseInt(coord));
  const tileMat = useMemo(
    () => new MeshStandardMaterial({ color: colors.tile }),
    [colors]
  );
  const wallMat = useMemo(
    () => new MeshStandardMaterial({ color: colors.wall }),
    [colors]
  );

  const coordsRelativeToOrigin = convertCoordsToOrigin(coords);
  const position = [coordsRelativeToOrigin[0], 0, coordsRelativeToOrigin[1]];
  return (
    <>
      <Box
        args={tile.size}
        position={position}
        onClick={() => (type == CELL.tile ? ghostToggle(coords) : null)}
        material={type == CELL.tile ? tileMat : wallMat}
      />
    </>
  );
}

export default Tile;
