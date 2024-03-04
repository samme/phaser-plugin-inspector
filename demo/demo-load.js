/* global Phaser, PhaserPluginInspector */

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: [
    {
      map: {},

      physics: { arcade: {}, matter: {} },

      preload: function () {
        this.sys.load.scripts('inspector', ['../vendor/tweakpane.js', '../dist/phaser-plugin-inspector.umd.js']);
        this.sys.load.once('complete', function () {
          // eslint-disable-next-line no-undef
          PhaserPluginInspector.Install(this.sys.plugins);
        }, this);
      }
    }
  ]
});
