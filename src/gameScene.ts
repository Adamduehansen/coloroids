import { Color } from 'kaboom';
import combineColors, { ColorChannels } from './combineColors';
import kctx from './kctx';
import { mobile } from './components/MobileComp';
import { wrap } from './components/WrapComp';

kctx.loadSprite('spaceship', 'spaceship.png');

function getColorChannels(color: Color): ColorChannels {
  const { r, g, b } = color;
  return {
    r: r,
    g: g,
    b: b,
  };
}

// const LEVEL_1_ASTEROID_COLORS = [kctx.RED, kctx.GREEN, kctx.BLUE];
// // const LEVEL_2_ASTEROID_COLORS = [kctx.YELLOW, kctx.CYAN, kctx.MAGENTA];

// function spawnAsteroid() {
//   const colorIndex = Math.floor(kctx.rand(0, LEVEL_1_ASTEROID_COLORS.length));
//   kctx.add([
//     kctx.rect(16, 16),
//     kctx.color(LEVEL_1_ASTEROID_COLORS[colorIndex]),
//     kctx.pos(200, 200),
//     kctx.origin('center'),
//   ]);
// }

function gameScene(): void {
  let score = 0;

  kctx.layers(['obj', 'ui'], 'obj');

  const ui = add([layer]);
  ui.onDraw(() => {
    kctx.drawText({
      text: `Score ${score}`,
      size: 14,
      font: 'sink',
      pos: kctx.vec2(8, 24),
    });
  });

  const player = kctx.add([
    kctx.sprite('spaceship'),
    kctx.color(kctx.WHITE),
    kctx.pos(kctx.width() / 2, kctx.height() / 2),
    kctx.solid(),
    kctx.origin('center'),
    kctx.rotate(0),
    kctx.area(),
    wrap(),
    mobile(),
    'player',
    {
      turn_speed: 4.58,
      max_thrust: 48,
      acceleration: 2,
      deceleration: 4,
      lives: 3,
      can_shoot: true,
      laser_cooldown: 0.5,
      invulnerable: false,
      invulnerablity_time: 3,
      animation_frame: 0,
      thrusting: false,
    },
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

  // kctx.loop(2, spawnAsteroid);

  kctx.onKeyDown('left', () => {
    player.angle -= player.turn_speed;
  });

  kctx.onKeyDown('right', () => {
    player.angle += player.turn_speed;
  });

  kctx.onKeyDown('up', () => {
    player.speed = Math.min(
      player.speed + player.acceleration,
      player.max_thrust
    );
  });

  kctx.onKeyDown('down', () => {
    player.speed = Math.max(
      player.speed - player.deceleration,
      -player.max_thrust
    );
  });
}

export default gameScene;
