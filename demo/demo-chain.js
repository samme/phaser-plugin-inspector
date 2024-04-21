/* global PhaserPluginInspector, Tweakpane */

const { AddChain, AddTween } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  preload () {
    this.load.atlas('assets', 'assets/atlas/tweenparts.png', 'assets/atlas/tweenparts.json');
  }

  create () {
    const chest = this.add.image(400, 600, 'assets', 'blue-closed').setOrigin(0.5, 1);
    const key = this.add.image(-200, 300, 'assets', 'simple-key-gold');

    const chain1 = this.tweens.chain({
      targets: chest,
      tweens: [
        {
          y: 470,
          scaleX: 0.7,
          duration: 300,
          ease: 'quad.out'
        },
        {
          y: 600,
          scaleX: 1,
          duration: 1000,
          ease: 'bounce.out'
        }
      ],
      loop: -1,
      loopDelay: 300
    });

    const chain2 = this.tweens.chain({
      paused: true,
      targets: key,
      tweens: [
        {
          x: 200,
          duration: 300,
          ease: 'quad.out',
          delay: 500
        },
        {
          angle: 360,
          duration: 200,
          ease: 'linear',
          repeat: 4
        },
        {
          angle: 270,
          duration: 200,
          ease: 'linear'
        },
        {
          scale: 0.65,
          y: 380,
          duration: 200,
          ease: 'power2'
        },
        {
          x: 410,
          duration: 300,
          ease: 'bounce.out'
        },
        {
          targets: chest,
          texture: ['assets', 'blue-open'],
          duration: 100
        },
        {
          alpha: 0,
          duration: 400,
          ease: 'linear'
        }
      ]
    });

    AddChain(chain1, pane);
    AddChain(chain2, pane);

    this.input.once('pointerdown', () => {
      chain1.completeAfterLoop(0);
      chain2.play();
      this.openChest(chest, key);
    });
  }

  openChest (chest, key) {
    const tween = this.tweens.add({
      targets: chest,
      x: 550,
      ease: 'power3',
      duration: 500
    });

    AddTween(tween, pane);
  }
}

const config = {
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  scene: Example
};

const pane = new Tweakpane.Pane({ title: 'Chains' });

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
