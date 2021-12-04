import Phaser from 'phaser';

const TAU = 2 * Math.PI;
const CacheNames = ['audio', 'binary', 'bitmapFont', 'html', 'json', 'obj', 'physics', 'shader', 'text', 'tilemap', 'video', 'xml'];
const CameraEvents = Phaser.Cameras.Scene2D.Events;
const SceneEvents = Phaser.Scenes.Events;
const GameObjectEvents = Phaser.GameObjects.Events;
const { BlendModes } = Phaser;

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

export function AddPointer (pointer, pane) {
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

export function AddSound (sound, pane) {
  const folder = pane.addFolder({ title: `Sound “${sound.key}”`, expanded: false });

  sound.once('destroy', () => { folder.dispose(); });

  if (sound.currentMarker) {
    folder.addMonitor(sound.currentMarker, 'name');
  }

  folder.addMonitor(sound, 'duration');
  folder.addMonitor(sound, 'isPaused');
  folder.addMonitor(sound, 'isPlaying');
  folder.addMonitor(sound, 'seek');
  folder.addMonitor(sound, 'totalDuration');

  folder.addInput(sound, 'loop');
  folder.addInput(sound, 'mute');
  folder.addInput(sound, 'volume', { min: 0, max: 1 });

  folder.addButton({ title: 'Play' }).on('click', () => { console.info('Play sound “%s”', sound.key); sound.play(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause sound “%s”', sound.key); sound.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume sound “%s”', sound.key); sound.resume(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop sound “%s”', sound.key); sound.stop(); });
  folder.addButton({ title: 'Remove' }).on('click', () => { console.info('Remove sound “%s”', sound.key); sound.destroy(); });

  for (const name in sound.markers) {
    folder.addButton({ title: `Play “${name}”` }).on('click', () => { console.info('Play sound “%s” marker “%s”', sound.key, name); sound.play(name); });
  }

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

export function AddCamera (camera, pane) {
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
    folder.dispose();
  });

  return folder;
}

export function AddArcadePhysicsWorld (world, pane) {
  const { arcadePhysics, events } = world.scene.sys;
  const folder = pane.addFolder({ title: 'Arcade Physics', expanded: false });

  folder.addMonitor(world.bodies, 'size', { label: 'bodies' });
  folder.addInput(world, 'fixedStep');
  folder.addInput(world, 'forceX');
  folder.addInput(world, 'fps', { min: 5, max: 300, step: 5 }).on('change', ({ value }) => { world.setFPS(value); });
  folder.addMonitor(world, '_frameTimeMS');
  folder.addInput(world, 'gravity', { x: { min: -1000, max: 1000 }, y: { min: -1000, max: 1000 } });
  folder.addInput(world, 'isPaused');
  folder.addInput(world, 'OVERLAP_BIAS', { label: 'overlap bias', min: 0, max: 32, step: 1 });
  folder.addMonitor(world.staticBodies, 'size', { label: 'staticBodies' });
  folder.addInput(world, 'TILE_BIAS', { label: 'tile bias', min: 0, max: 32, step: 1 });
  folder.addInput(world, 'timeScale', { min: 0.1, max: 10, step: 0.1 });
  folder.addInput(world, 'useTree');
  if (world.debugGraphic) {
    folder.addInput(world.debugGraphic, 'visible', { label: 'debug' });
  }
  folder.addButton({ title: 'Enable update' }).on('click', () => { arcadePhysics.enableUpdate(); });
  folder.addButton({ title: 'Disable update' }).on('click', () => { arcadePhysics.disableUpdate(); });
  folder.addButton({ title: 'Update' }).on('click', () => { world.update(0, world._frameTimeMS || (1000 / 60)); });
  folder.addButton({ title: 'Print colliders' }).on('click', () => { console.info('Colliders', world.colliders.getActive()); });

  events.once(SceneEvents.SHUTDOWN, () => {
    folder.dispose();
  });

  return folder;
}

export function AddMatterPhysicsWorld (world, pane) {
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

export function AddGameObject (obj, pane, options = { title: `${obj.type} “${obj.name}”` }) {
  const folder = pane.addFolder(options);

  folder.addInput(obj, 'active');
  folder.addMonitor(obj, 'cameraFilter');
  folder.addMonitor(obj, 'state');

  if ('alpha' in obj) {
    folder.addInput(obj, 'alpha', { min: 0, max: 1, step: 0.05 });
  }

  if ('blendMode' in obj) {
    folder.addInput(obj, 'blendMode', { options: BlendModes });
  }

  if ('depth' in obj) {
    folder.addMonitor(obj, 'depth');
  }

  if ('width' in obj) {
    folder.addMonitor(obj, 'width');
    folder.addMonitor(obj, 'height');
  }

  if ('displayWidth' in obj) {
    folder.addMonitor(obj, 'displayWidth');
    folder.addMonitor(obj, 'displayHeight');
  }

  if ('originX' in obj) {
    folder.addMonitor(obj, 'originX');
    folder.addMonitor(obj, 'originY');
  }

  if ('displayOriginX' in obj) {
    folder.addMonitor(obj, 'displayOriginX');
    folder.addMonitor(obj, 'displayOriginY');
  }

  if ('scaleX' in obj) {
    folder.addMonitor(obj, 'scaleX');
    folder.addMonitor(obj, 'scaleY');
    folder.addInput(obj, 'scale', { min: 0.1, max: 10, step: 0.1 });
  }

  if ('flipX' in obj) {
    folder.addInput(obj, 'flipX');
    folder.addInput(obj, 'flipY');
  }

  if ('angle' in obj) {
    folder.addMonitor(obj, 'angle');
  }

  if ('rotation' in obj) {
    folder.addInput(obj, 'rotation', { min: 0, max: TAU, step: 0.01 * TAU });
  }

  if ('visible' in obj) {
    folder.addInput(obj, 'visible');
  }

  if ('x' in obj) {
    folder.addMonitor(obj, 'x');
    folder.addMonitor(obj, 'y');
    folder.addMonitor(obj, 'z');
    folder.addMonitor(obj, 'w');
  }

  if ('children' in obj && 'length' in obj.children) {
    folder.addMonitor(obj.children, 'length');
  }

  folder.addButton({ title: 'Destroy' }).on('click', () => { obj.destroy(); });

  obj.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddGroup (group, pane, options = { title: `${group.type} ${group.name}` }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(group.getChildren(), 'length', { view: 'graph', min: 0, max: group.maxSize === -1 ? 100 : group.maxSize });
  folder.addMonitor(group, 'maxSize');

  folder.addButton({ title: 'Clear' }).on('click', () => { console.info('Clear group'); group.clear(); });
  folder.addButton({ title: 'Destroy' }).on('click', () => { console.info('Destroy group'); group.destroy(); });
  folder.addButton({ title: 'Destroy group members' }).on('click', () => { console.info('Destroy group members'); group.clear(true, true); });

  group.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddParticleEmitter (emitter, pane, options = { title: 'Particle Emitter' }) {
  const folder = pane.addFolder(options);

  const max = emitter.maxParticles || 100;

  folder.addMonitor(emitter, 'active');
  folder.addMonitor(emitter, 'on');
  folder.addInput(emitter, 'visible');
  folder.addInput(emitter, 'blendMode', { options: BlendModes });
  folder.addInput(emitter, 'frequency', { min: -1, max: 1000 });
  folder.addMonitor(emitter.alive, 'length', { view: 'graph', min: 0, max: max, label: 'alive' });
  folder.addMonitor(emitter.dead, 'length', { view: 'graph', min: 0, max: max, label: 'dead' });
  folder.addInput(emitter, 'collideBottom');
  folder.addInput(emitter, 'collideLeft');
  folder.addInput(emitter, 'collideRight');
  folder.addInput(emitter, 'collideTop');
  folder.addMonitor(emitter, 'currentFrame');
  folder.addMonitor(emitter, 'maxParticles');
  folder.addInput(emitter, 'moveTo');
  folder.addInput(emitter, 'particleBringToTop');
  folder.addInput(emitter, 'radial');
  folder.addInput(emitter, 'randomFrame');
  folder.addInput(emitter, 'timeScale', { min: 0.1, max: 10, step: 0.1 });

  folder.addButton({ title: 'Start' }).on('click', () => { emitter.start(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { emitter.stop(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { emitter.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { emitter.resume(); });
  folder.addButton({ title: 'Print JSON' }).on('click', () => { console.log(JSON.stringify(emitter.toJSON())); });

  emitter.manager.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddTween (tween, pane, options = { title: 'Tween' }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(tween, 'countdown');
  folder.addMonitor(tween, 'duration');
  folder.addMonitor(tween, 'elapsed');
  folder.addMonitor(tween, 'loop');
  folder.addMonitor(tween, 'loopCounter');
  folder.addMonitor(tween, 'state');
  folder.addMonitor(tween, 'timeScale', { min: 0.1, max: 10, step: 0.1 });
  folder.addMonitor(tween, 'totalData');
  folder.addMonitor(tween, 'totalDuration');
  folder.addMonitor(tween, 'totalElapsed');
  folder.addMonitor(tween, 'totalProgress', { view: 'graph', min: 0, max: 1 });

  for (const dat of tween.data) {
    // `start` and `end` not set yet :(

    folder.addMonitor(dat, 'progress', { view: 'graph', min: 0, max: 1, label: `${dat.key} progress` });
    folder.addMonitor(dat, 'current', { label: `${dat.key} current` });
    // folder.addMonitor(dat, 'start', { label: `${dat.key} start` });
    // folder.addMonitor(dat, 'end', { label: `${dat.key} end` });
  }

  folder.addButton({ title: 'Play' }).on('click', () => { console.info('Play tween'); tween.play(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause tween'); tween.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume tween'); tween.resume(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop tween'); tween.stop(); });
  folder.addButton({ title: 'Restart' }).on('click', () => { console.info('Restart tween'); tween.restart(); });
  folder.addButton({ title: 'Remove' }).on('click', () => { console.info('Remove tween'); tween.remove(); });

  return folder;
}

export function AddTimeline (timeline, pane, options = { title: 'Timeline' }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(timeline, 'duration');
  folder.addMonitor(timeline, 'elapsed');
  folder.addMonitor(timeline, 'state');
  folder.addMonitor(timeline, 'totalData');
  folder.addMonitor(timeline, 'totalDuration');
  folder.addMonitor(timeline, 'totalElapsed');
  folder.addMonitor(timeline, 'totalProgress', { view: 'graph', min: 0, max: 1 });

  // TODO

  return folder;
}

export function AddTimerEvent (timer, pane, options = { title: 'Timer Event' }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(timer, 'elapsed', { view: 'graph', min: 0, max: timer.delay });
  folder.addMonitor(timer, 'elapsed');
  folder.addMonitor(timer, 'hasDispatched');
  folder.addMonitor(timer, 'loop');
  folder.addMonitor(timer, 'paused');
  folder.addMonitor(timer, 'repeat');
  folder.addMonitor(timer, 'repeatCount');

  folder.addButton({ title: 'Remove' }).on('click', () => { timer.remove(); });
  folder.addButton({ title: 'Reset' }).on('click', () => { timer.reset(); });

  return folder;
}

export function AddInput (input, pane, options = { title: `Input (${input.gameObject.type} “${input.gameObject.name}”)` }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(input, 'alwaysEnabled');
  folder.addMonitor(input, 'cursor');
  folder.addMonitor(input, 'customHitArea');
  folder.addMonitor(input, 'draggable');
  folder.addMonitor(input, 'dragStartX');
  folder.addMonitor(input, 'dragStartXGlobal');
  folder.addMonitor(input, 'dragStartY');
  folder.addMonitor(input, 'dragStartYGlobal');
  folder.addMonitor(input, 'dragState');
  folder.addMonitor(input, 'dragX');
  folder.addMonitor(input, 'dragY');
  folder.addMonitor(input, 'dropZone');
  folder.addMonitor(input, 'enabled');
  folder.addMonitor(input, 'localX');
  folder.addMonitor(input, 'localY');

  input.gameObject.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddArcadeBody (body, pane, options = { title: `Body (${body.gameObject.type} “${body.gameObject.name}”)` }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(body, 'enable');
  folder.addInput(body, 'debugShowBody');
  folder.addInput(body, 'debugShowVelocity');
  folder.addInput(body, 'debugBodyColor', { view: 'color' });
  folder.addMonitor(body.velocity, 'x', { label: 'velocity x' });
  folder.addMonitor(body.velocity, 'y', { label: 'velocity y' });
  folder.addMonitor(body, 'speed');
  folder.addMonitor(body, 'angle');
  folder.addMonitor(body, '_dx', { label: 'deltaX' });
  folder.addMonitor(body, '_dy', { label: 'deltaY' });
  folder.addMonitor(body, '_tx', { label: 'deltaXFinal' });
  folder.addMonitor(body, '_ty', { label: 'deltaYFinal' });

  body.gameObject.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddAnimationState (anim, pane, options = { title: `Animation (${anim.parent.type} “${anim.parent.name}”)` }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(anim, 'delay');
  folder.addMonitor(anim, 'duration');
  folder.addMonitor(anim, 'forward');
  folder.addMonitor(anim, 'frameRate');
  folder.addMonitor(anim, 'hasStarted');
  folder.addMonitor(anim, 'isPaused');
  folder.addMonitor(anim, 'isPlaying');
  folder.addMonitor(anim, 'msPerFrame');
  folder.addMonitor(anim, 'repeat');
  folder.addMonitor(anim, 'repeatCounter');
  folder.addMonitor(anim, 'repeatDelay');
  folder.addMonitor(anim, 'timeScale');
  folder.addMonitor(anim, 'timeScale');
  folder.addMonitor(anim, 'yoyo');

  folder.addButton({ title: 'Play' }).on('click', () => { console.info('Play animation'); anim.play(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { console.info('Stop animation'); anim.stop(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { console.info('Pause animation'); anim.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { console.info('Resume animation'); anim.resume(); });
  folder.addButton({ title: 'Restart' }).on('click', () => { console.info('Restart animation'); anim.restart(); });

  anim.parent.once(GameObjectEvents.DESTROY, () => { folder.dispose(); });

  return folder;
}

export function AddKey (key, pane, options = { title: `Key (${key.keyCode})` }) {
  const folder = pane.addFolder(options);

  folder.addMonitor(key, 'duration');
  folder.addInput(key, 'emitOnRepeat');
  folder.addInput(key, 'enabled');
  folder.addMonitor(key, 'isDown');
  folder.addMonitor(key, 'isUp');
  folder.addMonitor(key, 'location');
  folder.addMonitor(key, 'repeats');
  folder.addMonitor(key, 'timeDown');
  folder.addMonitor(key, 'timeUp');

  folder.addButton({ title: 'Destroy' }).on('click', () => { console.info('Destroy key'); key.destroy(); folder.dispose(); });

  return folder;
}

export function AddKeys (keys, pane, options = { title: 'Keys' }) {
  const folder = pane.addFolder(options);

  for (const name in keys) {
    const key = keys[name];

    folder.addMonitor(key, 'isDown', { label: `${name} isDown` });
  }

  return folder;
}
