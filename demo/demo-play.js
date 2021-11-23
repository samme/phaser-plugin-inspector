
/* global Phaser, PhaserPluginInspector */

function preload () {
  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create () {
  const sky = this.add.image(400, 300, 'sky');

  sky.setInteractive({ draggable: true }).on('drag', function (pointer, x, y) { this.setPosition(x, y); });

  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
    frequency: 25,
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const ghost = this.physics.add.image(400, 150, 'logo')
    .setAlpha(0.2);

  ghost.body.setAllowGravity(false);

  const logo = this.physics.add.image(400, 150, 'logo')
    .setVelocity(100, 200)
    .setBounce(1, 1)
    .setCollideWorldBounds(true);

  this.physics.add.overlap(ghost, logo);

  emitter.startFollow(logo);

  const { folder } = this.inspectorScene;

  addGameObjectFolder(sky, folder);
  addGameObjectFolder(logo, folder);
  addEmitterFolder(emitter, folder);
}

function addGameObjectFolder (gameObject, parent) {
  const folder = parent.addFolder({ title: `${gameObject.type} ${gameObject.name}` });

  folder.addMonitor(gameObject, 'x');
  folder.addMonitor(gameObject, 'y');
  folder.addInput(gameObject, 'alpha', { min: 0, max: 1, step: 0.1 });

  gameObject.once('destroy', () => { folder.dispose(); });

  return folder;
}

function addEmitterFolder (emitter, parent) {
  const folder = parent.addFolder({ title: 'Particle Emitter' });

  folder.visible = true;

  folder.addMonitor(emitter, 'active');
  folder.addInput(emitter, 'visible');
  folder.addInput(emitter, 'blendMode', { options: Phaser.BlendModes });
  folder.addInput(emitter, 'frequency', { min: -1, max: 1000 });
  folder.addMonitor(emitter.alive, 'length', { view: 'graph', min: 0, max: 100, label: 'alive' });
  folder.addMonitor(emitter.dead, 'length', { view: 'graph', min: 0, max: 100, label: 'dead' });

  folder.addButton({ title: 'Start' }).on('click', () => { emitter.start(); });
  folder.addButton({ title: 'Stop' }).on('click', () => { emitter.stop(); });
  folder.addButton({ title: 'Pause' }).on('click', () => { emitter.pause(); });
  folder.addButton({ title: 'Resume' }).on('click', () => { emitter.resume(); });
  folder.addButton({ title: 'To JSON' }).on('click', () => { console.log(emitter.toJSON()); });

  return folder;
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  loader: {
    baseURL: 'https://labs.phaser.io',
    crossOrigin: 'anonymous'
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
});
