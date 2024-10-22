import * as ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

export const Resources = {
  img: {
    spaceship: new ex.ImageSource("/img/spaceship.png"),
  },
  tiled: {
    testMap: new TiledResource("/maps/test-level.tmx"),
  },
} as const;

export const loader = new ex.Loader([
  ...Object.values(Resources.img),
  ...Object.values(Resources.tiled),
]);
