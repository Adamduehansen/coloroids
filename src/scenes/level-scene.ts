import * as ex from "excalibur";
import type { FactoryProps, TiledResource } from "@excaliburjs/plugin-tiled";
import { SmallAsteroid } from "../actors/small-asteroid.ts";
import { LargeAsteroid } from "../actors/large-asteroid.ts";
import { Spaceship } from "../actors/spaceship.ts";
import { Goal } from "../actors/goal.ts";
import { convertToFacing } from "../utils/facing.ts";

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
    Spaceship: function (props): ex.Actor {
      const facingProp = props.object?.properties.get("facing");
      const disableCanonProp = props.object?.properties.get("disablecanon");

      const facing = typeof facingProp === "string" ? facingProp : "";
      const disableCanon = typeof disableCanonProp === "boolean"
        ? disableCanonProp
        : false;

      return new Spaceship({
        pos: props.worldPos,
        facing: convertToFacing(facing) ?? "right",
        color: ex.Color.Green,
        disableCanon: disableCanon,
      });
    },
    Goal: function (props): ex.Actor {
      const unlocked = props.object?.properties.get("unlocked");

      return new Goal({
        pos: props.worldPos,
        unlocked: typeof unlocked === "boolean" ? unlocked : false,
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
    this.#setupCamera();
  }

  #isSpaceship(entity: ex.Entity): entity is Spaceship {
    return entity instanceof Spaceship;
  }

  #setupCamera(): void {
    const spaceship = this.entities.find(this.#isSpaceship);
    if (spaceship === undefined) {
      return;
    }

    this.camera.strategy.lockToActor(spaceship);
    this.camera.zoom = 2.5;
  }
}
