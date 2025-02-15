
/* global Phaser, PhaserPluginInspector */

const { AddGameObject, AddParticleEmitter } = PhaserPluginInspector;

function preload () {
  this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
  this.load.image('bg', 'assets/skies/darkstone.png');
  this.load.image('flare', 'assets/particles/white-flare.png');
  this.load.image('fox', 'assets/pics/card3.png');
}

function create () {
  createGlowEmitter.call(this);
  createZoneEmitter.call(this);
}

function createGlowEmitter () {
  this.add.image(400, 300, 'bg');

  const card = this.add.image(400, 300, 'fox').setInteractive();

  const emitZone1 = { type: 'edge', source: card.getBounds(), quantity: 42 };

  const emitter = this.add.particles(0, 0, 'flare', {
    speed: 24,
    frequency: -1,
    lifespan: 2000,
    quantity: 100,
    maxParticles: 1000,
    scale: { start: 0.4, end: 0 },
    color: [0xffffff, 0x00ffff, 0x0000ff],
    emitZone: emitZone1,
    duration: 1000,
    emitting: false
  });

  card.on('pointerdown', () => {
    emitter.explode();
  });

  const { pane } = this.inspectorScene;

  AddParticleEmitter(emitter, pane);
  AddGameObject(emitter, pane);
}

function createZoneEmitter () {
  const shape1 = new Phaser.Geom.Circle(0, 0, 160);
  const shape2 = new Phaser.Geom.Ellipse(0, 0, 500, 150);
  const shape3 = new Phaser.Geom.Rectangle(-150, -150, 300, 300);
  const shape4 = new Phaser.Geom.Line(-150, -150, 150, 150);
  const shape5 = new Phaser.Geom.Triangle.BuildEquilateral(0, -140, 300);

  const emitter = this.add.particles(400, 300, 'flares', {
    blendMode: 'ADD',
    delay: 100,
    duration: 60000,
    frame: { frames: ['red', 'green', 'blue'], cycle: true },
    frequency: 25,
    hold: 200,
    lifespan: 600,
    maxAliveParticles: 100,
    name: 'cycling flares',
    scale: { start: 0.6, end: 0.1 }
  });

  emitter.addEmitZone({ type: 'edge', source: shape1, quantity: 32, total: 64 });
  emitter.addEmitZone({ type: 'edge', source: shape2, quantity: 32, total: 64 });
  emitter.addEmitZone({ type: 'edge', source: shape3, quantity: 32, total: 64 });
  emitter.addEmitZone({ type: 'edge', source: shape4, quantity: 32, total: 64 });
  emitter.addEmitZone({ type: 'edge', source: shape5, quantity: 32, total: 64 });

  emitter.createGravityWell({
    x: 0,
    y: 0,
    power: 2,
    epsilon: 200,
    gravity: 100
  });

  console.log('emitter', emitter);

  const { pane } = this.inspectorScene;

  AddParticleEmitter(emitter, pane);
  AddGameObject(emitter, pane);
}

function update () {
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create, update },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableAudio: true
  }
});
