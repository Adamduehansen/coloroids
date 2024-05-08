import {
  type ActorArgs,
  Actor,
  Color,
  Engine,
  Graphic,
  Keys,
  Sprite,
  vec,
  Animation,
  Vector,
  BoundingBox,
  Timer,
  Collider,
  CollisionContact,
  Side,
  CollisionType,
  Shape,
} from "excalibur";
import { sourceViews, spritesheetSource } from "../resources";
import Bullet from "./Bullet";

const THRUST_SPEED = 10;
const MAX_SPEED = 500;
const ROTATION_SPEED = 0.025;

export default class Spaceship extends Actor {
  #idleGraphic: Graphic;
  #thrustGraphic: Graphic;
  #shootTimer: Timer;

  #speed = 0;
  #lifes = 3;
  #canShoot = true;

  constructor(args: ActorArgs) {
    super({
      ...args,
      name: "Spaceship",
      color: Color.White,
      collider: Shape.Box(48, 32),
      collisionType: CollisionType.Passive,
    });
    this.#idleGraphic = new Sprite({
      image: spritesheetSource,
      sourceView: sourceViews.spaceshipIdle,
    });
    this.#thrustGraphic = new Animation({
      frames: [
        {
          graphic: new Sprite({
            image: spritesheetSource,
            sourceView: sourceViews.spaceshipIdle,
          }),
          duration: 200,
        },
        {
          graphic: new Sprite({
            image: spritesheetSource,
            sourceView: sourceViews.spaceshipThrust,
          }),
          duration: 500,
        },
      ],
    });
    this.#shootTimer = new Timer({
      interval: 1000,
      fcn: () => {
        this.#canShoot = true;
        this.#shootTimer.stop();
      },
    });
  }

  onInitialize(engine: Engine): void {
    this.graphics.use(this.#idleGraphic);
    engine.add(this.#shootTimer);
  }

  onPreUpdate(engine: Engine<any>): void {
    this.#handleControls(engine);
    this.vel = this.#getVelocityByRotation();
    this.#updatePositionOnCollisionWithBoundary(engine.getWorldBounds());
  }

  onCollisionStart(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    if (other.owner.name === "Asteroid") {
      this.#lifes -= 1;
      this.actions.repeat((context) => {
        context.fade(0, 200);
        context.fade(1, 200);
      }, 3);
    }
  }

  #updatePositionOnCollisionWithBoundary(boundingBox: BoundingBox) {
    const { x: currentX, y: currentY } = this.pos;
    const { top, right, bottom, left } = boundingBox;

    const width = this.graphics.current?.width || 0;
    const height = this.graphics.current?.height || 0;

    if (currentX + width < left) {
      this.pos.x = right;
    } else if (currentX - width > right) {
      this.pos.x = left;
    }

    if (currentY + height < top) {
      this.pos.y = bottom;
    } else if (currentY - height > bottom) {
      this.pos.y = top;
    }
  }

  #handleControls(engine: Engine) {
    if (engine.input.keyboard.isHeld(Keys.Right)) {
      this.rotation += ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.Left)) {
      this.rotation -= ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.Up)) {
      this.#speed = Math.min(this.#speed + THRUST_SPEED, MAX_SPEED);
      this.graphics.use(this.#thrustGraphic);
    }

    if (engine.input.keyboard.wasReleased(Keys.Up)) {
      this.graphics.use(this.#idleGraphic);
    }

    if (engine.input.keyboard.isHeld(Keys.Down)) {
      this.#speed = Math.max(this.#speed - THRUST_SPEED, -MAX_SPEED);
    }

    if (engine.input.keyboard.wasPressed(Keys.R)) {
      this.#setGraphicColors(Color.Red);
    }

    if (engine.input.keyboard.wasPressed(Keys.B)) {
      this.#setGraphicColors(Color.Blue);
    }

    if (engine.input.keyboard.wasPressed(Keys.G)) {
      this.#setGraphicColors(Color.Green);
    }

    if (engine.input.keyboard.isHeld(Keys.Space) && this.#canShoot) {
      this.#canShoot = false;
      engine.add(
        new Bullet({
          x: this.pos.x,
          y: this.pos.y,
          color: this.color,
          rotation: this.rotation,
        })
      );
      this.#shootTimer.start();
    }
  }

  #getVelocityByRotation(): Vector {
    const vx = Math.cos(this.rotation) * this.#speed;
    const vy = Math.sin(this.rotation) * this.#speed;
    return vec(vx, vy);
  }

  #setGraphicColors(color: Color) {
    this.#idleGraphic.tint = color;
    this.#thrustGraphic.tint = color;
    this.color = color;
  }
}
