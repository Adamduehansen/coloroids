import './style.css';
import kaboom, {
  Color,
  GameObj,
  RectComp,
  ColorComp,
  PosComp,
  OriginComp,
} from 'kaboom';

const kctx = kaboom({
  width: 600,
  height: 600,
  background: [],
});

type Player = GameObj<RectComp | ColorComp | PosComp | OriginComp>;

function gameScene(): void {
  const player: Player = kctx.add([
    kctx.rect(16, 16),
    kctx.color(kctx.WHITE),
    kctx.pos(kctx.width() / 2, kctx.height() / 2),
    kctx.origin('center'),
  ]);

  function makeAddPlayerColorHandler(color: Color): () => void {
    return function () {
      const { r, g, b } = color;
    };
  }

  kctx.onKeyPress('r', makeAddPlayerColorHandler(kctx.RED));
  kctx.onKeyPress('g', makeAddPlayerColorHandler(kctx.GREEN));
  kctx.onKeyPress('b', makeAddPlayerColorHandler(kctx.BLUE));
}

scene('game-scene', gameScene);

go('game-scene');
