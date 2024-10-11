import * as ex from "excalibur";

export class ColorComponent extends ex.Component {
  declare owner: ex.Actor;

  get color(): ex.Color {
    return this.owner.color;
  }
}
