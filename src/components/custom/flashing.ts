import { Comp, GameObj } from 'kaboom';
import kctx from '../../kctx';

interface FlashingComp extends Comp {}

export default function flashing(interval: number): FlashingComp {
  let animationTimer = 0;
  return {
    update: function (this: GameObj) {
      animationTimer += kctx.dt();

      if (animationTimer <= interval) {
        this.hidden = true;
      } else if (animationTimer > interval && animationTimer <= interval * 2) {
        this.hidden = false;
      } else {
        animationTimer = 0;
      }
    },
  };
}
