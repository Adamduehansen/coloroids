import * as ex from "excalibur";

export class DeathOverlay extends ex.ScreenElement {
  constructor(engine: ex.Engine) {
    super({
      scale: ex.vec(3, 3),
    });
    this.graphics.visible = false;

    engine.on("death", () => {
      this.graphics.visible = true;
      this.actions.delay(1000).callMethod(() => {
        location.reload();
      });
    });
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    const text = new ex.Text({
      text: "You died!",
      color: ex.Color.Red,
    });

    this.graphics.use(text);
    this.pos = ex.vec(
      this.scene!.camera.drawPos.x,
      this.scene!.camera.drawPos.y,
    );
  }
}
