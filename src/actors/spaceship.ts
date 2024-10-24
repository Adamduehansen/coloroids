import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/facing.ts";
import { ControlsComponent } from "../components/controls.ts";
import { CanonComponent } from "../components/canon.ts";
import { Bullet } from "./bullet.ts";
import { AsteroidCollisionGroup } from "../utils/collision-groups.ts";
import { PaletteComponent } from "../components/palette.ts";
import { AnimationComponent } from "../components/animation.ts";
import { Resources } from "../utils/resources.ts";

const ROTATE_SPEED = .05;
const RELOAD_TIME = 500;
const MAX_SPEED = 200;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
  color: ex.Color;
};

const playersCanCollideWith = ex.CollisionGroup.collidesWith([
  AsteroidCollisionGroup,
]);

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.img.spaceship,
  grid: {
    rows: 1,
    columns: 2,
    spriteHeight: 16,
    spriteWidth: 16,
  },
  spacing: {
    margin: {
      x: 1,
    },
  },
});

export class Spaceship extends ex.Actor {
  readonly controls = new ControlsComponent();
  readonly canon = new CanonComponent(RELOAD_TIME);
  readonly palette: PaletteComponent;
  readonly animations = new AnimationComponent({
    idle: spriteSheet.getSprite(0, 0, {
      rotation: 90 * Math.PI / 180,
    }),
    thrust: spriteSheet.getSprite(1, 0),
  });
  readonly canonColor: ex.Actor;

  speed = 0;

  constructor({ color, ...rest }: Args) {
    super({
      ...rest,
      width: 16,
      height: 16,
      rotation: adaptToRotation(rest.facing),
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
      collisionGroup: playersCanCollideWith,
    });

    this.body.mass = 0.5;

    this.palette = new PaletteComponent(color, true);

    this.addComponent(this.controls);
    this.addComponent(this.canon);
    this.addComponent(this.palette);
    this.addComponent(this.animations);

    this.canonColor = new ex.Actor({
      width: 8,
      height: 2,
      color: color,
      collisionType: ex.CollisionType.PreventCollision,
    }), this.addChild(this.canonColor);

    this.animations.set("idle");

    this.canon.events.on("onFire", () => {
      if (this.palette.color === null) {
        return;
      }

      this.scene?.add(
        new Bullet({
          pos: this.pos,
          rotation: this.rotation,
          color: this.palette.color,
        }),
      );
    });

    this.palette.events.on("onChange", (color) => {
      this.canonColor.color = color;
    });
  }

  override onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handleInput();
    this.accelerate();
  }

  handleInput(): void {
    if (this.controls.isHeld("rotateRight")) {
      this.rotation += ROTATE_SPEED;
    } else if (this.controls.isHeld("rotateLeft")) {
      this.rotation -= ROTATE_SPEED;
    }

    if (this.controls.isHeld("thust")) {
      this.speed = 5;
    } else if (this.controls.isHeld("brake")) {
      this.speed = -5;
    } else {
      this.speed = 0;
    }

    if (this.controls.isHeld("fire")) {
      this.canon.attemptFire();
    }

    const color = this.controls.getPaletteControl();
    if (color !== null) {
      this.palette.setColor(color);
    }
  }

  accelerate(): void {
    const direction = ex.vec(Math.cos(this.rotation), Math.sin(this.rotation));
    const normalizedDirection = direction.normalize();
    const acceleration = normalizedDirection.scale(this.speed);
    this.vel = this.vel.add(acceleration).clampMagnitude(MAX_SPEED);
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);

    this.kill();
  }
}
