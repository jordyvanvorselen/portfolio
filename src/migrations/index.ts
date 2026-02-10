import * as migration_20260210_081559 from './20260210_081559';

export const migrations = [
  {
    up: migration_20260210_081559.up,
    down: migration_20260210_081559.down,
    name: '20260210_081559'
  },
];
