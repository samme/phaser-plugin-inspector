/* global Phaser, PhaserPluginInspector */

const { AddKey, AddKeys } = PhaserPluginInspector;

function create () {
  const { pane } = this.inspectorScene;
  const { keyboard } = this.input;

  AddKey(keyboard.addKey('SPACE'), pane);

  AddKeys(keyboard.addKeys('W,A,S,D'), pane);

  AddKeys(keyboard.createCursorKeys(), pane);
}

// eslint-disable-next-line no-new
new Phaser.Game({
  scene: { create },
  plugins: PhaserPluginInspector.DefaultPluginsConfig,
  audio: {
    disableWebAudio: true
  }
});
