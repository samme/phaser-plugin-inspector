
/* global Phaser, PhaserPluginInspector */

const { AddSound } = PhaserPluginInspector;

function preload () {
  this.load.image('bg', 'assets/pics/cougar-dragonsun.png');

  this.load.spritesheet('button', 'assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

  this.load.bitmapFont('nokia', 'assets/fonts/bitmap/nokia16black.png', 'assets/fonts/bitmap/nokia16black.xml');

  this.load.audio('sfx', [
    'assets/audio/SoundEffects/magical_horror_audiosprite.ogg',
    'assets/audio/SoundEffects/magical_horror_audiosprite.mp3'
  ]);
}

function create () {
  this.add.image(400, 300, 'bg');

  const fx = this.sound.add('sfx');

  const markers = [
    { name: 'charm', start: 0, duration: 2.7, config: {} },
    { name: 'curse', start: 4, duration: 2.9, config: {} },
    { name: 'fireball', start: 8, duration: 5.2, config: {} },
    { name: 'spell', start: 14, duration: 4.7, config: {} },
    { name: 'soundscape', start: 20, duration: 18.8, config: {} }
  ];

  for (const marker of markers) {
    fx.addMarker(marker);
  }

  AddSound(fx, this.inspectorGame.pane);
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { preload, create },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableWebAudio: true
  }
});
