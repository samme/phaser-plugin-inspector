
/* global Phaser, PhaserPluginInspector */

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.CANVAS,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  scene: [
    { key: 'active' },
    { key: 'arcade', physics: { arcade: {} } },
    { key: 'matter', physics: { matter: {} } },
    { key: 'plugins', plugins: ['InspectorScenePlugin'], active: true },
    { key: 'shutdown', active: true, update: function () { this.scene.stop(); } },
    { key: 'remove', active: true, update: function () { this.scene.remove(); } }
  ]
});
