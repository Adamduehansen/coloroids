import { Actor, ActorArgs, vec } from "excalibur";

export default class Bullet extends Actor {
  constructor(args: ActorArgs) {
    super({
      ...args,
      name: "Bullet",
      width: 10,
      height: 5,
    });
  }

  onInitialize(): void {
    const vx = Math.cos(this.rotation) * 500;
    const vy = Math.sin(this.rotation) * 500;
    this.vel = vec(vx, vy);
  }
}
