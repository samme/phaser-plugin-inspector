/* global PhaserPluginInspector, Tweakpane */

const { AddTimeline } = PhaserPluginInspector;

class Example extends Phaser.Scene {
  preload () {
    this.load.atlas('timeline', 'assets/atlas/timeline.png', 'assets/atlas/timeline.json');
    this.load.image('bg', 'assets/skies/spookysky.jpg');
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
  }

  create () {
    this.add.image(400, 300, 'bg');

    const crystalball = this.add.sprite(400, 800, 'timeline', 'crystalball');

    const glowFX = crystalball.preFX.addGlow();

    const emitter = this.add.particles(400, 300, 'flares', {
      frame: 'white',
      blendMode: 'ADD',
      lifespan: 1200,
      gravityY: -100,
      scale: { start: 0.3, end: 0 },
      emitting: false
    });

    emitter.addEmitZone({ source: new Phaser.Geom.Circle(0, -20, 90) });

    const timeline = this.add.timeline([
      {
        at: 0,
        run: () => {
          glowFX.setActive(false);
          glowFX.outerStrength = 0;
          glowFX.innerStrength = 0;
        },
        tween: {
          targets: crystalball,
          y: 300,
          ease: 'sine.in',
          duration: 750
        }
      },
      {
        at: 1000,
        run: () => {
          glowFX.setActive(true);
          emitter.start();
        },
        tween: {
          targets: glowFX,
          outerStrength: 16,
          innerStrength: 8,
          ease: 'sine.in',
          yoyo: true,
          duration: 500,
          repeat: 3
        }
      },
      {
        at: 4000,
        run: () => {
          emitter.stop();
        },
        tween: {
          targets: crystalball,
          y: 800,
          ease: 'sine.in',
          duration: 500
        }
      },
      {
        at: 5000,
        stop: true
      }
    ]);

    AddTimeline(timeline, pane);

    timeline.play();
  }
}

const config = {
  width: 800,
  height: 600,
  scene: Example
};

const pane = new Tweakpane.Pane({ title: 'Timeline Demo' });

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
