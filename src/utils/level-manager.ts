import * as ex from "excalibur";

type LevelKey = `level-${number}`;

export class LevelManager {
  readonly #engine: ex.Engine;

  #currentLevelIndex: number;

  constructor(engine: ex.Engine) {
    this.#engine = engine;
    this.#currentLevelIndex = 1;

    this.#engine.on("level-transition", this.#goToNextLevel.bind(this));
  }

  get getCurrentLevel(): LevelKey {
    return `level-${this.#currentLevelIndex}`;
  }

  #goToNextLevel(): void {
    this.#currentLevelIndex += 1;
    const levelKey: LevelKey = `level-${this.#currentLevelIndex}`;
    ex.Logger.getInstance().info(`Transition to "${levelKey}"`);
    this.#engine.goToScene(levelKey, {
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
