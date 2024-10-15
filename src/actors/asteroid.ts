import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";

type Args = Required<Pick<ex.ActorArgs, "pos" | "width" | "height" | "vel">> & {
  color: ex.Color;
};

export abstract class Asteroid extends ex.Actor {
  readonly palette: PaletteComponent;

  constructor(args: Args) {
    super({
      ...args,
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Box(args.width, args.height),
    });

    this.palette = new PaletteComponent(args.color);

    this.addComponent(this.palette);
  }
}
