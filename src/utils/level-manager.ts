import * as ex from "excalibur";

type LevelKey = `level-${number}`;

export class LevelManager {
  #engine: ex.Engine;
  #currentLevelKey: LevelKey;

  constructor(engine: ex.Engine) {
    this.#engine = engine;

    this.#currentLevelKey = "level-1";

    this.#engine.on("level-transition", this.#goToNextLevel.bind(this));
  }

  get getCurrentLevel(): string {
    return this.#currentLevelKey;
  }

  #getNextLevel(): LevelKey {
    return "level-2";
  }

  #goToNextLevel(): void {
    const nextLevel = this.#getNextLevel();
    ex.Logger.getInstance().info("Transition to", nextLevel);
    this.#engine.goToScene(nextLevel, {
      destinationIn: new ex.FadeInOut({
        duration: 500,
        direction: "in",
        color: ex.Color.Black,
      }),
      sourceOut: new ex.FadeInOut({
        duration: 500,
        direction: "out",
        color: ex.Color.Black,
      }),
    });
  }
}
