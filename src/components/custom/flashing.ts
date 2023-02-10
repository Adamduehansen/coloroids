import { Comp, GameObj } from 'kaboom';
import kctx from '../../kctx';

interface FlashingComp extends Comp {
  pauseFlashing: boolean;
}

export default function flashing(
  interval: number,
  options?: {
    paused: boolean;
  }
): FlashingComp {
  let pauseFlashing = options?.paused || false;
  let animationTimer = 0;
  return {
    pauseFlashing: pauseFlashing,
    update: function (this: GameObj<FlashingComp>) {
      if (this.pauseFlashing) {
        this.hidden = false;
        animationTimer = 0;
        return;
      }

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
