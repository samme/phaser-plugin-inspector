
/* global Phaser, PhaserPluginInspector */

const { AddSound } = PhaserPluginInspector;

function preload () {
  this.load.audio('music', 'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/Overture.mp3');
}

function create () {
  const music = this.sound.add('music');
  music.play();

  const { pane } = this.inspectorScene;

  AddSound(music, pane);

  this.scene.remove();
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableWebAudio: true
  }
});
