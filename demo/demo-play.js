
/* global Phaser, PhaserPluginInspector */

console.info(PhaserPluginInspector);
// console.info('{ %s }', Object.keys(PhaserPluginInspector).sort().join(', '));

const { AddArcadeBody, AddCamera, AddGameObject, AddParticleEmitter } = PhaserPluginInspector;

let sky;

function init () {
  console.log('camera', this.cameras.main);
}

function preload () {
  this.load.image('sky', 'assets/skies/starfield.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create () {
  const camera = this.cameras.main;

  sky = this.add.tileSprite(0, 0, 1024, 768, 'sky')
    .setOrigin(0, 0)
    .setName('sky');

  const emitter = this.add.particles(0, 0, 'red', {
    name: 'red flares',
    frequency: 25,
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const ghost = this.physics.add.image(400, 150, 'logo')
    .setAlpha(0.2);

  ghost.body.setAllowGravity(false);

  const logo = this.physics.add.image(400, 100, 'logo')
    .setName('logo')
    .setVelocity(100, 200)
    .setBounce(1, 1)
    .setCollideWorldBounds(true);

  console.log('logo', logo);

  this.physics.add.overlap(ghost, logo);

  emitter.startFollow(logo);

  camera.filters.internal.addBlur();

  const { pane } = this.inspectorScene;

  AddCamera(camera, pane);
  AddGameObject(sky, pane);
  AddGameObject(logo, pane);
  AddArcadeBody(logo.body, pane);
  AddGameObject(emitter, pane);
  AddParticleEmitter(emitter, pane);
}

function update () {
  sky.tilePositionX += 1;
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { init, preload, create, update },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  }
});
