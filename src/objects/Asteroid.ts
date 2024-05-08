import {
  Actor,
  ActorArgs,
  CollisionType,
  Color,
  Shape,
  Sprite,
} from "excalibur";
import { sourceViews, spritesheetSource } from "../resources";

export default class Asteroid extends Actor {
  constructor(args: ActorArgs) {
    super({
      ...args,
      name: "Asteroid",
      collisionType: CollisionType.Active,
      collider: Shape.Box(32, 32),
    });
  }

  onInitialize(): void {
    this.graphics.use(
      new Sprite({
        image: spritesheetSource,
        sourceView: sourceViews.asteroidSmall1,
      })
    );
    this.color = Color.Red;
  }

  onCollisionStart(): void {
    this.kill();
  }
}
