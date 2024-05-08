import { Actor, ActorArgs, CollisionType, vec } from "excalibur";

const BULLET_SPEED = 500;

export default class Bullet extends Actor {
  constructor(args: ActorArgs) {
    super({
      ...args,
      name: "Bullet",
      width: 10,
      height: 5,
      collisionType: CollisionType.Active,
    });
  }

  onInitialize(): void {
    const vx = Math.cos(this.rotation) * BULLET_SPEED;
    const vy = Math.sin(this.rotation) * BULLET_SPEED;
    this.vel = vec(vx, vy);
  }

  onPreUpdate(): void {
    this.#killIfOffScreen();
  }

  onCollisionStart(): void {
    this.kill();
  }

  #killIfOffScreen() {
    if (!this.isOffScreen) {
      return;
    }
    this.kill();
  }
}
