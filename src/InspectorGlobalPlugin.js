import Phaser from 'phaser';
import Tweakpane from 'tweakpane';
import {
  addPointer,
  copyToSafeObj,
  animToPrint,
  sceneToPrint,
  soundToPrint,
  textureToPrint,
  printCaches,
  printDevice,
  snapshot
} from './util';

export class InspectorGlobalPlugin extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager) {
    super(pluginManager);

    this.pane = null;

    Object.seal(this);
  }

  init (data) {
  }

  start () {
    this.pane = new Tweakpane.Pane();
    this.pane.containerElem_.style.width = '320px';
    this.add();
  }

  stop () {
    this.pane.dispose();
    this.pane = null;
  }

  destroy () {
    this.stop();
    super.destroy();
  }

  add () {
    const { anims, cache, device, input, loop, registry, renderer, scale, scene, sound, textures } = this.game;
    const { keyboard, touch } = input;

    const pane = this.pane;
    pane.addButton({ title: 'Refresh' }).on('click', () => { console.time('refresh'); pane.refresh(); console.timeEnd('refresh'); });

    const folder = pane.addFolder({ title: 'Game', expanded: false });

    folder.addMonitor(this.game, 'hasFocus');
    folder.addButton({ title: 'Destroy' }).on('click', () => { console.info('Destroy game'); this.game.destroy(true); });

    const animsFolder = folder.addFolder({ title: 'Animations', expanded: false });
    animsFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all animations'); anims.pauseAll(); });
    animsFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all animations'); anims.resumeAll(); });
    animsFolder.addButton({ title: 'Print animations' }).on('click', () => { console.info('Animations:'); console.table(anims.anims.getArray().map(animToPrint)); });

    const cacheFolder = folder.addFolder({ title: 'Cache', expanded: false });
    cacheFolder.addButton({ title: 'Print cache contents' }).on('click', () => { printCaches(cache); });

    const configFolder = folder.addFolder({ title: 'Config', expanded: false });
    configFolder.addButton({ title: 'Print game config' }).on('click', () => { console.info('Game config (partial):'); console.table(copyToSafeObj(this.game.config)); });

    const deviceFolder = folder.addFolder({ title: 'Device', expanded: false });
    deviceFolder.addButton({ title: 'Print device info' }).on('click', () => { console.info('Device:'); printDevice(device); });

    const inputFolder = folder.addFolder({ title: 'Input', expanded: false });
    inputFolder.addMonitor(input, 'isOver');
    inputFolder.addInput(input, 'enabled');
    inputFolder.addInput(input, 'globalTopOnly');

    for (const pointer of input.pointers) {
      addPointer(pointer, inputFolder);
    }

    const keyboardFolder = folder.addFolder({ title: 'Keyboard', expanded: false });
    keyboardFolder.addInput(keyboard, 'enabled');
    keyboardFolder.addMonitor(keyboard, 'preventDefault');

    if (touch) {
      const touchFolder = folder.addFolder({ title: 'Touch', expanded: false });
      touchFolder.addInput(touch, 'capture');
      touchFolder.addInput(touch, 'enabled');
    }

    const loopFolder = folder.addFolder({ title: 'Loop', expanded: false });
    loopFolder.addMonitor(loop, 'actualFps', { view: 'graph', min: 0, max: 120 });
    loopFolder.addMonitor(loop, 'delta', { view: 'graph', min: 0, max: 50 });
    loopFolder.addButton({ title: 'Sleep' }).on('click', () => { console.info('Sleep game loop'); loop.sleep(); });
    loopFolder.addButton({ title: 'Wake' }).on('click', () => { console.info('Wake game loop'); loop.wake(); });

    const registryFolder = folder.addFolder({ title: 'Registry', expanded: false });
    registryFolder.addButton({ title: 'Print registry values' }).on('click', () => { console.info('Registry:'); console.table(registry.getAll()); });

    const rendererFolder = folder.addFolder({ title: 'Renderer', expanded: false });
    if (renderer.type === Phaser.CANVAS) {
      rendererFolder.addInput(renderer, 'antialias');
      rendererFolder.addMonitor(renderer, 'drawCount', { view: 'graph', min: 0, max: 100 });
    }
    rendererFolder.addButton({ title: 'Snapshot' }).on('click', () => {
      console.info('Snapshot');
      renderer.snapshot(snapshot);
    });
    rendererFolder.addButton({ title: 'Print config' }).on('click', () => { console.info('Renderer config:'); console.table(copyToSafeObj(renderer.config)); });

    const scaleFolder = folder.addFolder({ title: 'Scale', expanded: false });
    scaleFolder.addMonitor(scale, 'width');
    scaleFolder.addMonitor(scale, 'height');
    scaleFolder.addButton({ title: 'Start full screen' }).on('click', () => { console.info('Start fullscreen'); scale.startFullscreen(); });
    scaleFolder.addButton({ title: 'Stop full screen' }).on('click', () => { console.info('Stop fullscreen'); scale.stopFullscreen(); });

    const sceneFolder = folder.addFolder({ title: 'Scenes', expanded: false });
    sceneFolder.addButton({ title: 'Print scenes' }).on('click', () => { console.info('Scenes:'); console.table(scene.scenes.map(sceneToPrint)); });

    const soundFolder = folder.addFolder({ title: 'Sound', expanded: false });
    soundFolder.addInput(sound, 'mute');
    soundFolder.addInput(sound, 'pauseOnBlur');
    soundFolder.addInput(sound, 'volume', { min: 0, max: 1, step: 0.1 });
    soundFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all sounds'); sound.pauseAll(); });
    soundFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all sounds'); sound.resumeAll(); });
    soundFolder.addButton({ title: 'Stop all' }).on('click', () => { console.info('Stop all sounds'); sound.stopAll(); });
    soundFolder.addButton({ title: 'Print sounds' }).on('click', () => { console.info('Sounds:'); console.table(sound.sounds.map(soundToPrint)); });

    const texturesFolder = folder.addFolder({ title: 'Textures', expanded: false });
    texturesFolder.addButton({ title: 'Print textures' }).on('click', () => { console.info('Textures:'); console.table(Object.values(textures.list).map(textureToPrint)); });
  }
}
