
/* global Phaser, PhaserPluginInspector */

const { addGameObject, addGroup, addTimerEvent, addTween } = PhaserPluginInspector;

function create () {
  const { folder } = this.inspectorScene;

  addGameObject(this.add.circle(0, 0, 128, 0x00ffff).setName('Iris'), folder);
  addGroup(this.add.group(), folder);
  addTimerEvent(this.time.delayedCall(60000, console.count), folder);
  addTween(this.tweens.addCounter({ from: 1, to: 10, duration: 60000 }), folder);
  addTween(this.tweens.add({
    targets: new Phaser.Math.Vector2(),
    props: { x: { from: 0, to: 1, duration: 5000, repeat: -1, ease: 'Sine.easeIn' }, y: { from: 1, to: 0, duration: 3000, repeat: -1, ease: 'Sine.easeOut' } }
  }), folder);
}

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.CANVAS,
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  scene: [
    { key: 'scene1' },
    { key: 'scene2', physics: { arcade: {} } },
    { key: 'scene3', physics: { matter: {} } },
    { key: 'scene4', plugins: ['InspectorScenePlugin'], active: true },
    { key: 'extras', active: true, create }
  ]
});
