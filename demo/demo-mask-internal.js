const { AddFilters } = PhaserPluginInspector;

const pane = new Tweakpane.Pane({ title: 'Mask' });

class Example extends Phaser.Scene {
  preload () {
    this.load.image('mask', 'assets/tests/camera/grunge-mask.png');
    this.load.image('rick', 'assets/sprites/rick.png');
    this.load.image('bars', 'assets/pics/purple-bars.jpg');
  }

  create () {
    const container = this.add.container(400, 300).setScale(1);

    container.enableFilters();

    container.filters.internal.addMask('mask');
    container.filters.external.addMask('mask');

    AddFilters(container.filters, pane);

    const grid = this.add.image(0, 0, 'bars').setAlpha(1);
    const sprite0 = this.add.sprite(-400, 0, 'rick');
    const sprite1 = this.add.sprite(0, 0, 'rick');
    const sprite2 = this.add.sprite(400, 0, 'rick');
    const sprite3 = this.add.sprite(-200, -200, 'rick');
    const sprite4 = this.add.sprite(200, -200, 'rick');
    const sprite5 = this.add.sprite(200, 200, 'rick');
    const sprite6 = this.add.sprite(-200, 200, 'rick');

    container.add([
      grid,
      sprite0,
      sprite1,
      sprite2,
      sprite3,
      sprite4,
      sprite5,
      sprite6
    ]);

    this.tweens.add({
      targets: container,
      angle: { value: 360, duration: 6000 },
      scaleX: {
        value: 0.5,
        duration: 3000,
        hold: 2000,
        yoyo: true,
        ease: 'Quad.easeInOut'
      },
      scaleY: {
        value: 0.5,
        duration: 3000,
        hold: 2000,
        yoyo: true,
        ease: 'Quad.easeInOut'
      },
      repeat: -1
    });
  }
}

new Phaser.Game({
  type: Phaser.WEBGL,
  backgroundColor: 0x00ffff,
  width: 800,
  height: 600,
  scene: Example
});
