const { AddFilterController, AddGameObject } = PhaserPluginInspector;

const pane = new Tweakpane.Pane({ title: 'Camera Filters' });

class Example extends Phaser.Scene {
  preload () {
    this.load.image('phaser-logo', 'assets/sprites/phaser3-logo-x2.png');
  }

  create () {
    const img = this.add.image(640, 360, 'phaser-logo').setName('logo');

    img.enableFilters();

    const barrel = img.filters.external.addBarrel();

    barrel.amount = 0.866;

    AddFilterController(barrel, pane);
    AddGameObject(img, pane);
  }
}

new Phaser.Game({
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  parent: 'phaser-example',
  scene: Example
});
