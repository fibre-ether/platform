import { useEffect } from 'react';
import { CAMERA_HEIGHT, DISTANCE_BEHIND_TILE } from '../config/defaults';
import { cameraConfig } from '../config/camera-config';

const useGameCamera = ({
  reset,
  resetNeighbors,
  setControls,
  latestTiles,
  cameraControlsRef,
}) => {
  useEffect(() => {
    /* TODO: when reset is triggered, also reset all players' cameras */
    if (reset) {
      resetNeighbors({ setControls });
    }
    /* eslint-disable-next-line */
  }, [reset]);

  useEffect(() => {
    const position = [
      DISTANCE_BEHIND_TILE * latestTiles[1][0] -
        (DISTANCE_BEHIND_TILE - 1) * latestTiles[0][0],
      CAMERA_HEIGHT * cameraConfig.positionOffset,
      DISTANCE_BEHIND_TILE * latestTiles[1][1] -
        (DISTANCE_BEHIND_TILE - 1) * latestTiles[0][1],
    ];
    const lookAt = [latestTiles[0][0], 0, latestTiles[0][1]];
    cameraControlsRef.current?.setLookAt(...position, ...lookAt, true);
    /* eslint-disable-next-line */
  }, [latestTiles]);
};

export default useGameCamera;
