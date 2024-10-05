import * as ex from "excalibur";

export class ControlsComponent extends ex.Component {
  declare owner: ex.Actor;

  readonly controlSchema = {
    rotateRight: ex.Keys.D,
    rotateLeft: ex.Keys.A,
    thust: ex.Keys.W,
    brake: ex.Keys.S,
  } as const;

  isHeld(control: keyof typeof this.controlSchema): boolean | undefined {
    return this.getEngine()?.input.keyboard.isHeld(
      this.controlSchema[control],
    );
  }

  getEngine(): ex.Engine | undefined {
    return this.owner.scene?.engine;
  }
}
