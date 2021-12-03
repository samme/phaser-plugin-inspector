
/* global Phaser, PhaserPluginInspector */

console.info(PhaserPluginInspector);
// console.info('{ %s }', Object.keys(PhaserPluginInspector).sort().join(', '));

const { AddArcadeBody, AddGameObject, AddGroup, AddInput, AddParticleEmitter, AddTimerEvent, AddTween } = PhaserPluginInspector;

function preload () {
  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create () {
  const sky = this.add.image(400, 300, 'sky')
    .setName('sky')
    .setState('dark')
    .setInteractive({ cursor: 'grab', draggable: true })
    .on('drag', function (pointer, dragX, dragY) { this.setPosition(dragX, dragY); });

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

  const logo = this.physics.add.image(400, 100, 'logo')
    .setName('logo')
    .setVelocity(100, 200)
    .setBounce(1, 1)
    .setCollideWorldBounds(true);

  this.physics.add.overlap(ghost, logo);

  emitter.startFollow(logo);

  const group = this.add.group([sky, logo]).setName('sky and logo');

  const tween = this.tweens.add({
    targets: logo,
    props: { alpha: { from: 1, to: 0.5, repeat: 9, yoyo: true, ease: 'Quad.easeInOut' }, angle: { from: 0, to: 360, duration: 20000 } }
  });

  const timer = this.time.delayedCall(10000, () => { emitter.stop(); });

  emitter.startFollow(logo);

  const { folder } = this.inspectorScene;

  AddTimerEvent(timer, folder);
  AddTween(tween, folder);
  AddGroup(group, folder);
  AddGameObject(sky, folder);
  AddInput(sky.input, folder);
  AddGameObject(logo, folder);
  AddArcadeBody(logo.body, folder);
  AddGameObject(particles, folder);
  AddParticleEmitter(emitter, folder);
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create },
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
