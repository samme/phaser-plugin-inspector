import Phaser from 'phaser';
import { GLOBAL_PLUGIN_KEY } from './const';
import { AddArcadePhysicsWorld, AddCamera, AddMatterPhysicsWorld, cameraToPrint, displayListItemToPrint, FormatLength, InspectByIndex, InspectByName, InspectByType, keyToPrint, lightToPrint, timerEventToPrint, tweenToPrint, updateListItemToPrint } from './util';

const {
  CREATE,
  DESTROY,
  START
} = Phaser.Scenes.Events;

export class InspectorScenePlugin extends Phaser.Plugins.ScenePlugin {
  constructor (scene, pluginManager) {
    super(scene, pluginManager);

    this.folder = null;
    this.pane = null;
  }

  boot () {
    this.pane = this.pluginManager.get(GLOBAL_PLUGIN_KEY).pane;
    this.folder = this.pane.addFolder({ title: `Scene “${this.systems.settings.key}”`, expanded: false });

    this.systems.events
      .on(DESTROY, this.sceneDestroy, this);

    this.add();
  }

  destroy () {
    this.folder.dispose();
    this.folder = null;

    this.systems.events
      .off(DESTROY, this.sceneDestroy, this);

    super.destroy();
  }

  sceneDestroy () {
    this.destroy();
  }

