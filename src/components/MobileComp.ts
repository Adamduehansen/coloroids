import { Comp, GameObj, PosComp, RotateComp, Vec2 } from 'kaboom';
import kctx from '../kctx';

export interface MobileComp extends Comp {
  speed: number;
}

function pointAt(distance: number, angle: number): Vec2 {
  const radians = -1 * kctx.deg2rad(angle);
  return kctx.vec2(distance * Math.cos(radians), -distance * Math.sin(radians));
}

export function mobile(): MobileComp {
  return {
    speed: 0,
    update: function (this: GameObj<MobileComp | PosComp | RotateComp>) {
      this.move(pointAt(this.speed, this.angle));
    },
    require: ['rotate'],
  };
}
