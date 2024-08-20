/* global Phaser */

const { assert } = chai;

mocha.setup('bdd');

describe('Phaser', function () {
  it('is an object', function () {
    assert.isObject(Phaser);
  });

  it('is the required version', function () {
    assert.propertyVal(Phaser, 'VERSION', '3.80.1');
  });
});

describe('new Game', function () {
  let game;

  afterEach(function () {
    game.destroy(true);
    game.runDestroy();
    game = null;
  });

  describe('Load script and install', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        scene: [
          {
            key: 'scene1',

            map: {},

            physics: {
              arcade: {},
              matter: {}
            },

            init: function () {
              this.sys.scenePlugin.start('preload');
            }
          },
          {
            key: 'preload',

            map: {},

            physics: {
              arcade: {},
              matter: {}
            },

            preload: function () {
              this.sys.load.scripts('inspector', ['../vendor/tweakpane.js', '../dist/phaser-plugin-inspector.umd.js']);
              this.sys.load.once('complete', function () {
                // eslint-disable-next-line no-undef
                PhaserPluginInspector.Install(this.sys.plugins);
                done();
              }, this);
            },

            create: function () {
              this.sys.scenePlugin.start('scene2');
            }
          },
          { key: 'scene2', map: {}, physics: { arcade: {}, matter: {} } },
          { key: 'scene3', map: {}, physics: { arcade: {}, matter: {} } }
        ]
      });
    });
  });
});

// mocha.checkLeaks();
mocha.globals(['Phaser']);
mocha.run();
