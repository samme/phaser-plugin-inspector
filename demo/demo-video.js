/* global Phaser, PhaserPluginInspector */

const { AddGameObject, AddVideo } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  preload () {
    this.load.video('spaceace', 'assets/video/spaceace.mp4');
    this.load.video('underwater', 'assets/video/underwater.mp4');
  }

  create () {
    const intro = this.add.video(360, 240, 'underwater').setName('intro');

    intro.on('locked', () => {
      const message = this.add.text(360, 120, '👆 Click to play video', { font: '32px Courier', fill: '#00ff00' }).setShadow(1, 1).setOrigin(0.5);

      intro.on('unlocked', () => {
        message.destroy();
      });
    });

    intro.play();

    AddVideo(intro, this.inspectorScene.pane);
    AddGameObject(intro, this.inspectorScene.pane);
  }
}

// eslint-disable-next-line no-new
new Phaser.Game({
  width: 720,
  height: 480,
  scene: Example,
  plugins: PhaserPluginInspector.DefaultPluginsConfig
});
