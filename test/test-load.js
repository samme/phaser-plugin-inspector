/* global Phaser */

const { assert } = chai;

mocha.setup('bdd');

describe('Phaser', function () {
  it('is an object', function () {
    assert.isObject(Phaser);
  });

  it('is v3.55.2', function () {
    assert.propertyVal(Phaser, 'VERSION', '3.55.2');
  });
});

describe('new Game', function () {
  let n = 1;

  beforeEach(function () {
    console.group('test ' + n++);
  });

  afterEach(function () {
    console.groupEnd();
  });

  describe('Load script and install', function () {
    it('should not error', function (done) {
      new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        scene: [
          {
            map: {},

            preload: function () {
              this.sys.load.scripts('inspector', ['../vendor/tweakpane.js', '../dist/phaser-plugin-inspector.umd.js']);
              this.sys.load.once('complete', function () {
                // eslint-disable-next-line no-undef
                PhaserPluginInspector.Install(this.sys.plugins);
                done();
              }, this);
            }
          },
          { key: 'scene2' },
          { key: 'scene3' }
        ]
      });
    });
  });
});

// mocha.checkLeaks();
mocha.globals(['Phaser']);
mocha.run();
