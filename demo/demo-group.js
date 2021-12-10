/* global Phaser, PhaserPluginInspector, Tweakpane */

const { AddGroup } = PhaserPluginInspector;

const pane = new Tweakpane.Pane();

let group;

function preload () {
  this.load.image('space', 'assets/skies/space.jpg');
  this.load.spritesheet('alien', 'assets/tests/invaders/invader1.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create () {
  this.anims.create({
    key: 'creep',
    frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1
  });

  this.add.image(512, 384, 'space');

  group = this.add
    .group({
      defaultKey: 'alien',
      maxSize: 50,
      createCallback: function (alien) {
        alien.setName('alien' + this.getLength());
      },
      removeCallback: function (alien) {}
    })
    .setName('aliens');

  AddGroup(group, pane);

  this.time.addEvent({
    delay: 200,
    repeat: 199,
    callback: addAlien
  });
}

function update () {
  group.children.iterate(function (alien) {
    alien.y += 1;

    if (alien.y > 768) {
      group.killAndHide(alien);
    }
  });
}

function activateAlien (alien) {
  alien
    .setActive(true)
    .setVisible(true)
    .setTint(Phaser.Display.Color.RandomRGB().color)
    .play('creep');
}

function addAlien () {
  // Random position above screen
  const x = Phaser.Math.Between(0, 1024);
  const y = Phaser.Math.Between(-64, 0);

  // Find first inactive sprite in group or add new sprite, and set position
  const alien = group.get(x, y);

  // None free or already at maximum amount of sprites in group
  if (!alien) return;

  activateAlien(alien);
}

// eslint-disable-next-line no-new
new Phaser.Game({
  width: 800,
  height: 600,
  pixelArt: true,
  scene: { preload, create, update },
  audio: {
    disableAudio: true
  }
});
