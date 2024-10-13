import * as ex from "excalibur";

export class PaletteComponent extends ex.Component {
  declare owner: ex.Actor;

  events = new ex.EventEmitter<{ change: ex.Color }>();

  #color: ex.Color | null;

  constructor(palette: ex.Color | null) {
    super();
    this.#color = palette;
  }

  setColor(color: ex.Color) {
    this.#color = color;
    this.events.emit("change", this.#color);
  }

  get color(): ex.Color | null {
    return this.#color;
  }
}
