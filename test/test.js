/* global Phaser, PhaserPluginInspector, Tweakpane */

const { assert } = chai;

mocha.setup({ allowUncaught: false, ui: 'bdd' });

describe('Phaser', function () {
  it('is an object', function () {
    assert.isObject(Phaser);
  });

  it('is version 3.60.0-beta.18', function () {
    assert.propertyVal(Phaser, 'VERSION', '3.60.0-beta.18');
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

for (
  const name of [
    'AddAnimationState',
    'AddArcadeBody',
    'AddArcadePhysicsWorld',
    'AddCamera',
    'AddGameObject',
    'AddGroup',
    'AddInput',
    'AddKey',
    'AddKeys',
    'AddLight',
    'AddMatterPhysicsWorld',
    'AddParticleEmitter',
    'AddPointer',
    'AddSound',
    'AddTimerEvent',
    'AddTween'
  ]
) {
  describe(`PhaserPluginInspector.${name}`, function () {
    it('is a function', function () {
      assert.isFunction(PhaserPluginInspector[name]);
    });
  });
}

describe('new Game', function () {
  let game;

  beforeEach(function () {
  });

  afterEach(function () {
    console.log('Destroy InspectorGlobalPlugin …');
    game.plugins.get('InspectorGlobalPlugin').destroy();
    console.log('Remove InspectorGlobalPlugin …');
    game.plugins.removeGlobalPlugin('InspectorGlobalPlugin');
    console.log('Remove InspectorScenePlugin …');
    game.plugins.removeScenePlugin('InspectorScenePlugin');
    console.log('Destroy game …');
    game.destroy(true);
    game.runDestroy();
    game = null;
  });

  describe('Install with DefaultPluginsConfig', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
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
            assert.property(this, 'inspectorGame');
            assert.property(this, 'inspectorScene');
            assert.notProperty(this.sys, 'inspectorGame');
            assert.property(this.sys, 'inspectorScene');
          }
        }
      });
    });
  });

  describe('Install with DefaultPluginsConfig, Canvas renderer', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        type: Phaser.CANVAS,
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

  describe('Install with DefaultPluginsConfig, disable Web Audio', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        audio: { disableWebAudio: true },
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
            assert.property(this, 'inspectorGame');
            assert.property(this, 'inspectorScene');
            assert.notProperty(this.sys, 'inspectorGame');
            assert.property(this.sys, 'inspectorScene');
          }
        }
      });
    });
  });

  describe('Install with DefaultPluginsConfig, disable audio', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        audio: { disableAudio: true },
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
            assert.property(this, 'inspectorGame');
            assert.property(this, 'inspectorScene');
            assert.notProperty(this.sys, 'inspectorGame');
            assert.property(this.sys, 'inspectorScene');
          }
        }
      });
    });
  });

  describe('Install with DefaultPluginsConfig, click buttons', function () {
    it.skip('should not error', function (done) {
      game = new Phaser.Game({
        input: { activePointers: 0 },
        plugins: PhaserPluginInspector.DefaultPluginsConfig,
        callbacks: {
          postBoot: function (game) {
            assert.isObject(game.plugins.getEntry('InspectorGlobalPlugin'));
            assert.include(game.plugins.getDefaultScenePlugins(), 'InspectorScenePlugin');
          }
        },
        scene: {
          map: {},
          physics: { arcade: {}, matter: {} },
          create: function () {
            assert.property(this, 'inspectorGame');

            console.warn('Clicking buttons has side effects');

            const skipExpr = /(Destroy|Remove|…)/;

            for (const button of this.inspectorGame.pane.containerElem_.querySelectorAll('.tp-btnv_b')) {
              const { innerText } = button;

              if (skipExpr.test(innerText)) {
                console.log('Skipping button', innerText);

                continue;
              }

              console.log('Click?', button.innerText);

              // button.click();
            }

            console.log('Wait for 0.4s');

            setTimeout(() => {
              console.log('Done waiting');

              done();
            }, 400);
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

describe('new Game, no install', function () {
  const { AddAnimationState, AddArcadeBody, AddGameObject, AddGroup, AddKey, AddKeys, AddInput, AddLight, AddParticleEmitter, AddTimerEvent, AddTween } = PhaserPluginInspector;

  let pane = new Tweakpane.Pane();
  let game;
  let scene;

  before(function (done) {
    game = new Phaser.Game({
      type: Phaser.AUTO,
      canvasStyle: 'display: none',
      scene: {
        physics: { arcade: { debug: true }, matter: {} },
        init: function () {
          scene = this;
          this.scene.pause();
          done();
        }
      }
    });
  });

  after(function () {
    pane.dispose();
    game.destroy(true);
    game.runDestroy();
    game = null;
    pane = null;
    scene = null;
  });

  describe('AddAnimationState(sprite.anims)', function () {
    it('does not error', function () {
      AddAnimationState(scene.add.sprite(0, 0, '__DEFAULT').anims, pane);
    });
  });

  describe('AddAnimationState() with chained key', function () {
    it('does not error', function () {
      scene.anims.create('anim1', { frames: [{ key: '__DEFAULT', frame: '__BASE' }] });
      const sprite = scene.add.sprite(0, 0, '__DEFAULT');
      sprite.anims.chain('anim1');
      AddAnimationState(sprite.anims, pane);
    });
  });

  describe('AddAnimationState() with chained anim', function () {
    it('does not error', function () {
      const anim = scene.anims.create('anim2', { frames: [{ key: '__DEFAULT', frame: '__BASE' }] });
      const sprite = scene.add.sprite(0, 0, '__DEFAULT');
      sprite.anims.chain(anim);
      AddAnimationState(sprite.anims, pane);
    });
  });

  describe('AddAnimationState() with chained play config', function () {
    it('does not error', function () {
      scene.anims.create('anim3', { frames: [{ key: '__DEFAULT', frame: '__BASE' }] });
      const sprite = scene.add.sprite(0, 0, '__DEFAULT');
      sprite.anims.chain({ key: 'anim3' });
      AddAnimationState(sprite.anims, pane);
    });
  });

  describe('AddArcadeBody(body)', function () {
    it('does not error', function () {
      AddArcadeBody(scene.physics.add.image(0, 0, '__DEFAULT').body, pane);
    });
  });

  describe('AddGameObject(bitmap text)', function () {
    it('does not error', function () {
      scene.cache.bitmapFont.add('bitmapFont', Phaser.GameObjects.RetroFont.Parse(scene, {
        image: '__DEFAULT',
        width: 1,
        height: 1,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
        charsPerRow: 32
      }));

      AddGameObject(scene.add.bitmapText(0, 0, 'bitmapFont', 'Hello'), pane);
    });
  });

  describe('AddGameObject(blitter)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.blitter(0, 0, '__DEFAULT'), pane);
    });
  });

  describe('AddGameObject(container)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.container(0, 0, [scene.add.sprite(0, 0, '__DEFAULT')]), pane);
    });
  });

  describe('AddGameObject(dom)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.dom(0, 0, 'b', '', 'Hello'), pane);
    });
  });

  describe('AddGameObject(graphics)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.graphics(), pane);
    });
  });

  describe('AddGameObject(image)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.image(0, 0, '__DEFAULT'), pane);
    });
  });

  describe('AddGameObject(layer)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.layer(scene.add.sprite(0, 0, '__DEFAULT')), pane);
    });
  });

  describe('AddGameObject(nineslice)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.nineslice(0, 0, '__DEFAULT'), pane);
    });
  });

  describe('AddGameObject(point light)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.pointlight(0, 0), pane);
    });
  });

  describe('AddGameObject(render texture)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.renderTexture(0, 0, 128, 128), pane);
    });
  });

  describe('AddGameObject(rope)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.rope(0, 0, '__DEFAULT'), pane);
    });
  });

  describe('AddGameObject(shader)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.shader(new Phaser.Display.BaseShader('test'), 0, 0, 1, 1), pane);
    });
  });

  describe('AddGameObject(sprite)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.sprite(0, 0, '__DEFAULT'), pane);
    });
  });

  describe('AddGameObject(star)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.star(0, 0, 5, 10, 20), pane);
    });
  });

  describe('AddGameObject(text)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.text(0, 0, 'Hello'), pane);
    });
  });

  describe('AddGameObject(tilemap layer)', function () {
    it('does not error', function () {
      const map = scene.make.tilemap({ width: 64, height: 64, tileWidth: 16, tileHeight: 16 });
      const tileset = map.addTilesetImage('__DEFAULT');

      AddGameObject(map.createBlankLayer('layer', tileset), pane);
    });
  });

  describe('AddGameObject(tilesprite)', function () {
    it('does not error', function () {
      AddGameObject(scene.add.tileSprite(0, 0, 32, 32, '__DEFAULT'), pane);
    });
  });

  describe('AddGroup(group)', function () {
    it('does not error', function () {
      AddGroup(scene.add.group(), pane);
    });
  });

  describe('AddGroup(group with maxSize)', function () {
    it('does not error', function () {
      AddGroup(scene.add.group({ maxSize: 1 }), pane);
    });
  });

  describe('AddGroup(physics group)', function () {
    it('does not error', function () {
      AddGroup(scene.physics.add.group(), pane);
    });
  });

  describe('AddGroup(static physics group)', function () {
    it('does not error', function () {
      AddGroup(scene.physics.add.staticGroup(), pane);
    });
  });

  describe('AddInput(sprite.input)', function () {
    it('does not error', function () {
      AddInput(scene.add.sprite(0, 0, '__DEFAULT').setInteractive().input, pane);
    });
  });

  describe('AddKey(key)', function () {
    it('does not error', function () {
      AddKey(scene.input.keyboard.addKey('SPACE'), pane);
    });
  });

  describe('AddKeys(key)', function () {
    it('does not error', function () {
      AddKeys(scene.input.keyboard.addKeys('W,A,S,D'), pane);
    });
  });

  describe('AddLight(light)', function () {
    it('does not error', function () {
      AddLight(scene.lights.addLight(), pane);
    });
  });

  describe('AddParticleEmitter(particle emitter)', function () {
    it('does not error', function () {
      const particles = scene.add.particles(0, 0, '__DEFAULT');

      AddParticleEmitter(particles, pane);
    });
  });

  describe('AddTimerEvent(timer event)', function () {
    it('does not error', function () {
      AddTimerEvent(scene.time.addEvent({ delay: 1000 }), pane);
    });
  });

  describe('AddTween(tween)', function () {
    it('does not error', function () {
      AddTween(scene.add.tween({ targets: {} }), pane);
    });
  });

  describe('AddTween(counter tween)', function () {
    it('does not error', function () {
      AddTween(scene.tweens.addCounter({ from: 1, to: 10 }), pane);
    });
  });
});

mocha.checkLeaks();
mocha.globals(['Phaser']);
mocha.run();
