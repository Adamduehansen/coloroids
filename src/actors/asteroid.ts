import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";

type Args = Pick<ex.ActorArgs, "pos"> & {
  color: ex.Color;
};

export class Asteroid extends ex.Actor {
  readonly palette: PaletteComponent;

  constructor(args: Args) {
    super({
      ...args,
      width: 16,
      height: 16,
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
    });

    this.palette = new PaletteComponent(args.color);
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
