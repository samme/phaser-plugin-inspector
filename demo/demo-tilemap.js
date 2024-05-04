/* global PhaserPluginInspector, Tweakpane */

const { AddAlpha, AddVisible, AddGameObject } = PhaserPluginInspector;

const pane = new Tweakpane.Pane({ title: 'Tilemap Demo' });

class Example extends Phaser.Scene {
  preload () {
    this.load.image('kenny_platformer_64x64', 'assets/tilemaps/tiles/kenny_platformer_64x64.png');
    this.load.tilemapTiledJSON('multiple-layers-map', 'assets/tilemaps/maps/multiple-layers.json');
  }

  create () {
    this.map = this.make.tilemap({ key: 'multiple-layers-map' });

    const tiles = this.map.addTilesetImage('kenny_platformer_64x64');

    const grid = this.add.grid(
      0, 0,
      this.map.widthInPixels, this.map.heightInPixels,
      this.map.tileWidth, this.map.tileHeight,
      0, 1,
      0xffff00, 1
    ).setAlpha(0.2).setOrigin(0, 0);

    for (const layer of this.map.layers) {
      this.map.createLayer(layer.name, tiles).setName(layer.name);
    }

    this.map.getLayer('Water Layer').tilemapLayer.setAlpha(0.8);

    const tilemapLayers = this.map.layers.map(l => l.tilemapLayer);

    AddAlpha([grid, ...tilemapLayers], pane);
    AddVisible([grid, ...tilemapLayers], pane);

    for (const tilemapLayer of tilemapLayers) {
      AddGameObject(tilemapLayer, pane, { title: tilemapLayer.name, expanded: false });
    }

    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 1
    };

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  }

  update (time, delta) {
    this.controls.update(delta);
  }
}

const config = {
  width: 1024,
  height: 1024,
  pixelArt: true,
  scene: Example
};

// eslint-disable-next-line no-new
new Phaser.Game(config);
