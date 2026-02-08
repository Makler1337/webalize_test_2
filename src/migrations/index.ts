import * as migration_20260208_082207_initial from './20260208_082207_initial';

export const migrations = [
  {
    up: migration_20260208_082207_initial.up,
    down: migration_20260208_082207_initial.down,
    name: '20260208_082207_initial'
  },
];
