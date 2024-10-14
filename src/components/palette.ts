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
    this.#color = this.#addColors(this.#color, color);
    this.events.emit("change", this.#color);
  }

  isMatching(color: ex.Color): boolean {
    return this.#color.r === color.r &&
      this.#color.g === color.g &&
      this.#color.b === color.b;
  }

  #addColors(color1: ex.Color, color2: ex.Color) {
    const r = Math.min(color1.r + color2.r, 255);
    const g = Math.min(color1.g + color2.g, 255);
    const b = Math.min(color1.b + color2.b, 255);

    return new ex.Color(r, g, b);
  }
}
