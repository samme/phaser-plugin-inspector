import Phaser from 'phaser';

const TAU = 2 * Math.PI;
const CacheNames = ['audio', 'binary', 'bitmapFont', 'html', 'json', 'obj', 'physics', 'shader', 'text', 'tilemap', 'video', 'xml'];
const CameraEvents = Phaser.Cameras.Scene2D.Events;
const SceneEvents = Phaser.Scenes.Events;

export function animToPrint ({ key, delay, duration, frameRate, repeat, repeatDelay }) {
  return { key, delay, duration, frameRate, repeat, repeatDelay };
}

export function sceneToPrint (scene) {
  const { key, status, active, visible } = scene.sys.settings;

  return { key, status, active, visible };
}

export function soundToPrint ({ key, isPaused, isPlaying, seek, totalDuration, volume }) {
  return { key, isPaused, isPlaying, seek, totalDuration, volume };
}

export function textureToPrint ({ key, firstFrame, frameTotal }) {
  return { key, firstFrame, frameTotal };
}

export function copyToSafeObj (obj) {
  var out = {};

  for (var key in obj) {
    var val = obj[key];
    var typ = typeof val;

    if (!val || typ === 'boolean' || typ === 'number' || typ === 'string') {
      out[key] = val;
    }
  }

  return out;
}

export function copyToSafeTable (obj) {
  var out = {};

  for (var key in obj) {
    var val = obj[key];

    out[key] = typeof val === 'object' ? copyToSafeObj(obj[key]) : val;
  }

  return out;
}

export function printCaches (manager) {
  for (const name of CacheNames) {
    printCache(name, manager[name]);
  }

  for (const name in manager.custom) {
    printCache(name, manager.custom[name]);
  }
}

export function printCache (name, cache) {
  const { size } = cache.entries;

  if (size > 0) {
    console.info(`${name} cache (${size})`);

    console.table(copyToSafeTable(cache.entries.entries));
  } else {
    console.info(`${name} cache is empty`);
  }
}

export function printDevice (device) {
  for (const key in device) {
    console.info(key);
    console.table(copyToSafeObj(device[key]));
  }
}

export function snapshot (img) {
  img.style.width = '256px';
  img.style.height = 'auto';
  document.body.appendChild(img);
}

export function addPointer (pointer, pane) {
  const folder = pane.addFolder({ title: `Pointer ${pointer.id}`, expanded: false });

  folder.addMonitor(pointer, 'active');
  folder.addMonitor(pointer, 'angle');
  folder.addMonitor(pointer, 'buttons');
  folder.addMonitor(pointer, 'deltaX');
  folder.addMonitor(pointer, 'deltaY');
  folder.addMonitor(pointer, 'deltaZ');
  folder.addMonitor(pointer, 'distance');
  folder.addMonitor(pointer, 'downX');
  folder.addMonitor(pointer, 'downY');
  folder.addMonitor(pointer, 'id');
  folder.addMonitor(pointer, 'isDown');
  folder.addMonitor(pointer, 'locked');
  folder.addMonitor(pointer, 'movementX');
  folder.addMonitor(pointer, 'movementY');
  folder.addMonitor(pointer, 'primaryDown');
  folder.addMonitor(pointer, 'upX');
  folder.addMonitor(pointer, 'upY');
  folder.addMonitor(pointer.velocity, 'x', { label: 'velocity x' });
  folder.addMonitor(pointer.velocity, 'y', { label: 'velocity y' });
  folder.addMonitor(pointer, 'worldX');
  folder.addMonitor(pointer, 'worldY');
  folder.addMonitor(pointer, 'x');
  folder.addMonitor(pointer, 'y');

  return folder;
}

