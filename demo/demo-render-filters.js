const { AddFilterController, AddGameObject } = PhaserPluginInspector;

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
    const container2 = this.add.container(840, 360);
    const ball4 = this.add.image(0, -140, 'ball-pink');
    const ball5 = this.add.image(0, 0, 'ball-pink');
    const ball6 = this.add.image(0, 140, 'ball-pink');
    container2.add(ball4);
    container2.add(ball5);
    container2.add(ball6);

    // Add container2 to a RenderFilters wrapper.
    const box = this.add.renderFilters(container2).setName('box');

    const blur = box.filters.internal.addBlur();
    blur.setPaddingOverride(1, 1, 2, 2);

    const bokeh = box.filters.internal.addBokeh();
    bokeh.setPaddingOverride(null);

    // Set the alpha of the RenderFilters wrapper.
    box.setAlpha(0.5);

    console.log('Box', box);

    AddFilterController(blur, pane);
    AddFilterController(bokeh, pane);
    AddGameObject(box, pane);

    // The alpha is applied to the composite of the container.
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
