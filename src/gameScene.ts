import {
  Color,
  GameObj,
  RectComp,
  ColorComp,
  PosComp,
  OriginComp,
} from 'kaboom';
import combineColors, { ColorChannels } from './combineColors';
import kctx from './kctx';

type Player = GameObj<RectComp | ColorComp | PosComp | OriginComp>;

let ySpeed = 0;
let xSpeed = 0;

function getColorChannels(color: Color): ColorChannels {
  const { r, g, b } = color;
  return {
    r: r,
    g: g,
    b: b,
  };
}

function updateSpeedByControl() {
  if (kctx.isKeyDown('up')) {
    ySpeed -= 0.05;
  }
  if (kctx.isKeyDown('right')) {
    xSpeed += 0.05;
  }
  if (kctx.isKeyDown('down')) {
    ySpeed += 0.05;
  }
  if (kctx.isKeyDown('left')) {
    xSpeed -= 0.05;
  }
}

function resetToMaxSpeed(): void {
  if (xSpeed > 2) {
    xSpeed = 2;
  }

  if (xSpeed < -2) {
    xSpeed = -2;
  }

  if (ySpeed > 2) {
    ySpeed = 2;
  }

  if (ySpeed < -2) {
    ySpeed = -2;
  }
}

function gameScene(): void {
  const player: Player = kctx.add([
    kctx.rect(16, 16),
    kctx.color(kctx.WHITE),
    kctx.pos(kctx.width() / 2, kctx.height() / 2),
    kctx.origin('center'),
    'player',
  ]);

  function makeAddPlayerColorHandler(color: Color): () => void {
    return function (): void {
      const { r, g, b } = combineColors(
        getColorChannels(player.color),
        getColorChannels(color)
      );
      player.color.r = r;
      player.color.g = g;
      player.color.b = b;
    };
  }

  kctx.onKeyPress('r', makeAddPlayerColorHandler(kctx.RED));
  kctx.onKeyPress('g', makeAddPlayerColorHandler(kctx.GREEN));
  kctx.onKeyPress('b', makeAddPlayerColorHandler(kctx.BLUE));
  kctx.onKeyPress('w', makeAddPlayerColorHandler(kctx.WHITE));

  onUpdate(updateSpeedByControl);
  onUpdate(resetToMaxSpeed);
  onUpdate(() => {
    player.moveBy(xSpeed, ySpeed);
  });
}

export default gameScene;