export function addSound (sound, pane) {
  const folder = pane.addFolder({ title: `Sound “${sound.key}”`, expanded: false });

  sound.once('destroy', () => { folder.dispose(); });

  folder.addMonitor(sound, 'duration');
  folder.addMonitor(sound, 'isPaused');
  folder.addMonitor(sound, 'isPlaying');
  folder.addMonitor(sound, 'seek');
  folder.addMonitor(sound, 'totalDuration');

  folder.addInput(sound, 'loop');
  folder.addInput(sound, 'mute');
  folder.addInput(sound, 'seek', { min: 0, max: sound.totalDuration });
  folder.addInput(sound, 'volume', { min: 0, max: 1 });

  folder.addButton({ title: 'Play' }).on('click', () => { console.info('Play sound “%s”', sound.key); sound.play(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause sound “%s”', sound.key); sound.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume sound “%s”', sound.key); sound.resume(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop sound “%s”', sound.key); sound.stop(); });
  folder.addButton({ title: 'Remove' }).on('click', () => { console.info('Remove sound “%s”', sound.key); sound.destroy(); });

  return folder;
}

export function displayListItemToPrint ({ name, type, x, y, visible, depth }) {
  return { name, type, x, y, visible, depth };
}

export function updateListItemToPrint ({ name, type, active }) {
  return { name, type, active };
}

export function tweenToPrint ({ duration, elapsed, paused, progress, state, totalElapsed, totalProgress }) {
  return { duration, elapsed, paused, progress, state, totalElapsed, totalProgress };
}

export function timerEventToPrint ({ delay, elapsed, loop, paused, repeat, repeatCount }) {
  return { delay, elapsed, loop, paused, repeat, repeatCount };
}

export function keyToPrint ({ duration, emitOnRepeat, enabled, isDown, isUp, location, repeats, timeDown, timeUp }) {
  return { duration, emitOnRepeat, enabled, isDown, isUp, location, repeats, timeDown, timeUp };
}

export function cameraToPrint ({ name, x, y, width, height, visible, alpha }) {
  return { name, x, y, width, height, visible, alpha };
}

export function lightToPrint ({ x, y, radius, color, intensity, visible }) {
  return { x, y, radius, color: `rgb(${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)})`, intensity, visible };
}

export function addCamera (camera, pane) {
  const defaultCamera = camera.cameraManager.default;
  const w = defaultCamera.width;
  const h = defaultCamera.height;
  const folder = pane.addFolder({ title: `Camera ${camera.id} ${camera.name || ''}`, expanded: false });

  folder.addMonitor(camera, 'name');
  folder.addInput(camera, 'alpha', { min: 0, max: 1, step: 0.05 });
  folder.addInput(camera, 'backgroundColor');
  folder.addInput(camera, 'x', { min: -w, max: w, step: 10 });
  folder.addInput(camera, 'y', { min: -h, max: h, step: 10 });
  folder.addInput(camera, 'width', { min: 0, max: w, step: 10 });
  folder.addInput(camera, 'height', { min: 0, max: h, step: 10 });
  folder.addInput(camera, 'scrollX', { min: -w, max: w, step: 10 });
  folder.addInput(camera, 'scrollY', { min: -h, max: h, step: 10 });
  folder.addInput(camera, 'originX', { min: 0, max: 1, step: 0.05 });
  folder.addInput(camera, 'originY', { min: 0, max: 1, step: 0.05 });
  folder.addInput(camera, 'rotation', { min: 0, max: TAU });
  folder.addInput(camera, 'zoom', { min: 0.1, max: 10, step: 0.05 });
  folder.addInput(camera, 'followOffset');
  folder.addInput(camera, 'disableCull');
  folder.addInput(camera, 'inputEnabled');
  folder.addInput(camera, 'roundPixels');
  folder.addInput(camera, 'useBounds');
  folder.addInput(camera, 'visible');
  folder.addMonitor(camera, 'centerX');
  folder.addMonitor(camera, 'centerY');
  folder.addMonitor(camera.midPoint, 'x', { label: 'midPoint x' });
  folder.addMonitor(camera.midPoint, 'y', { label: 'midPoint y' });
  folder.addMonitor(camera.worldView, 'x', { label: 'world x' });
  folder.addMonitor(camera.worldView, 'y', { label: 'world y' });
  folder.addMonitor(camera.worldView, 'width', { label: 'world width' });
  folder.addMonitor(camera.worldView, 'height', { label: 'world height' });

  // TODO
  const { deadzone } = camera;
  if (deadzone) {
    folder.addMonitor(deadzone, 'x', { label: 'deadzone x' });
    folder.addMonitor(deadzone, 'y', { label: 'deadzone y' });
    folder.addMonitor(deadzone, 'width', { label: 'deadzone width' });
    folder.addMonitor(deadzone, 'height', { label: 'deadzone height' });
  }

  folder.addButton({ title: 'Fade in' }).on('click', () => { camera.fadeIn(); });
  folder.addButton({ title: 'Fade out' }).on('click', () => { camera.fadeOut(); });
  folder.addButton({ title: 'Flash' }).on('click', () => { camera.flash(); });
  folder.addButton({ title: 'Reset effects' }).on('click', () => { camera.resetFX(); });
  folder.addButton({ title: 'Shake' }).on('click', () => { camera.shake(); });

  camera.on(CameraEvents.DESTROY, () => {
    console.debug('Dispose camera ', camera.id);
    folder.dispose();
  });

  console.debug('Add camera', camera.id);

  return folder;
}

export function addArcadePhysicsWorld (world, pane) {
  const { arcadePhysics, events } = world.scene.sys;
  const folder = pane.addFolder({ title: 'Arcade Physics', expanded: false });

  folder.addMonitor(world.bodies, 'size', { label: 'bodies (size)' });
  folder.addInput(world, 'fixedStep');
  folder.addInput(world, 'forceX');
  folder.addMonitor(world, 'fps');
  folder.addInput(world, 'gravity', { x: { min: -1000, max: 1000 }, y: { min: -1000, max: 1000 } });
  folder.addInput(world, 'isPaused');
  folder.addInput(world, 'OVERLAP_BIAS', { label: 'overlap bias', min: 0, max: 16, step: 1 });
  folder.addMonitor(world.staticBodies, 'size', { label: 'staticBodies (size)' });
  folder.addInput(world, 'TILE_BIAS', { label: 'tile bias', min: 0, max: 32, step: 1 });
  folder.addInput(world, 'timeScale', { min: 0.1, max: 10, step: 0.1 });
  folder.addInput(world, 'useTree');
  if (world.debugGraphic) {
    folder.addInput(world.debugGraphic, 'visible', { label: 'debug' });
  }
  folder.addButton({ title: 'Enable update' }).on('click', () => { arcadePhysics.enableUpdate(); });
  folder.addButton({ title: 'Disable update' }).on('click', () => { arcadePhysics.disableUpdate(); });
  folder.addButton({ title: 'Update' }).on('click', () => { world.update(0, world._frameTimeMS || (1000 / 60)); });

  events.once(SceneEvents.SHUTDOWN, () => {
    folder.dispose();
  });

  return folder;
}

export function addMatterPhysicsWorld (world, pane) {
  const { events } = world.scene.sys;
  const folder = pane.addFolder({ title: 'Matter Physics', expanded: false });
  folder.addInput(world, 'autoUpdate');
  folder.addInput(world, 'correction', { min: 0.1, max: 1, step: 0.05 });
  folder.addInput(world, 'enabled');
  folder.addInput(world.localWorld, 'gravity');
  folder.addInput(world.localWorld.gravity, 'scale', { label: 'gravity scale', min: 0, max: 0.1, step: 0.001 });
  if (world.debugGraphic) {
    folder.addInput(world.debugGraphic, 'visible', { label: 'debug' });
  }
  folder.addButton({ title: 'Pause' }).on('click', () => { world.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { world.resume(); });
  folder.addButton({ title: 'Step' }).on('click', () => { world.step(); });

  events.once(SceneEvents.SHUTDOWN, () => {
    folder.dispose();
  });

  return folder;
}
