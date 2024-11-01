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
    level4: new TiledResource("/maps/level-4.tmx"),
    level5: new TiledResource("/maps/level-5.tmx"),
    level6: new TiledResource("/maps/level-6.tmx"),
  },
} as const;

export const loader = new ex.Loader([
  ...Object.values(Resources.img),
  ...Object.values(Resources.tiled),
]);
