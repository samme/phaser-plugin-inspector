
/* global Phaser, PhaserPluginInspector */

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.CANVAS,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  scene: [
    { key: 'scene1' },
    { key: 'scene2', physics: { arcade: {} } },
    { key: 'scene3', physics: { matter: {} } },
    { key: 'scene4', plugins: ['InspectorScenePlugin'], active: true }
  ]
});
