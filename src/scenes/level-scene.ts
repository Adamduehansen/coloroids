import * as ex from "excalibur";
import type { FactoryProps, TiledResource } from "@excaliburjs/plugin-tiled";

interface Args {
  tilemap: TiledResource;
}

export class LevelScene extends ex.Scene {
  #tilemap: TiledResource;

  #entityFactory: Record<
    string,
    (props: FactoryProps) => ex.Actor | undefined
  > = {
    Text: function (props) {
      return new ex.Label({
        x: props.object?.x ?? 0,
        y: props.object?.y ?? 0,
        text: props.object?.tiledObject?.text?.text ?? "",
        width: props.object?.tiledObject?.width ?? 100,
        height: props.object?.tiledObject?.height ?? 100,
        collisionType: ex.CollisionType.PreventCollision,
        z: props.layer.order ?? 0,
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
