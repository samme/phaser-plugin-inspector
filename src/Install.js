import { InspectorGlobalPlugin } from './InspectorGlobalPlugin';
import { InspectorScenePlugin } from './InspectorScenePlugin';
import {
  GLOBAL_PLUGIN_KEY,
  GLOBAL_PLUGIN_MAPPING,
  SCENE_PLUGIN_KEY,
  SCENE_PLUGIN_SCENE_MAPPING,
  SCENE_PLUGIN_SYS_MAPPING
} from './const';

export function Install (pluginsManager) {
  pluginsManager.install(GLOBAL_PLUGIN_KEY, InspectorGlobalPlugin, true, GLOBAL_PLUGIN_MAPPING);
  pluginsManager.installScenePlugin(SCENE_PLUGIN_KEY, InspectorScenePlugin, SCENE_PLUGIN_SCENE_MAPPING);

  for (const scene of pluginsManager.game.scene.scenes) {
    const plugin = new InspectorScenePlugin(scene, pluginsManager);

    scene[SCENE_PLUGIN_SCENE_MAPPING] = plugin;
    scene.sys[SCENE_PLUGIN_SYS_MAPPING] = plugin;

    plugin.boot();
  }
}
