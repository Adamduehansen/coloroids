import * as ex from "excalibur";
import type { FactoryProps, TiledResource } from "@excaliburjs/plugin-tiled";
import { SmallAsteroid } from "../actors/small-asteroid.ts";
import { LargeAsteroid } from "../actors/large-asteroid.ts";

interface Args {
  tilemap: TiledResource;
}

export class LevelScene extends ex.Scene {
  #tilemap: TiledResource;

  #entityFactory: Record<string, (props: FactoryProps) => ex.Actor> = {
    Text: function (props) {
      return new ex.Label({
        x: props.object?.x ?? 0,
        y: props.object?.y ?? 0,
        text: props.object?.tiledObject?.text?.text ?? "",
        width: props.object?.tiledObject?.width ?? 100,
        height: props.object?.tiledObject?.height ?? 100,
        collisionType: ex.CollisionType.PreventCollision,
        z: props.layer.order ?? 0,
        color: ex.Color.White,
      });
    },
    SmallAsteroid: function (props): ex.Actor {
      const color = props.object?.properties.get("color")?.toString() ??
        "ffffff";

      return new SmallAsteroid({
        vel: ex.vec(
          ex.randomIntInRange(-50, 50),
          ex.randomIntInRange(-50, 50),
        ),
        color: ex.Color.fromHex(color),
        pos: props.worldPos,
      });
    },
    LargeAsteroid: function (props): ex.Actor {
      const color = props.object?.properties.get("color")?.toString() ??
        "ffffff";

      return new LargeAsteroid({
        vel: ex.vec(
          ex.randomIntInRange(-50, 50),
          ex.randomIntInRange(-50, 50),
        ),
        color: ex.Color.fromHex(color),
        pos: props.worldPos,
      });
    },
  };

  constructor({ tilemap }: Args) {
    super();
    this.#tilemap = tilemap;

    for (const [className, factory] of Object.entries(this.#entityFactory)) {
      this.#tilemap.registerEntityFactory(className, factory);
    }
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    this.#tilemap.addToScene(this);
  }
}
