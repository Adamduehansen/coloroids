import * as ex from "excalibur";
import { GoalCollisionGroup } from "../utils/collision-groups.ts";

interface Args {
  pos: ex.ActorArgs["pos"];
  unlocked: boolean;
}

export class Goal extends ex.Actor {
  #label = new ex.Label({
    text: "",
    color: ex.Color.White,
    pos: ex.vec(-12, -20),
  });

  constructor(args: Args) {
    super({
      pos: args.pos,
      width: 16,
      height: 16,
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.PreventCollision,
      color: ex.Color.Transparent,
      collisionGroup: GoalCollisionGroup,
    });

    this.addChild(this.#label);

    if (args.unlocked) {
      this.unlock();
    }
  }

  unlock() {
    this.body.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.White;
    this.#label.text = "Goal";
  }
}
