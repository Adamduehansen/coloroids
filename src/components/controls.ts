import * as ex from "excalibur";

export class ControlsComponent extends ex.Component {
  declare owner: ex.Actor;

  readonly controlSchema = {
    rotateRight: ex.Keys.D,
    rotateLeft: ex.Keys.A,
    thust: ex.Keys.W,
    brake: ex.Keys.S,
    fire: ex.Keys.Space,
    red: ex.Keys.R,
    green: ex.Keys.G,
    blue: ex.Keys.B,
  } as const;

  isHeld(control: keyof typeof this.controlSchema): boolean | undefined {
    return this.getEngine()?.input.keyboard.isHeld(
      this.controlSchema[control],
    );
  }

  wasPressed(control: keyof typeof this.controlSchema): boolean | undefined {
    return this.getEngine()?.input.keyboard.wasPressed(
      this.controlSchema[control],
    );
  }

  getPaletteControl(): ex.Color | null {
    if (this.wasPressed("red")) {
      return ex.Color.Red;
    } else if (this.wasPressed("blue")) {
      return ex.Color.Blue;
    } else if (this.wasPressed("green")) {
      return ex.Color.Green;
    }
    return null;
  }

  getEngine(): ex.Engine | undefined {
    return this.owner.scene?.engine;
  }
}
