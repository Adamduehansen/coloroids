import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";

type Args = Required<Pick<ex.ActorArgs, "pos" | "width" | "height">> & {
  color: ex.Color;
};

export abstract class Asteroid extends ex.Actor {
  readonly palette: PaletteComponent;

  constructor(args: Args) {
    super({
      width: args.width,
      height: args.height,
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Box(args.width, args.height),
      pos: args.pos,
      color: args.color,
    });

    this.palette = new PaletteComponent(args.color);

    this.addComponent(this.palette);
  }
}
