import * as ex from "excalibur";

export class PaletteComponent extends ex.Component {
  declare owner: ex.Actor;

  events = new ex.EventEmitter<{ onChange: ex.Color }>();
  #isColorMix = false;

  #canCombineColor: boolean;
  #color: ex.Color;

  constructor(color: ex.Color, canCombineColor: boolean = false) {
    super();
    this.#color = color;
    this.#canCombineColor = canCombineColor;
  }

  get color(): ex.Color {
    return this.#color;
  }

  setColor(color: ex.Color): void {
    if (this.isMatching(color)) {
      return;
    }

    if (this.#canCombineColor === false || this.#isColorMix === true) {
      this.#color = color;
      this.#isColorMix = false;
    } else {
      this.#color = this.#mixColors(this.#color, color);
      this.#isColorMix = true;
    }

    this.events.emit("onChange", this.#color);
  }

  isMatching(color: ex.Color): boolean {
    return this.#color.r === color.r &&
      this.#color.g === color.g &&
      this.#color.b === color.b;
  }

  #mixColors(color1: ex.Color, color2: ex.Color) {
    const r = Math.min(color1.r + color2.r, 255);
    const g = Math.min(color1.g + color2.g, 255);
    const b = Math.min(color1.b + color2.b, 255);

    return new ex.Color(r, g, b);
  }
}
