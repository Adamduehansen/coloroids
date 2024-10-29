import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/facing.ts";
import { ControlsComponent } from "../components/controls.ts";
import { CanonComponent } from "../components/canon.ts";
import { Bullet } from "./bullet.ts";
import {
  AsteroidCollisionGroup,
  GoalCollisionGroup,
} from "../utils/collision-groups.ts";
import { PaletteComponent } from "../components/palette.ts";
import { AnimationComponent } from "../components/animation.ts";
import { Resources } from "../utils/resources.ts";
import { Goal } from "./goal.ts";

const ROTATE_SPEED = .05;
const RELOAD_TIME = 500;
const MAX_SPEED = 200;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
  color: ex.Color;
  disableCanon: boolean;
  canCombineColors: boolean;
};

const playersCanCollideWith = ex.CollisionGroup.collidesWith([
  AsteroidCollisionGroup,
  GoalCollisionGroup,
]);

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.img.spaceship,
  grid: {
    rows: 1,
    columns: 7,
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
    thrust: ex.Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteSheet,
      frameCoordinates: [
        { x: 1, y: 0, options: { rotation: 90 * Math.PI / 180 } },
        { x: 2, y: 0, options: { rotation: 90 * Math.PI / 180 } },
        { x: 3, y: 0, options: { rotation: 90 * Math.PI / 180 } },
      ],
    }),
    retracting: ex.Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteSheet,
      frameCoordinates: [
        { x: 4, y: 0, options: { rotation: 90 * Math.PI / 180 } },
        { x: 5, y: 0, options: { rotation: 90 * Math.PI / 180 } },
        { x: 6, y: 0, options: { rotation: 90 * Math.PI / 180 } },
      ],
    }),
  });
  readonly canonColor: ex.Actor;
  readonly #canShoot: boolean;

  speed = 0;
  #isThrusting = false;
  #isRetracting = false;

  constructor({ color, disableCanon, canCombineColors, ...rest }: Args) {
    super({
      ...rest,
      width: 16,
      height: 16,
      rotation: adaptToRotation(rest.facing),
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
      collisionGroup: playersCanCollideWith,
    });

    this.#canShoot = disableCanon === false;

    this.body.mass = 0.5;
    this.palette = new PaletteComponent(color, canCombineColors);
    this.canonColor = new ex.Actor({
      width: 8,
      height: 2,
      color: color,
      collisionType: ex.CollisionType.PreventCollision,
      visible: this.#canShoot,
    });

    this.addChild(this.canonColor);
    this.addComponent(this.controls);
    this.addComponent(this.canon);
    this.addComponent(this.palette);
    this.addComponent(this.animations);

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

  override onPostUpdate(engine: ex.Engine, delta: number): void {
    super.onPostUpdate(engine, delta);
    this.#handleAnimation();
  }

  handleInput(): void {
    if (this.controls.isHeld("rotateRight")) {
      this.rotation += ROTATE_SPEED;
    } else if (this.controls.isHeld("rotateLeft")) {
      this.rotation -= ROTATE_SPEED;
    }

    if (this.controls.isHeld("thust")) {
      this.speed = 5;
      this.#isThrusting = true;
    } else if (this.controls.isHeld("brake")) {
      this.speed = -5;
      this.#isRetracting = true;
    } else {
      this.speed = 0;
      this.#isThrusting = false;
      this.#isRetracting = false;
    }

    if (this.#canShoot && this.controls.isHeld("fire")) {
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

  #handleAnimation() {
    if (this.#isThrusting) {
      this.animations.set("thrust");
    } else if (this.#isRetracting) {
      this.animations.set("retracting");
    } else {
      this.animations.set("idle");
    }
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);

    if (other.owner instanceof Goal) {
      this.scene?.engine.emit("level-transition");
    }

    this.kill();
  }
}
