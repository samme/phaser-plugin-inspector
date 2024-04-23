/* global PhaserPluginInspector */

const { AddTimerEvent } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  preload () {
    this.load.atlas('timeline', 'assets/atlas/timeline.png', 'assets/atlas/timeline.json');
    this.load.image('bg', 'assets/skies/spookysky.jpg');
  }

  create () {
    // this.time.paused = true;

    this.add.image(400, 300, 'bg');

    const bat = this.add.sprite(200, 150, 'timeline', 'bat');

    const timer = this.time.addEvent({
      delay: 200,
      startAt: 0,
      repeat: 9,
      callback: () => {
        bat.angle += 36;
      }
    });

    AddTimerEvent(timer, this.inspectorGame.pane);
  }
}

const gameConfig = {
  width: 800,
  height: 600,
  scene: Example,
  plugins: PhaserPluginInspector.DefaultPluginsConfig
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
