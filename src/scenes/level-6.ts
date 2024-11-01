import * as ex from "excalibur";
import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";
import { Restart } from "../actors/restart.ts";

export class Level6 extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.level6,
    });

    this.tilemap.registerEntityFactory("Restart", (props) => {
      return new Restart({
        pos: props.worldPos,
      });
    });
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
  }
}
