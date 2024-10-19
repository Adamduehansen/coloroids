import * as ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

export const Resources = {
  img: {
    spaceship: new ex.ImageSource("/img/spaceship.png"),
  },
} as const;

export const tiledMap = new TiledResource("/maps/test-level.tmx");

export const loader = new ex.Loader([...Object.values(Resources.img)]);
loader.addResource(tiledMap);
