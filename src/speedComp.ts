import { Comp, GameObj, PosComp } from 'kaboom';

export interface SpeedComp extends Comp {
  xSpeed: number;
  ySpeed: number;
}

export function speed(): SpeedComp {
  return {
    xSpeed: 0,
    ySpeed: 0,
    update: function (this: GameObj<SpeedComp | PosComp>) {
      if (this.xSpeed > 2) {
        this.xSpeed = 2;
      }

      if (this.xSpeed < -2) {
        this.xSpeed = -2;
      }

      if (this.ySpeed > 2) {
        this.ySpeed = 2;
      }

      if (this.ySpeed < -2) {
        this.ySpeed = -2;
      }

      this.moveBy(this.xSpeed, this.ySpeed);
    },
  };
}
