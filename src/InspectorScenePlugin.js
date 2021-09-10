import Phaser from 'phaser';
import { GLOBAL_PLUGIN_KEY } from './const';
import { addArcadePhysicsWorld, addCamera, addMatterPhysicsWorld, cameraToPrint, displayListItemToPrint, keyToPrint, lightToPrint, timerEventToPrint, tweenToPrint, updateListItemToPrint } from './util';

const {
  CREATE,
  DESTROY,
  SHUTDOWN,
  START
} = Phaser.Scenes.Events;

export class InspectorScenePlugin extends Phaser.Plugins.ScenePlugin {
  constructor (scene, pluginManager) {
    super(scene, pluginManager);

    this.folder = null;
    this.pane = null;

    Object.seal(this);
  }

  boot () {
    console.debug('boot', this.systems.settings.key);

    this.pane = this.pluginManager.get(GLOBAL_PLUGIN_KEY).pane;
    this.folder = this.pane.addFolder({ title: `Scene “${this.systems.settings.key}”`, expanded: false });

    this.systems.events
      .on(START, this.sceneStart, this)
      .on(CREATE, this.sceneCreate, this)
      .on(SHUTDOWN, this.sceneShutdown, this)
      .on(DESTROY, this.sceneDestroy, this);

    if (this.systems.settings.isBooted) {
      console.info('Scene already booted');
    }

    this.add();
  }

  start () {
    console.debug('start');
  }

  stop () {
    console.debug('stop');
  }

  destroy () {
    console.debug('destroy', this.systems.settings.key);

    this.folder.dispose();
    this.folder = null;

    this.systems.events
      .off(START, this.sceneStart, this)
      .off(CREATE, this.sceneCreate, this)
      .off(SHUTDOWN, this.sceneShutdown, this)
      .off(DESTROY, this.sceneDestroy, this);

    super.destroy();
  }

  sceneDestroy () {
    console.debug('sceneDestroy', this.systems.settings.key);

    this.destroy();
  }

  sceneStart () {
    console.debug('sceneStart', this.systems.settings.key, this.systems.settings);

    // TODO add physics
  }

  sceneCreate () {
    console.debug('sceneCreate', this.systems.settings.key);

    // TODO add cameras
  }

  sceneShutdown () {
    console.debug('sceneShutdown', this.systems.settings.key);
  }

  add () {
    const { arcadePhysics, cameras, data, displayList, events, input, load, lights, matterPhysics, scenePlugin, time, tweens, updateList } = this.systems;

    const camerasFolder = this.folder.addFolder({ title: 'Cameras', expanded: false });
    camerasFolder.addButton({ title: 'Print cameras' }).on('click', () => { console.info('Cameras:'); console.table(cameras.cameras.map(cameraToPrint)); });

    if (data) {
      const dataFolder = this.folder.addFolder({ title: 'Data', expanded: false });
      dataFolder.addButton({ title: 'Print data' }).on('click', () => { console.info('Data:'); console.table(data.getAll()); });
    }

    const displayListFolder = this.folder.addFolder({ title: 'Display List', expanded: false });
    displayListFolder.addMonitor(displayList, 'length');
    displayListFolder.addButton({ title: 'Print display list' }).on('click', () => { console.info('Display list:'); console.table(displayList.getChildren().map(displayListItemToPrint)); });

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
      lightsFolder.addInput(lights, 'ambientColor');
      lightsFolder.addMonitor(lights, 'visibleLights');
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
    const sceneKey = scenePlugin.settings.key;
    scenePluginFolder.addMonitor(scenePlugin.settings, 'active');
    scenePluginFolder.addMonitor(scenePlugin.settings, 'visible');
    scenePluginFolder.addMonitor(scenePlugin.settings, 'status');
    scenePluginFolder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause', sceneKey); scenePlugin.pause(); });
    scenePluginFolder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume', sceneKey); scenePlugin.resume(); });
    scenePluginFolder.addButton({ title: 'Sleep' }).on('click', () => { console.info('Sleep', sceneKey); scenePlugin.sleep(); });
    scenePluginFolder.addButton({ title: 'Wake' }).on('click', () => { console.info('Wake', sceneKey); scenePlugin.wake(); });
    scenePluginFolder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop', sceneKey); scenePlugin.stop(); });
    scenePluginFolder.addButton({ title: 'Restart' }).on('click', () => { console.info('Restart', sceneKey); scenePlugin.restart(); });
    scenePluginFolder.addButton({ title: 'Print scene data' }).on('click', () => { console.info(`Scene data for ${sceneKey}:`); console.table(scenePlugin.settings.data); });

    if (time) {
      const timeFolder = this.folder.addFolder({ title: 'Time', expanded: false });
      timeFolder.addMonitor(time._active, 'length', { label: 'events' });
      timeFolder.addInput(time, 'paused');
      timeFolder.addButton({ title: 'Print timer events' }).on('click', () => { console.info('Timer events:'); console.table(time._active.map(timerEventToPrint)); });
    }

    if (tweens) {
      const tweensFolder = this.folder.addFolder({ title: 'Tweens', expanded: false });
      tweensFolder.addInput(tweens, 'timeScale', { min: 0.1, max: 10, step: 0.1 });
      tweensFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all tweens'); tweens.pauseAll(); });
      tweensFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all tweens'); tweens.resumeAll(); });
      tweensFolder.addButton({ title: 'Stop all' }).on('click', () => { console.info('Stop all tweens'); tweens.killAll(); });
      tweensFolder.addButton({ title: 'Print tweens' }).on('click', () => { console.info('Tweens:'); console.table(tweens.getAllTweens().map(tweenToPrint)); });
    }

    const updateListFolder = this.folder.addFolder({ title: 'Update List', expanded: false });
    updateListFolder.addMonitor(updateList, 'length');
    updateListFolder.addButton({ title: 'Print update list' }).on('click', () => { console.info('Update list:'); console.table(updateList.getActive().map(updateListItemToPrint)); });

    events.on(CREATE, () => {
      for (const cam of cameras.cameras) { addCamera(cam, camerasFolder); }
    });

    if (arcadePhysics) {
      events.on(START, () => { addArcadePhysicsWorld(arcadePhysics.world, this.folder); });
    }

    if (matterPhysics) {
      events.on(START, () => { addMatterPhysicsWorld(matterPhysics.world, this.folder); });
    }
  }
}
