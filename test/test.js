/* global Phaser, PhaserPluginInspector, Tweakpane */

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

describe('Tweakpane', function () {
  it('is an object', function () {
    assert.isObject(Tweakpane);
  });
});

describe('PhaserPluginInspector', function () {
  it('is an object', function () {
    assert.isObject(PhaserPluginInspector);
  });
});

describe('PhaserPluginInspector.DefaultPluginsConfig', function () {
  it('is an object', function () {
    assert.isObject(PhaserPluginInspector.DefaultPluginsConfig);
  });
});

describe('PhaserPluginInspector.InspectorGlobalPlugin', function () {
  it('is a function', function () {
    assert.isFunction(PhaserPluginInspector.InspectorGlobalPlugin);
  });
});

describe('PhaserPluginInspector.InspectorScenePlugin', function () {
  it('is a function', function () {
    assert.isFunction(PhaserPluginInspector.InspectorScenePlugin);
  });
});

describe('new Game', function () {
  let game;

  beforeEach(function () {
  });

  afterEach(function () {
    game.plugins.get('InspectorGlobalPlugin').destroy();
    game.plugins.removeGlobalPlugin('InspectorGlobalPlugin');
    game.plugins.removeScenePlugin('InspectorScenePlugin');
    game.destroy(true);
    game.runDestroy();
    game = null;
  });

  describe('Install with DefaultPluginsConfig', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        input: { activePointers: 0 },
        plugins: PhaserPluginInspector.DefaultPluginsConfig,
        callbacks: {
          postBoot: function (game) {
            assert.isObject(game.plugins.getEntry('InspectorGlobalPlugin'));
            assert.include(game.plugins.getDefaultScenePlugins(), 'InspectorScenePlugin');
            done();
          }
        },
        scene: {
          map: {},
          physics: { arcade: {}, matter: {} },
          init: function () {
            console.log('init', this);
            assert.property(this, 'inspectorGame');
            assert.property(this, 'inspectorScene');
            assert.notProperty(this.sys, 'inspectorGame');
            assert.property(this.sys, 'inspectorScene');
          }
        }
      });
    });
  });

  describe('Install with mappings', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        input: { activePointers: 0 },
        plugins: {
          global: [{ key: 'InspectorGlobalPlugin', plugin: PhaserPluginInspector.InspectorGlobalPlugin, mapping: 'inspectorGadget' }],
          scene: [{ key: 'InspectorScenePlugin', plugin: PhaserPluginInspector.InspectorScenePlugin, mapping: 'inspectorClouseau' }]
        },
        callbacks: {
          postBoot: function (game) {
            assert.isObject(game.plugins.getEntry('InspectorGlobalPlugin'));
            assert.include(game.plugins.getDefaultScenePlugins(), 'InspectorScenePlugin');
            done();
          }
        },
        scene: {
          map: {},
          physics: { arcade: {}, matter: {} },
          init: function () {
            console.log('init', this);
            assert.property(this, 'inspectorGadget');
            assert.property(this, 'inspectorClouseau');
            assert.notProperty(this.sys, 'inspectorGadget');
            assert.property(this.sys, 'inspectorClouseau');
          }
        }
      });
    });
  });

  describe('Install without mappings', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        plugins: {
          global: [{ key: 'InspectorGlobalPlugin', plugin: PhaserPluginInspector.InspectorGlobalPlugin, start: true }],
          scene: [{ key: 'InspectorScenePlugin', plugin: PhaserPluginInspector.InspectorScenePlugin, start: true }]
        },
        callbacks: {
          postBoot: function (game) {
            assert.isObject(game.plugins.getEntry('InspectorGlobalPlugin'));
            assert.include(game.plugins.getDefaultScenePlugins(), 'InspectorScenePlugin');
            done();
          }
        },
        scene: {
          map: {},
          physics: { arcade: {}, matter: {} },
          init: function () {
            console.log('init', this);
          }
        }
      });
    });
  });

  describe('Install plugin from postBoot()', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        audio: { noAudio: true },
        callbacks: {
          postBoot: function (game) {
            PhaserPluginInspector.Install(game.plugins);
            assert.isObject(game.plugins.getEntry('InspectorGlobalPlugin'));
            assert.include(game.plugins.getDefaultScenePlugins(), 'InspectorScenePlugin');
            done();
          }
        },
        scene: {
          map: {},
          physics: { arcade: {}, matter: {} },
          init: function () {
            assert.notProperty(this, 'inspectorScene', 'Plugin not in scene!');
            assert.notProperty(this.sys, 'inspectorScene', 'Plugin not in scene systems!');
          }
        }
      });
    });
  });
});

mocha.checkLeaks();
mocha.globals(['Phaser']);
mocha.run();
