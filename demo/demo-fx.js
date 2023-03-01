/* global Phaser, PhaserPluginInspector */

// eslint-disable-next-line no-unused-vars
const { AddGameObject, AddFXComponent, AddFXController } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  init () {
    console.log('renderer', this.renderer);
  }

  preload () {
    this.load.image('bg', 'assets/skies/space4.png');
    this.load.image('lollipop', 'assets/sprites/lollipop.png');
    this.load.image('gingerbread', 'assets/sprites/gingerbread.png');
    this.load.image('cake', 'assets/sprites/strawberry-cake.png');
  }

  create () {
    const preMethods = [
      'addBarrel',
      // 'addBloom',
      'addBlur',
      'addBokeh',
      'addCircle',
      // 'addColorMatrix',
      'addDisplacement',
      // 'addGlow',
      'addGradient',
      'addPixelate',
      'addReveal',
      'addShadow',
      'addShine',
      'addTiltShift',
      'addVignette',
      'addWipe'
    ];

    this.add.image(400, 300, 'bg');

    const preFXFolder = this.inspectorGame.pane.addFolder({ title: 'Pre Effects' });
    const goFolder = this.inspectorGame.pane.addFolder({ title: 'Game Objects' });
    const cakes = [];

    for (const m of preMethods) {
      const cake = this.add.image(0, 0, 'cake').setName(`cake ${m}`);
      cake.preFX.setPadding(8);
      const fx = cake.preFX[m]();
      AddFXController(fx, preFXFolder, { title: m });
      cakes.push(cake);
    }

    Phaser.Actions.GridAlign(cakes, { width: 6, cellWidth: 120, cellHeight: 150 });

    const lollipop = this.add.image(400, 400, 'lollipop').setName('lollipop');
    lollipop.preFX.setPadding(8);
    lollipop.preFX.addColorMatrix().grayscale();
    lollipop.preFX.addShadow();

    AddGameObject(lollipop, goFolder);
  }
}

// eslint-disable-next-line no-new
new Phaser.Game({
  width: 800,
  height: 600,
  pixelArt: true,
  scene: Example,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableAudio: true
  }
});
