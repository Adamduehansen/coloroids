import { Comp, GameObj, PosComp, RotateComp } from 'kaboom';
import { pointAt } from '../lib/pointAt';

export interface MobileComp extends Comp {
  speed: number;
}

export function mobile(speed: number = 0): MobileComp {
  return {
    speed: speed,
    update: function (this: GameObj<MobileComp | PosComp | RotateComp>) {
      this.move(pointAt(this.speed, this.angle));
    },
    require: ['rotate'],
  };
}
