import * as ex from "excalibur";

type Palette = ex.Color | null;

export class PaletteComponent extends ex.Component {
  declare owner: ex.Actor;

  #color: Palette;

  constructor(palette: Palette) {
    super();
    this.#color = palette;
  }

  get color(): Palette {
    return this.#color;
  }
}
