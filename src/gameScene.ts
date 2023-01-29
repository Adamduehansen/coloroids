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

function controlPlayerSpeed(player: Player): () => void {
  const speedDelta = 0.05;

  return () => {
    if (kctx.isKeyDown('up')) {
      player.ySpeed -= speedDelta;
    }
    if (kctx.isKeyDown('right')) {
      player.xSpeed += speedDelta;
    }
    if (kctx.isKeyDown('down')) {
      player.ySpeed += speedDelta;
    }
    if (kctx.isKeyDown('left')) {
      player.xSpeed -= speedDelta;
    }
  };
}

function checkPlayerBoundsCollision(player: Player): () => void {
  return () => {
    if (player.pos.x < 0) {
      player.pos.x = kctx.width();
    }
    if (player.pos.x > kctx.width()) {
      player.pos.x = 0;
    }
    if (player.pos.y < 0) {
      player.pos.y = kctx.height();
    }
    if (player.pos.y > kctx.height()) {
      player.pos.y = 0;
    }
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

  onUpdate(controlPlayerSpeed(player));
  onUpdate(checkPlayerBoundsCollision(player));
}

export default gameScene;
