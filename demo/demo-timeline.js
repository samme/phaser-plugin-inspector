
/* global Phaser, PhaserPluginInspector */

const { AddTimeline } = PhaserPluginInspector;

function preload () {
  this.load.image('block', 'assets/sprites/block.png');
}

function create () {
  this.add.image(100, 100, 'block').setAlpha(0.3);
  var image = this.add.image(100, 100, 'block');

  const timeline = this.tweens.timeline({
    targets: image,
    ease: 'Power1',
    totalDuration: 8000,
    tweens: [{ x: 600 }, { y: 500 }, { x: 100 }, { y: 100 }],
    paused: true
  });

  const folder = AddTimeline(timeline, this.inspectorScene.pane);

  this.events.once('shutdown', () => { folder.dispose(); });
}

function update () {
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create, update },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableWebAudio: true
  }
});
