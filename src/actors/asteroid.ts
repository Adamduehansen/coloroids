import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";

type Args = Pick<ex.ActorArgs, "pos" | "color">;

export class Asteroid extends ex.Actor {
  constructor(args: Args) {
    super({
      ...args,
      width: 16,
      height: 16,
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
    });
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);

    const paletteComponent = other.owner.has(PaletteComponent)
      ? other.owner.get(PaletteComponent)
      : undefined;

    if (paletteComponent === undefined) {
      return;
    }

    console.log(paletteComponent.color);
  }
}
