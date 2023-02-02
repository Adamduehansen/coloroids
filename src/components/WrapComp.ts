import { Comp, GameObj, PosComp } from 'kaboom';
import kctx from '../kctx';

interface WrapComp extends Comp {
  enable: boolean;
}

export function wrap(): WrapComp {
  return {
    enable: true,
    update: function (this: GameObj<PosComp | WrapComp>) {
      if (!this.enable) {
        return;
      }

      if (this.pos.x < 0) {
        this.pos.x = kctx.width();
      }
      if (this.pos.x > kctx.width()) {
        this.pos.x = 0;
      }
      if (this.pos.y < 0) {
        this.pos.y = kctx.height();
      }
      if (this.pos.y > kctx.height()) {
        this.pos.y = 0;
      }
    },
  };
}
