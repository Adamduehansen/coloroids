import { Actor, ActorArgs, Sprite } from "excalibur";
import { sourceViews, spritesheetSource } from "../resources";

export default class Bullet extends Actor {
  constructor({ x, y }: Pick<ActorArgs, "x" | "y">) {
    super({
      x: x,
      y: y,
      name: "Bullet",
    });
  }

  onInitialize(): void {
    const sprite = new Sprite({
      image: spritesheetSource,
      sourceView: sourceViews.bullet,
    });
    this.graphics.use(sprite);
  }
}
