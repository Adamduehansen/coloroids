import * as ex from "excalibur";

type LevelKey = `level-${number}`;

const LEVEL_INDEX_STORAGE_KEY = "level-index";

export class LevelManager {
  readonly #engine: ex.Engine;

  #proxyLevelIndex = new Proxy({
    levelIndex: this.#getLevelIndexInStorage(),
  }, {
    set: function (target, property, value): boolean {
      localStorage.setItem(LEVEL_INDEX_STORAGE_KEY, value);
      // @ts-ignore - this does work but TypeScript goes brr...
      target[property] = value;
      return true;
    },
  });

  constructor(engine: ex.Engine) {
    this.#engine = engine;

    this.#engine.on("level-transition", this.#goToNextLevel.bind(this));
  }

  get getCurrentLevel(): LevelKey {
    return `level-${this.#proxyLevelIndex.levelIndex}`;
  }

  #goToNextLevel(): void {
    this.#proxyLevelIndex.levelIndex += 1;
    const levelKey: LevelKey = `level-${this.#proxyLevelIndex.levelIndex}`;
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

  #getLevelIndexInStorage(): number {
    const index = localStorage.getItem(LEVEL_INDEX_STORAGE_KEY);
    if (index === null) {
      return 1;
    } else {
      return Number(index);
    }
  }
}
