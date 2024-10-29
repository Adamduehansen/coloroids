import * as ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

export const Resources = {
  img: {
    spaceship: new ex.ImageSource("/img/spaceship.png"),
  },
  tiled: {
    testMap: new TiledResource("/maps/test-level.tmx"),
    level1: new TiledResource("/maps/level-1.tmx"),
    level2: new TiledResource("/maps/level-2.tmx"),
    level3: new TiledResource("/maps/level-3.tmx"),
  },
} as const;

export const loader = new ex.Loader([
  ...Object.values(Resources.img),
  ...Object.values(Resources.tiled),
]);
