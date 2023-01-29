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
import { speed, SpeedComp } from './speedComp';

type Player = GameObj<RectComp | ColorComp | PosComp | OriginComp | SpeedComp>;

function getColorChannels(color: Color): ColorChannels {
  const { r, g, b } = color;
  return {
    r: r,
    g: g,
    b: b,
  };
}

function gameScene(): void {
  const player: Player = kctx.add([
    kctx.rect(16, 16),
    kctx.color(kctx.WHITE),
    kctx.pos(kctx.width() / 2, kctx.height() / 2),
    kctx.origin('center'),
    speed(),
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

  onUpdate(() => {
    if (kctx.isKeyDown('up')) {
      player.ySpeed -= 0.05;
    }
    if (kctx.isKeyDown('right')) {
      player.xSpeed += 0.05;
    }
    if (kctx.isKeyDown('down')) {
      player.ySpeed += 0.05;
    }
    if (kctx.isKeyDown('left')) {
      player.xSpeed -= 0.05;
    }
  });
}

export default gameScene;
