import * as ex from "excalibur";

export class ColorComponent extends ex.Component {
  declare owner: ex.Actor;

  #color: ex.Color;

  constructor(color: ex.Color) {
    super();
    this.#color = color;
  }

  get color(): ex.Color {
    return this.#color;
  }
}
