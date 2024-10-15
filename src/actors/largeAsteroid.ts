import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";
import { SmallAsteroid } from "./smallAsteroid.ts";
import { Asteroid } from "./asteroid.ts";

type Args = Required<Pick<ex.ActorArgs, "pos" | "vel">> & {
  color: ex.Color;
};

export class LargeAsteroid extends Asteroid {
  constructor(args: Args) {
    super({
      ...args,
      width: 32,
      height: 32,
    });

    this.body.mass = 2;
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

    if (!this.palette.isMatching(otherPalette.color)) {
      return;
    }

    const asteroidSpawn1 = new SmallAsteroid({
      color: ex.Color.Red,
      pos: this.pos,
    });
    const asteroidSpawn2 = new SmallAsteroid({
      color: ex.Color.Green,
      pos: this.pos,
    });

    this.scene?.add(asteroidSpawn1);
    this.scene?.add(asteroidSpawn2);

    this.kill();
  }
}
