
/* global Phaser, PhaserPluginInspector */

const { AddInput } = PhaserPluginInspector;

function preload () {
  this.load.image('ayu', 'assets/pics/ayu2.png');
  this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
}

function create () {
  const { pane } = this.inspectorGame;
  const zone = this.add.image(500, 300, 'ayu').setInteractive({ dropZone: true }).setName('ayu');
  const image = this.add.sprite(200, 300, 'eye').setInteractive({ draggable: true, cursor: 'grab' }).setName('eye');

  AddInput(zone.input, pane);
  AddInput(image.input, pane);

  this.input.on('dragstart', function (pointer, gameObject) {
    gameObject.setTint(0xff00ff);
  });

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.input.on('dragend', function (pointer, gameObject) {
    gameObject.clearTint();
  });

  this.input.on('dragenter', function (pointer, gameObject, dropZone) {
    dropZone.setTint(0x00ff00);
  });

  this.input.on('dragleave', function (pointer, gameObject, dropZone) {
    dropZone.clearTint();
  });

  this.input.on('drop', function (pointer, gameObject, dropZone) {
    gameObject.x = dropZone.x;
    gameObject.y = dropZone.y;

    dropZone.clearTint();
  });
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create },
  plugins: PhaserPluginInspector.DefaultPluginsConfig
});
