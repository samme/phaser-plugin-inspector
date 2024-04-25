/* global Phaser, PhaserPluginInspector */

const { AddGameObject, AddFXComponent, AddFXController } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  create () {
    const graphics = this.add.graphics().setName('with glow and wipe postFX');

    graphics.fillStyle(0xffff00, 1);
    graphics.fillRect(100, 100, 256, 256);

    graphics.fillStyle(0xff00ff, 1);
    graphics.fillRect(300, 200, 256, 256);

    graphics.fillStyle(0x00ff00, 1);
    graphics.fillTriangle(200, 200, 400, 50, 500, 300);

    const glow = graphics.postFX.addGlow();
    const wipe = graphics.postFX.addWipe();

    wipe.progress = 0.25;

    const { pane } = this.inspectorGame;

    AddFXController(glow, pane);
    AddFXController(wipe, pane);

    // Only `clear()` is useful:
    AddFXComponent(graphics.postFX, pane, { title: 'Post FX (always active, always enabled)' });

    AddGameObject(graphics, pane);
  }
}

// eslint-disable-next-line no-new
new Phaser.Game({
  // type: Phaser.CANVAS,
  width: 800,
  height: 600,
  scene: Example,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableAudio: true
  }
});
