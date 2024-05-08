import { Actor, ActorArgs, Collider, CollisionType, vec } from "excalibur";

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

  onCollisionStart(_self: Collider, other: Collider): void {
    if (this.#isCollisionWithBullet(other)) {
      this.kill();
    }
  }

  #isCollisionWithBullet(collider: Collider): boolean {
    return collider.owner.name === "Asteroid";
  }

  #killIfOffScreen() {
    if (!this.isOffScreen) {
      return;
    }
    this.kill();
  }
}
