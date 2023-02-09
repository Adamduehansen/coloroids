import { GameObj } from 'kaboom';
import kctx from './kctx';

let animationTimer = 0;
function createStartLabelAnimation(this: GameObj): void {
  animationTimer += kctx.dt();

  if (animationTimer <= 0.5) {
    this.hidden = true;
  } else if (animationTimer > 0.5 && animationTimer <= 1) {
    this.hidden = false;
  } else {
    animationTimer = 0;
  }
}

function startScene(): void {
  kctx.add([
    kctx.text('COLOROIDS', {
      size: 64,
      font: 'sink',
    }),
    kctx.origin('center'),
    kctx.pos(kctx.width() / 2, 200),
  ]);

  const startLabel = kctx.add([
    kctx.text('Press space to start', {
      size: 24,
      font: 'sink',
    }),
    kctx.origin('center'),
    kctx.pos(kctx.width() / 2, 400),
  ]);

  startLabel.onUpdate(createStartLabelAnimation);

  kctx.onKeyRelease('space', () => {
    kctx.go('gameScene');
  });
}

export default startScene;
