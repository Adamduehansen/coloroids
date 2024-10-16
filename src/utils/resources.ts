import * as ex from "excalibur";

export const Resources = {
  img: {
    spaceship: new ex.ImageSource("/img/spaceship.png"),
  },
} as const;

export const loader = new ex.Loader([...Object.values(Resources.img)]);
