import * as ex from "excalibur";

type AnimationMap<Keys extends string> = Record<Keys, ex.Graphic>;

export class AnimationComponent<Keys extends string> extends ex.Component {
  declare owner: ex.Actor & { graphics: ex.GraphicsComponent };

  type = "animation";

  #animations: Record<Keys, ex.Graphic>;

  constructor(animations: AnimationMap<Keys>) {
    super();
    this.#animations = animations;
  }

  set(name: Keys) {
    this.owner.graphics.use(this.#animations[name]);
  }
}
