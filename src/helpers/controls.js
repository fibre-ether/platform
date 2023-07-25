import { folder, useControls } from 'leva';

export const Controls = () => {
  const controlValues = useControls(() => ({
    looks: folder({
      tileColor: '#fff',
      wallColor: '#fff',
      ghostColor: '#fff',
      ghostTransparency: { value: 0.2, min: 0, max: 1, step: 0.05 },
    }),
    controls: folder({
      reset: false,
    }),
  }));
  return controlValues;
};
