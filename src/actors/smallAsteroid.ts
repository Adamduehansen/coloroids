import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";
import { Asteroid } from "./asteroid.ts";

type Args = Required<Pick<ex.ActorArgs, "pos">> & {
  color: ex.Color;
};

export class SmallAsteroid extends Asteroid {
  constructor(args: Args) {
    super({
      width: 16,
      height: 16,
      color: args.color,
      pos: args.pos,
      vel: ex.vec(-30, 0),
    });

    this.body.mass = 1;
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);

    const otherPalette = other.owner.has(PaletteComponent)
      ? other.owner.get(PaletteComponent)
      : undefined;

    if (otherPalette === undefined) {
      return;
    }

    if (this.palette.isMatching(otherPalette.color)) {
      this.kill();
    }
  }
}
