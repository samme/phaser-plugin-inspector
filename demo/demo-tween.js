
/* global Phaser, PhaserPluginInspector */

const { AddTween } = PhaserPluginInspector;

function preload () {
  this.load.image('block', 'assets/sprites/block.png');
}

function create () {
  const image1 = this.add.image(130, 50, 'block');
  const image2 = this.add.image(190, 80, 'block');
  const image3 = this.add.image(50, 150, 'block');

  const tween = this.tweens.add({
    targets: [image1, image2, image3],
    props: {
      x: { value: '+=600', duration: 3000, ease: 'Power2' },
      y: { value: '500', duration: 1500, ease: 'Bounce.easeOut' }
    },
    delay: 1000
  });

  const folder = AddTween(tween, this.inspectorScene.pane);

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
