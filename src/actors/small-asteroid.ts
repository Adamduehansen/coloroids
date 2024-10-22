import * as ex from "excalibur";
import { PaletteComponent } from "../components/palette.ts";
import { Asteroid } from "./asteroid.ts";

type Args = Required<Pick<ex.ActorArgs, "pos">> & {
  color: ex.Color;
  vel?: ex.Vector;
};

function getRandomVel(): ex.Vector {
  return ex.vec(
    ex.randomIntInRange(-50, 50),
    ex.randomIntInRange(-50, 50),
  );
}

export class SmallAsteroid extends Asteroid {
  constructor({ vel = getRandomVel(), ...rest }: Args) {
    super({
      ...rest,
      vel: vel,
      width: 16,
      height: 16,
    });

    this.body.mass = 1;
    this.body.bounciness = 1;
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
