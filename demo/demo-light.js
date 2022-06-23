/* global Phaser, PhaserPluginInspector */

const { AddLight } = PhaserPluginInspector;

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.WEBGL,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  scene: { preload, create }
});

function preload () {
  this.load.image('robot', ['assets/pics/equality-by-ragnarok.png', 'assets/normal-maps/equality-by-ragnarok_n.png']);
  this.load.image('atari', 'assets/sprites/atari400.png');
}

function create () {
  this.lights.enable().setAmbientColor(0x333333);

  const robot = this.add.image(-100, 0, 'robot').setOrigin(0).setScale(0.7);

  robot.setPipeline('Light2D');

  const light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

  AddLight(light, this.inspectorScene.pane);
}
