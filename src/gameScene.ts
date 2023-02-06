import { Color } from 'kaboom';
import combineColors, { ColorChannels } from './lib/combineColors';
import kctx from './kctx';
import { mobile } from './components/MobileComp';
import { wrap } from './components/WrapComp';
import { pointAt } from './lib/pointAt';

kctx.loadSprite('spaceship', 'spaceship.png');

function getColorChannels(color: Color): ColorChannels {
  const { r, g, b } = color;
  return {
    r: r,
    g: g,
    b: b,
  };
}

function getAsteroidSpawnPoint() {
  return kctx.choose([
    kctx.rand(kctx.vec2(0), kctx.vec2(kctx.width(), 0)),
    kctx.rand(kctx.vec2(0), kctx.vec2(0, kctx.height())),
    kctx.rand(
      kctx.vec2(0, kctx.height()),
      kctx.vec2(kctx.width(), kctx.height())
    ),
    kctx.rand(
      kctx.vec2(kctx.width(), 0),
      kctx.vec2(kctx.width(), kctx.height())
    ),
  ]);
}

const LEVEL_1_ASTEROID_COLORS = [kctx.RED, kctx.GREEN, kctx.BLUE];
const MAX_NUMBER_OF_ASTEROIDS = 5;
// // const LEVEL_2_ASTEROID_COLORS = [kctx.YELLOW, kctx.CYAN, kctx.MAGENTA];

function gameScene(): void {
  let score = 0;

  kctx.layers(['obj', 'ui'], 'obj');

  const ui = add([kctx.layer('ui')]);
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
      turnSpeed: 4.58,
      maxThrust: 48,
      acceleration: 2,
      deceleration: 4,
      lives: 3,
      canShoot: true,
      laserCooldown: 0.5,
      invulnerable: false,
      invulnerablity_time: 3,
      animation_frame: 0,
      thrusting: false,
    },
  ]);

  player.on('damage', () => {
    player.lives -= 1;

    if (player.lives >= 0) {
      return;
    }

    destroy(player);
  });

  player.on('destroy', () => {});

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
    player.angle -= player.turnSpeed;
  });

  kctx.onKeyDown('right', () => {
    player.angle += player.turnSpeed;
  });

  kctx.onKeyDown('up', () => {
    player.speed = Math.min(
      player.speed + player.acceleration,
      player.maxThrust
    );
  });

  kctx.onKeyDown('down', () => {
    player.speed = Math.max(
      player.speed - player.deceleration,
      -player.maxThrust
    );
  });

  kctx.onKeyDown('space', () => {
    if (!player.canShoot) {
      return;
    }

    kctx.add([
      kctx.rect(10, 10),
      kctx.pos(player.pos.add(pointAt(player.width / 2, player.angle))),
      kctx.rotate(player.angle),
      kctx.origin('center'),
      kctx.area(),
      kctx.color(player.color),
      mobile(100),
      'bullet',
    ]);

    player.canShoot = false;
    kctx.wait(player.laserCooldown, () => {
      player.canShoot = true;
    });
  });

  kctx.onCollide('player', 'asteroid', (player, asteroid) => {
    if (asteroid.initializing) {
      return;
    }

    kctx.destroy(asteroid);
    player.trigger('damage');
  });

  kctx.onCollide('bullet', 'asteroid', (bullet, asteroid) => {
    if (asteroid.initializing) {
      return;
    }

    kctx.destroy(bullet);
    kctx.destroy(asteroid);
    score += 1;
  });

  kctx.onCollide('asteroid', 'asteroid', (asteroid1, asteroid2) => {
    if (asteroid1.initializing || asteroid2.initializing) {
      return;
    }

    asteroid1.speed = -asteroid1.speed;
    asteroid2.speed = -asteroid2.speed;
  });

  for (let index = 0; index < MAX_NUMBER_OF_ASTEROIDS; index++) {
    let spawnPoint = getAsteroidSpawnPoint();
    const asteroid = kctx.add([
      kctx.rect(50, 50),
      kctx.pos(spawnPoint),
      kctx.rotate(kctx.rand(1, 90)),
      kctx.origin('center'),
      kctx.color(kctx.choose(LEVEL_1_ASTEROID_COLORS)),
      kctx.area(),
      kctx.solid(),
      mobile(kctx.rand(5, 10)),
      wrap(),
      'asteroid',
      {
        initializing: true,
      },
    ]);

    // @ts-ignore isColliding does not typecheck with a string but Kaboom allows this.
    while (asteroid.isColliding('mobile')) {
      spawnPoint = getAsteroidSpawnPoint();
      asteroid.pos = spawnPoint;
      asteroid.pushOutAll();
    }

    asteroid.initializing = false;
  }
}

export default gameScene;
