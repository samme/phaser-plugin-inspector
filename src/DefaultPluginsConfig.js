import { InspectorGlobalPlugin } from './InspectorGlobalPlugin';
import { InspectorScenePlugin } from './InspectorScenePlugin';
import {
  GLOBAL_PLUGIN_KEY,
  GLOBAL_PLUGIN_MAPPING,
  SCENE_PLUGIN_KEY,
  SCENE_PLUGIN_SCENE_MAPPING
} from './const';

export const DefaultPluginsConfig = {
  global: [{ key: GLOBAL_PLUGIN_KEY, plugin: InspectorGlobalPlugin, mapping: GLOBAL_PLUGIN_MAPPING }],
  scene: [{ key: SCENE_PLUGIN_KEY, plugin: InspectorScenePlugin, mapping: SCENE_PLUGIN_SCENE_MAPPING }]
};
