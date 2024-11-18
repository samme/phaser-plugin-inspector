const { AddFilterController } = PhaserPluginInspector;

const pane = new Tweakpane.Pane({ title: 'Mask' });

class Example extends Phaser.Scene {
  preload () {
    this.load.image('bg', 'assets/pics/thorn-lazur.png');
    this.load.image('face', 'assets/pics/archmage-in-your-face.png');
    this.load.image('glass', 'assets/particles/glass.png');
  }

  create () {
    // Add a face.
    this.face = this.add.image(640, 360, 'face')
      .setScale(1);

    this.faceFilters = this.add.renderFilters(this.face);

    // Add an ellipse over the mouth.
    const ellipse = this.add.ellipse(640, 520, 180, 240, 0xff0000);

    // Add a particle emitter emitting shards.
    // This is aligned to the center of the ellipse.
    const emitter = this.add.particles(640, 520, 'glass', {
      rotate: { min: 0, max: 360 },
      speed: { min: 100, max: 150 },
      lifespan: 5000,
      quantity: 1
    });

    // Combine ellipse and particles in a container.
    const container = this.add.container(0, 0)
      .setVisible(false);
    container.add(ellipse);
    container.add(emitter);

    const mask = this.cameras.main.filters.external.addMask(container);

    AddFilterController(mask, pane);
  }
}

new Phaser.Game({
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  parent: 'phaser-example',
  scene: Example
});
