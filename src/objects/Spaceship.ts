import { Actor, ActorArgs } from "excalibur";

export default class Spaceship extends Actor {
  constructor({ x, y }: Pick<ActorArgs, "x" | "y">) {
    super({
      x: x,
      y: y,
    });
  }
}
