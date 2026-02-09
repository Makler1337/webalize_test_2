import * as migration_20260208_082207_initial from './20260208_082207_initial'
import * as migration_20260209_use_payload_localization from './20260209_use_payload_localization'

export const migrations = [
  {
    up: migration_20260208_082207_initial.up,
    down: migration_20260208_082207_initial.down,
    name: '20260208_082207_initial',
  },
  {
    up: migration_20260209_use_payload_localization.up,
    down: migration_20260209_use_payload_localization.down,
    name: '20260209_use_payload_localization',
  },
]
