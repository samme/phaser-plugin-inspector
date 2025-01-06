const { AddCamera, AddGameObject } = PhaserPluginInspector;

const pane = new Tweakpane.Pane({ title: 'Render Filters' });

class Example extends Phaser.Scene {
  preload () {
    this.load.image('ball-pink', 'assets/sprites/ball-pink.png');
  }

  create () {
    // Create overlapping balls in a transparent container.
    const container1 = this.add.container(420, 360).setAlpha(0.5);
    const ball1 = this.add.image(0, -140, 'ball-pink');
    const ball2 = this.add.image(0, 0, 'ball-pink');
    const ball3 = this.add.image(0, 140, 'ball-pink');
    container1.add(ball1);
    container1.add(ball2);
    container1.add(ball3);

    // Create overlapping balls in a container.
    const container2 = this.add.container(840, 360).setName('container2');
    const ball4 = this.add.image(0, -140, 'ball-pink');
    const ball5 = this.add.image(0, 0, 'ball-pink');
    const ball6 = this.add.image(0, 140, 'ball-pink');
    container2.add(ball4);
    container2.add(ball5);
    container2.add(ball6);

    container2.enableFilters();
    container2.filterCamera.setAlpha(0.5);
    container2.filtersForceComposite = true;

    console.log('container2', container2);

    AddGameObject(container2, pane);
    AddCamera(container2.filterCamera, pane);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#446688',
  parent: 'phaser-example',
  scene: Example
});
