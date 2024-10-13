import * as ex from "excalibur";

export class PaletteComponent extends ex.Component {
  declare owner: ex.Actor;

  events = new ex.EventEmitter<{ change: ex.Color }>();

  #color: ex.Color;

  constructor(palette: ex.Color) {
    super();
    this.#color = palette;
  }

  get color(): ex.Color {
    return this.#color;
  }

  setColor(color: ex.Color): void {
    this.#color = color;
    this.events.emit("change", this.#color);
  }

  isMatching(color: ex.Color): boolean {
    return this.#color.r === color.r &&
      this.#color.g === color.g &&
      this.#color.b === color.b;
  }
}
