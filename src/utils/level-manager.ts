import * as ex from "excalibur";

export class LevelManager {
  #engine: ex.Engine;
  #currentLevelKey: string;

  constructor(engine: ex.Engine) {
    this.#engine = engine;

    this.#currentLevelKey = "level-1";

    this.#engine.on("level-transition", () => {
      ex.Logger.getInstance().info("Transition");
    });
  }

  get getCurrentLevel(): string {
    return this.#currentLevelKey;
  }
}