  add () {
    const { arcadePhysics, cameras, data, displayList, events, input, load, lights, matterPhysics, scenePlugin, time, tweens, updateList } = this.systems;
    const sceneKey = scenePlugin.settings.key;

    const camerasFolder = this.folder.addFolder({ title: 'Cameras', expanded: false });
    camerasFolder.addButton({ title: 'Print cameras' }).on('click', () => { console.info('Cameras:'); console.table(cameras.cameras.map(cameraToPrint)); });

    if (data) {
      const dataFolder = this.folder.addFolder({ title: 'Data', expanded: false });
      dataFolder.addButton({ title: 'Print data' }).on('click', () => { console.info('Data:'); console.table(data.getAll()); });
    }

    const displayListFolder = this.folder.addFolder({ title: 'Display List', expanded: false });
    displayListFolder.addMonitor(displayList, 'length', { format: FormatLength });
    displayListFolder.addButton({ title: 'Print' }).on('click', () => { console.info('Display list:'); console.table(displayList.getChildren().map(displayListItemToPrint)); });
    displayListFolder.addButton({ title: 'Save JSON' }).on('click', () => { load.saveJSON(displayList.getChildren(), `${sceneKey} displayList.json`); });
    displayListFolder.addButton({ title: 'Inspect by name …' }).on('click', () => { InspectByName(prompt('Inspect first game object on display list with name:'), displayList.getChildren(), this.pane); });
    displayListFolder.addButton({ title: 'Inspect by type …' }).on('click', () => { InspectByType(prompt('Inspect first game object on display list with type:'), displayList.getChildren(), this.pane); });
    displayListFolder.addButton({ title: 'Inspect by index …' }).on('click', () => { InspectByIndex(prompt(`Inspect game object on display list at index (0 to ${displayList.length - 1}):`), displayList.getChildren(), this.pane); });

    if (input) {
      const { gamepad, keyboard } = input;
      const inputFolder = this.folder.addFolder({ title: 'Input', expanded: false });
      inputFolder.addInput(input, 'dragDistanceThreshold', { min: 0, max: 32, step: 1 });
      inputFolder.addInput(input, 'dragTimeThreshold', { min: 0, max: 100, step: 10 });
      inputFolder.addInput(input, 'enabled');
      inputFolder.addMonitor(input, 'pollRate');
      inputFolder.addInput(input, 'topOnly');
      inputFolder.addMonitor(input, 'x');
      inputFolder.addMonitor(input, 'y');
      inputFolder.addButton({ title: 'Set poll always' }).on('click', () => { console.info('Poll always'); input.setPollAlways(); });
      inputFolder.addButton({ title: 'Set poll on move' }).on('click', () => { console.info('Poll on move'); input.setPollOnMove(); });
      inputFolder.addButton({ title: 'Print game objects' }).on('click', () => { console.info('Interactive game objects: '); console.table(input._list.map(displayListItemToPrint)); });

      if (gamepad) {
        const gamepadFolder = this.folder.addFolder({ title: 'Gamepads', expanded: false });
        gamepadFolder.addInput(gamepad, 'enabled');
        gamepadFolder.addMonitor(gamepad, 'total');
      }

      const keyboardFolder = this.folder.addFolder({ title: 'Keyboard', expanded: false });
      keyboardFolder.addInput(keyboard, 'enabled');
      keyboardFolder.addButton({ title: 'Clear captures' }).on('click', () => { console.info('Clear key captures'); keyboard.clearCaptures(); });
      keyboardFolder.addButton({ title: 'Remove all keys' }).on('click', () => { console.info('Remove all keys'); keyboard.removeAllKeys(); });
      keyboardFolder.addButton({ title: 'Reset keys' }).on('click', () => { console.info('Reset keys'); keyboard.resetKeys(); });
      keyboardFolder.addButton({ title: 'Print captures' }).on('click', () => { console.info('Key captures:'); console.table(keyboard.getCaptures()); });
      keyboardFolder.addButton({ title: 'Print keys' }).on('click', () => { console.info('Keys:'); console.table(keyboard.keys.map(keyToPrint)); });
    }

    if (lights) {
      const lightsFolder = this.folder.addFolder({ title: 'Lights', expanded: false });
      lightsFolder.addInput(lights, 'active');
      lightsFolder.addInput(lights, 'ambientColor', { color: { type: 'float' } });
      lightsFolder.addMonitor(lights, 'visibleLights', { format: FormatLength });
      lightsFolder.addButton({ title: 'Print lights' }).on('click', () => { console.info('Lights:'); console.table(lights.lights.map(lightToPrint)); });
    }

    if (load) {
      const loadFolder = this.folder.addFolder({ title: 'Load', expanded: false });
      loadFolder.addMonitor(load, 'progress', { view: 'graph', min: 0, max: 1 });
      loadFolder.addMonitor(load, 'totalComplete');
      loadFolder.addMonitor(load, 'totalFailed');
      loadFolder.addMonitor(load, 'totalToLoad');
    }

    const scenePluginFolder = this.folder.addFolder({ title: 'Scene', expanded: false });
    scenePluginFolder.addMonitor(scenePlugin.settings, 'active');
    scenePluginFolder.addMonitor(scenePlugin.settings, 'visible');
    scenePluginFolder.addMonitor(scenePlugin.settings, 'status');
    scenePluginFolder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause scene', sceneKey); scenePlugin.pause(); });
    scenePluginFolder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume scene', sceneKey); scenePlugin.resume(); });
    scenePluginFolder.addButton({ title: 'Sleep' }).on('click', () => { console.info('Sleep scene', sceneKey); scenePlugin.sleep(); });
    scenePluginFolder.addButton({ title: 'Wake' }).on('click', () => { console.info('Wake scene', sceneKey); scenePlugin.wake(); });
    scenePluginFolder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop scene', sceneKey); scenePlugin.stop(); });
    scenePluginFolder.addButton({ title: 'Restart' }).on('click', () => { console.info('Restart scene', sceneKey); scenePlugin.restart(); });
    scenePluginFolder.addButton({ title: 'Remove' }).on('click', () => { console.info('Remove scene', sceneKey); scenePlugin.remove(); });
    scenePluginFolder.addButton({ title: 'Print scene data' }).on('click', () => { console.info(`Scene data for ${sceneKey}:`); console.table(scenePlugin.settings.data); });

    if (time) {
      const timeFolder = this.folder.addFolder({ title: 'Time', expanded: false });
      timeFolder.addMonitor(time._active, 'length', { label: 'events (length)', format: FormatLength });
      timeFolder.addMonitor(time, 'now');
      timeFolder.addInput(time, 'paused');
      timeFolder.addButton({ title: 'Print timer events' }).on('click', () => { console.info('Timer events:'); console.table(time._active.map(timerEventToPrint)); });
    }

    if (tweens) {
      const tweensFolder = this.folder.addFolder({ title: 'Tweens', expanded: false });
      tweensFolder.addInput(tweens, 'timeScale', { min: 0.1, max: 10, step: 0.1 });
      tweensFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all tweens'); tweens.pauseAll(); });
      tweensFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all tweens'); tweens.resumeAll(); });
      tweensFolder.addButton({ title: 'Stop all' }).on('click', () => { console.info('Stop all tweens'); tweens.killAll(); });
      tweensFolder.addButton({ title: 'Print tweens' }).on('click', () => { console.info('Tweens:'); console.table(tweens.getTweens().map(tweenToPrint)); });
    }

    const updateListFolder = this.folder.addFolder({ title: 'Update List', expanded: false });
    updateListFolder.addMonitor(updateList, 'length', { format: FormatLength });
    updateListFolder.addButton({ title: 'Print' }).on('click', () => { console.info('Update list:'); console.table(updateList.getActive().map(updateListItemToPrint)); });
    updateListFolder.addButton({ title: 'Save JSON' }).on('click', () => { load.saveJSON(updateList.getActive(), `${sceneKey} updateList.json`); });
    updateListFolder.addButton({ title: 'Inspect by name …' }).on('click', () => { InspectByName(prompt('Inspect first game object on update list with name:'), updateList.getActive(), this.pane); });
    updateListFolder.addButton({ title: 'Inspect by type …' }).on('click', () => { InspectByType(prompt('Inspect first game object on update list with type:'), updateList.getActive(), this.pane); });
    updateListFolder.addButton({ title: 'Inspect by index …' }).on('click', () => { InspectByIndex(prompt(`Inspect game object on update list at index (0 to ${updateList.length - 1}):`), updateList.getActive(), this.pane); });

    events.on(CREATE, () => {
      for (const cam of cameras.cameras) { AddCamera(cam, camerasFolder); }
    });

    if (arcadePhysics) {
      events.on(START, () => { AddArcadePhysicsWorld(arcadePhysics.world, this.folder); });
    }

    if (matterPhysics) {
      events.on(START, () => { AddMatterPhysicsWorld(matterPhysics.world, this.folder); });
    }
  }
}
