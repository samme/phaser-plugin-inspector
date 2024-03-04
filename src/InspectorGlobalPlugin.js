import Phaser from 'phaser';
import { Pane } from 'tweakpane';
import {
  AddPointer,
  copyToSafeObj,
  animToPrint,
  FormatLength,
  sceneToPrint,
  soundToPrint,
  textureToPrint,
  printCaches,
  printDevice,
  snapshot
} from './util';

export class InspectorGlobalPlugin extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager) {
    if (Phaser.VERSION.split('.')[1] < 60) {
      throw new Error('Phaser v3.60 or later is required');
    }

    super(pluginManager);

    this.pane = null;
    this.style = null;
  }

  init (data) {
  }

  start () {
    this.pane = new Pane({ title: 'Inspector' });

    this.add();

    this.style = document.createElement('style');
    this.style.innerText = '.tp-dfwv { top: 8px; bottom: 8px; width: 320px; overflow: auto; }';
    document.head.appendChild(this.style);
  }

  stop () {
    document.head.removeChild(this.style);
    this.style = null;
    this.pane.dispose();
    this.pane = null;
  }

  destroy () {
    this.stop();
    super.destroy();
  }

  add () {
    const { game, pane } = this;
    const { anims, cache, device, input, loop, registry, renderer, scale, scene, sound, textures } = game;
    const { keyboard, touch } = input;

    pane.addButton({ title: 'Refresh' }).on('click', () => { console.time('refresh'); pane.refresh(); console.timeEnd('refresh'); });

    const folder = pane.addFolder({ title: 'Game', expanded: false });

    folder.addMonitor(game, 'hasFocus');
    folder.addMonitor(game, 'isPaused');
    folder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause game'); game.pause(); });
    folder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume game'); game.resume(); });
    folder.addButton({ title: 'Step' }).on('click', () => { const t = performance.now(); const dt = loop._target; console.info('step', t, dt); game.step(t, dt); });
    folder.addButton({ title: 'Destroy' }).on('click', () => { console.info('Destroy game'); game.destroy(true); });

    const animsFolder = folder.addFolder({ title: 'Animations', expanded: false });
    animsFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all animations'); anims.pauseAll(); });
    animsFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all animations'); anims.resumeAll(); });
    animsFolder.addButton({ title: 'Print animations' }).on('click', () => { console.info('Animations:'); console.table(anims.anims.getArray().map(animToPrint)); });
    animsFolder.addButton({ title: 'Print JSON' }).on('click', () => { console.info(JSON.stringify(anims.toJSON())); });

    const cacheFolder = folder.addFolder({ title: 'Cache', expanded: false });
    cacheFolder.addButton({ title: 'Print cache contents' }).on('click', () => { printCaches(cache); });

    const configFolder = folder.addFolder({ title: 'Config', expanded: false });
    configFolder.addButton({ title: 'Print game config' }).on('click', () => { console.info('Game config (partial):'); console.table(copyToSafeObj(game.config)); });

    const deviceFolder = folder.addFolder({ title: 'Device', expanded: false });
    deviceFolder.addButton({ title: 'Print device info' }).on('click', () => { console.info('Device:'); printDevice(device); });

    const inputFolder = folder.addFolder({ title: 'Input', expanded: false });
    inputFolder.addMonitor(input, 'isOver');
    inputFolder.addInput(input, 'enabled');
    inputFolder.addInput(input, 'globalTopOnly');

    for (const pointer of input.pointers) {
      AddPointer(pointer, inputFolder);
    }

    if (keyboard) {
      const keyboardFolder = folder.addFolder({ title: 'Keyboard', expanded: false });
      keyboardFolder.addInput(keyboard, 'enabled');
      keyboardFolder.addMonitor(keyboard, 'preventDefault');
    }

    if (touch) {
      const touchFolder = folder.addFolder({ title: 'Touch', expanded: false });
      touchFolder.addInput(touch, 'capture');
      touchFolder.addInput(touch, 'enabled');
    }

    const loopProxy = {
      get 'getDuration()' () { return loop.getDuration(); }
    };
    const loopFolder = folder.addFolder({ title: 'Loop', expanded: false });
    loopFolder.addMonitor(loop, 'actualFps', { view: 'graph', min: 0, max: 120 });
    loopFolder.addMonitor(loop, 'delta', { view: 'graph', min: 0, max: 50 });
    loopFolder.addMonitor(loop, 'frame', { format: Math.floor });
    loopFolder.addMonitor(loopProxy, 'getDuration()');
    loopFolder.addMonitor(loop, 'now');
    loopFolder.addMonitor(loop, 'rawDelta', { view: 'graph', min: 0, max: 50 });
    loopFolder.addMonitor(loop, 'running');
    loopFolder.addMonitor(loop, 'startTime');
    loopFolder.addMonitor(loop, 'time');
    loopFolder.addButton({ title: 'Sleep' }).on('click', () => { console.info('Sleep game loop'); loop.sleep(); });
    loopFolder.addButton({ title: 'Wake' }).on('click', () => { console.info('Wake game loop'); loop.wake(); });
    loopFolder.addButton({ title: 'Step' }).on('click', () => { const t = performance.now(); console.info('step', t); loop.step(t); });

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
    soundFolder.addMonitor(sound.sounds, 'length', { label: 'sounds (length)', format: FormatLength });
    soundFolder.addInput(sound, 'volume', { min: 0, max: 1, step: 0.1 });
    soundFolder.addButton({ title: 'Pause all' }).on('click', () => { console.info('Pause all sounds'); sound.pauseAll(); });
    soundFolder.addButton({ title: 'Remove all' }).on('click', () => { console.info('Remove all sounds'); sound.removeAll(); });
    soundFolder.addButton({ title: 'Resume all' }).on('click', () => { console.info('Resume all sounds'); sound.resumeAll(); });
    soundFolder.addButton({ title: 'Stop all' }).on('click', () => { console.info('Stop all sounds'); sound.stopAll(); });
    soundFolder.addButton({ title: 'Print sounds' }).on('click', () => { console.info('Sounds:'); console.table(sound.sounds.map(soundToPrint)); });

    const texturesFolder = folder.addFolder({ title: 'Textures', expanded: false });
    texturesFolder.addButton({ title: 'Print textures' }).on('click', () => { console.info('Textures:'); console.table(Object.values(textures.list).map(textureToPrint)); });
  }
}
