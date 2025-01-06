/* global Phaser, PhaserPluginInspector, Tweakpane */

const { assert } = chai;

mocha.setup({ allowUncaught: true, ui: 'bdd' });

describe('Phaser', function () {
  it('is an object', function () {
    assert.isObject(Phaser);
  });

  it('is the required version', function () {
    assert.propertyVal(Phaser, 'VERSION', '4.0.0 Beta 3');
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
      'AddActive',
      'AddAlpha',
      'AddAnimationState',
      'AddArcadeBody',
      'AddArcadePhysicsWorld',
      'AddCamera',
      'AddChain',
      'AddFilters',
      'AddFilterList',
      'AddFilterController',
      'AddGameObject',
      'AddGroup',
      'AddInput',
      'AddKey',
      'AddKeys',
      'AddLight',
      'AddMatterPhysicsWorld',
      'AddParticleEmitter',
      'AddPoint',
      'AddPointer',
      'AddRectangle',
      'AddRectangleLike',
      'AddScenes',
      'AddSound',
      'AddTimeline',
      'AddTimerEvent',
      'AddTween',
      'AddVideo',
      'AddVisible'
    ]
  ) {
    describe(`PhaserPluginInspector.${name}`, function () {
      it('is a function', function () {
        assert.isFunction(PhaserPluginInspector[name]);
      });
    });
  }
});

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

  describe('Install with DefaultPluginsConfig, disable input', function () {
    it('should not error', function (done) {
      game = new Phaser.Game({
        audio: { disableAudio: true },
        input: { gamepad: false, keyboard: false, mouse: false, touch: false, wheel: false },
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

for (const renderType of [Phaser.CANVAS, Phaser.WEBGL]) {
  describe(`new Game, no install, renderer ${renderType}`, function () {
    const {
      AddActive,
      AddAlpha,
      AddAnimationState,
      AddArcadeBody,
      AddCamera,
      AddChain,
      AddFilters,
      AddFilterList,
      AddFilterController,
      AddGameObject,
      AddGroup,
      AddKey,
      AddKeys,
      AddInput,
      AddLight,
      AddParticleEmitter,
      AddPoint,
      AddPointer,
      AddRectangle,
      AddRectangleLike,
      AddScenes,
      AddTimeline,
      AddTimerEvent,
      AddTween,
      AddVideo,
      AddVisible
    } = PhaserPluginInspector;

    let pane = new Tweakpane.Pane();
    let game;
    let scene;

    before(function (done) {
      game = new Phaser.Game({
        type: renderType,
        canvasStyle: 'display: none',
        scene: {
          physics: { arcade: { debug: true }, matter: {} },
          init: function () {
            scene = this;
            this.scene.sleep();
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

    afterEach(function () {
      console.log('Clear display list?', scene.sys.displayList.length);
      scene.sys.displayList.shutdown();
    });

    describe('game.config.renderType', function () {
      it('is the specified type', function () {
        assert.propertyVal(game.config, 'renderType', renderType);
      });
    });

    describe('game.renderer.type', function () {
      it('is the specified type', function () {
        assert.propertyVal(game.renderer, 'type', renderType);
      });
    });

    describe('AddActive()', function () {
      it('does not error', function () {
        AddActive(
          [{ name: '1', active: true }, { name: '2', active: false }],
          pane
        );
      });
    });

    describe('AddAlpha()', function () {
      it('does not error', function () {
        AddAlpha(
          [{ name: '1', alpha: 1 }, { name: '2', alpha: 0 }],
          pane
        );
      });
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

    describe('AddCamera()', function () {
      it('does not error', function () {
        const cam = scene.cameras.add();

        AddCamera(cam, pane);

        scene.cameras.remove(cam);
      });
    });

    describe('AddChain()', function () {
      it('does not error', function () {
        const chain = scene.tweens.chain({
          targets: { x: 0, y: 0 },
          tweens: [{ x: 1 }, { y: 1 }]
        });

        AddChain(chain, pane);

        chain.destroy();
      });
    });

    describe('AddFilters(sprite.filters)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          AddFilters(sprite.filters, pane);
        } else {
          this.skip();
        }
      });
    });

    describe('AddFilterList(sprite.filters.internal)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          sprite.filters.internal.addBlur();
          AddFilterList(sprite.filters.internal, pane);
        } else {
          this.skip();
        }
      });
    });

    describe('AddFilterList(sprite.filters.external)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          sprite.filters.external.addBlur();
          AddFilterList(sprite.filters.external, pane);
        } else {
          this.skip();
        }
      });
    });

    describe('AddFilterController(barrel)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          const barrel = sprite.filters.internal.addBarrel();
          AddFilterController(barrel, pane);
        } else {
          this.skip();
        }
      });
    });

    describe('AddFilterController(blend)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          const blend = sprite.filters.internal.addBlend();
          AddFilterController(blend, pane);
        } else {
          this.skip();
        }
      });
    });

    describe('AddFilterController(parallel)', function () {
      it('does not error', function () {
        if (game.config.renderType === Phaser.WEBGL) {
          const sprite = scene.add.sprite(0, 0, '__DEFAULT');
          sprite.enableFilters();
          const parallel = sprite.filters.internal.addParallelFilters();
          AddFilterController(parallel, pane);
        } else {
          this.skip();
        }
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
        if (game.config.renderType === Phaser.WEBGL) {
          AddGameObject(scene.add.shader(new Phaser.Display.BaseShader('test'), 0, 0, 1, 1), pane);
        } else {
          this.skip();
        }
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

    describe('AddPoint()', function () {
      it('does not error', function () {
        AddPoint(new Phaser.Math.Vector2(), pane);
      });
    });

    describe('AddPointer(pointer)', function () {
      it('does not error', function () {
        AddPointer(scene.input.activePointer, pane);
      });
    });

    describe('AddRectangle()', function () {
      it('does not error', function () {
        AddRectangle(new Phaser.Geom.Rectangle(), pane);
      });
    });

    describe('AddRectangleLike()', function () {
      it('does not error', function () {
        AddRectangleLike({ x: 0, y: 0, width: 1, height: 1 }, pane);
      });
    });

    describe('AddScenes()', function () {
      it('does not error', function () {
        AddScenes(
          [new Phaser.Scene('1'), new Phaser.Scene('2')],
          pane
        );
      });
    });

    describe('AddTimeline()', function () {
      it('does not error', function () {
        const timeline = scene.add.timeline([
          { at: 0 },
          { at: 1 }
        ]);

        AddTimeline(timeline, pane);

        timeline.destroy();
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

    describe('AddVideo(video)', function () {
      it('does not error', function () {
        const video = scene.add.video(0, 0).loadURL('data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr9tZGF0AAACoAYF//+c3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDEyNSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTIgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNCBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAA9liIQAV/0TAAYdeBTXzg8AAALvbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAACoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAhl0cmFrAAAAXHRraGQAAAAPAAAAAAAAAAAAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAgAAAAIAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAqAAAAAAABAAAAAAGRbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAwAAAAAgBVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABPG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAPxzdGJsAAAAmHN0c2QAAAAAAAAAAQAAAIhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MBZAAK/+EAGWdkAAqs2V+WXAWyAAADAAIAAAMAYB4kSywBAAZo6+PLIsAAAAAYc3R0cwAAAAAAAAABAAAAAQAAAgAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAACtwAAAAEAAAAUc3RjbwAAAAAAAAABAAAAMAAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTQuNjMuMTA0');

        AddVideo(video, pane);

        video.destroy();
      });
    });

    describe('AddVisible()', function () {
      it('does not error', function () {
        AddVisible(
          [{ name: '1', visible: true }, { name: '2', visible: false }],
          pane
        );
      });
    });
  });
}

describe('Install with DefaultPluginsConfig, click buttons', function () {
  let game;
  let scene;

  before(function (done) {
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
        init: function () {
          console.log('init', this);
          scene = this;
          done();
        }
      }
    });
  });

  after(function () {
    console.log('destroy game …');
    game.destroy(true);
    game.runDestroy();
    game = null;
    scene = null;
  });

  it('should click all buttons without error (👀 see console)', function () {
    const skipExpr = /(Destroy|Remove|Save|…)/;

    console.log('Will skip buttons with text matching', skipExpr);

    for (const button of scene.inspectorGame.pane.containerElem_.querySelectorAll('.tp-btnv_b')) {
      const { innerText } = button;

      if (skipExpr.test(innerText)) {
        console.log('Skip button', innerText);

        continue;
      }

      console.log('Click button', innerText);
      button.click();
    }
  });
});

mocha.checkLeaks();
mocha.globals(['Phaser']);
mocha.run();
