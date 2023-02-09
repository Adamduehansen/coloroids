import { Color, Vec2 } from 'kaboom';
import combineColors, { ColorChannels } from '../lib/combineColors';
import kctx from '../kctx';
import { mobile } from '../components/custom/MobileComp';
import { wrap } from '../components/custom/WrapComp';
import { pointAt } from '../lib/pointAt';

kctx.loadSprite('spaceship', 'spaceship.png');
kctx.loadSprite('asteroids', 'asteroids.png', {
  sliceX: 2,
  sliceY: 1,
});

const SMALL_ASTEROID_COLORS = [kctx.RED, kctx.GREEN, kctx.BLUE];
const LARGE_ASTEROID_COLORS = [kctx.YELLOW, kctx.CYAN, kctx.MAGENTA];
const MAX_NUMBER_OF_ASTEROIDS = 5;

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

function renderUI(options: { score: number; lives: number }): void {
  const { score, lives } = options;
  kctx.drawText({
    text: `Score ${score}`,
    size: 14,
    font: 'sink',
    pos: kctx.vec2(8, 32),
  });

  kctx.drawText({
    text: 'Lives: ',
    size: 14,
    font: 'sink',
    pos: kctx.vec2(8),
  });

  for (let x = 80; x < 80 + 16 * lives; x += 16) {
    kctx.drawSprite({
      sprite: 'spaceship',
      pos: kctx.vec2(x, 14),
      angle: -90,
      origin: 'center',
      scale: 0.7,
    });
  }
}

function gameScene(): void {
  let score = 0;
  let gameOver = false;

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

  function spawnAsteroid(options?: { small: boolean; position: Vec2 }) {
    let { small = kctx.rand(0, 1) > 0.5, position = getAsteroidSpawnPoint() } =
      options || {};

    const asteroid = kctx.add([
      kctx.sprite('asteroids', {
        frame: kctx.choose([0, 1]),
        width: small ? 48 : 24,
        height: small ? 48 : 24,
      }),
      kctx.pos(position),
      kctx.rotate(kctx.rand(1, 90)),
      kctx.origin('center'),
      kctx.color(
        small
          ? kctx.choose(LARGE_ASTEROID_COLORS)
          : kctx.choose(SMALL_ASTEROID_COLORS)
      ),
      kctx.area(),
      kctx.solid(),
      mobile(kctx.rand(-50, 50)),
      wrap(),
      'asteroid',
      {
        initializing: true,
        points: small ? 2 : 1,
      },
    ]);

    // @ts-ignore isColliding does not typecheck with a string but Kaboom allows this.
    while (asteroid.isColliding('mobile')) {
      position = getAsteroidSpawnPoint();
      asteroid.pos = position;
      asteroid.pushOutAll();
    }

    asteroid.onDestroy(() => {
      if (gameOver) {
        return;
      }

      if (!small) {
        spawnAsteroid();
        spawnAsteroid();
      } else {
        spawnAsteroid({
          small: false,
          position: asteroid.pos,
        });
        spawnAsteroid({
          small: false,
          position: asteroid.pos,
        });
      }
    });

    asteroid.initializing = false;
  }

  function setGameOver(): void {
    kctx.add([
      kctx.text(`GAME OVER\n\nScore: ${score}\n\n[S]tart again?`, {
        size: 20,
      }),
      kctx.pos(kctx.width() / 2, kctx.height() / 2),
      kctx.layer('ui'),
      kctx.origin('center'),
    ]);

    gameOver = true;
  }

  kctx.layers(['obj', 'ui'], 'obj');

  const ui = add([kctx.layer('ui')]);

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
      turnSpeed: 3,
      maxThrust: 150,
      acceleration: 2,
      deceleration: 4,
      lives: 3,
      canShoot: true,
      laserCooldown: 0.5,
      invulnerable: false,
      invulnerablityTime: 3,
      thrusting: false,
      animateThrust: false,
    },
  ]);

  player.on('damage', () => {
    if (!player.invulnerable) {
      player.lives -= 1;
    }

    if (player.lives <= 0) {
      kctx.destroy(player);
    } else {
      player.invulnerable = true;
      kctx.wait(player.invulnerablityTime, () => {
        player.invulnerable = false;
        player.hidden = false;
      });
    }
  });

  player.onDraw(() => {
    if (!player.thrusting || !player.animateThrust) {
      return;
    }
    kctx.drawRect({
      width: 4,
      height: 4,
      origin: 'center',
      pos: kctx.vec2(-player.width / 2 - 2, 0),
    });
  });

  let timer = 0;
  kctx.onUpdate(() => {
    timer += kctx.dt();

    if (timer < 0.2) {
      player.animateThrust = true;
    } else if (timer >= 0.2 && timer < 0.4) {
      player.animateThrust = false;
    } else {
      timer = 0;
    }
  });

  let hiddenTimer = 0;
  kctx.onUpdate(() => {
    hiddenTimer += kctx.dt();
    if (hiddenTimer < 0.1) {
      return;
    }
    hiddenTimer = 0;

    if (player.invulnerable) {
      player.hidden = !player.hidden;
    }
  });

  player.onDestroy(setGameOver);

  ui.onDraw(() =>
    renderUI({
      score: score,
      lives: player.lives,
    })
  );

  kctx.onKeyPress('r', makeAddPlayerColorHandler(kctx.RED));
  kctx.onKeyPress('g', makeAddPlayerColorHandler(kctx.GREEN));
  kctx.onKeyPress('b', makeAddPlayerColorHandler(kctx.BLUE));
  kctx.onKeyPress('w', makeAddPlayerColorHandler(kctx.WHITE));
  kctx.onKeyPress('s', () => {
    if (player.lives > 0) {
      return;
    }
    kctx.go('gameScene');
  });

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

  kctx.onKeyPress('up', () => {
    player.thrusting = true;
    timer = 0;
  });
  kctx.onKeyRelease('up', () => {
    player.thrusting = false;
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
      kctx.rect(10, 5),
      kctx.pos(player.pos.add(pointAt(player.width / 2, player.angle))),
      kctx.rotate(player.angle),
      kctx.origin('center'),
      kctx.area(),
      kctx.color(player.color),
      mobile(400),
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

    if (bullet.color.toString() !== asteroid.color.toString()) {
      kctx.destroy(bullet);
      return;
    }

    kctx.destroy(bullet);
    kctx.destroy(asteroid);
    score += asteroid.points;
  });

  kctx.onCollide('asteroid', 'asteroid', (asteroid1, asteroid2) => {
    if (asteroid1.initializing || asteroid2.initializing) {
      return;
    }

    asteroid1.speed = -asteroid1.speed;
    asteroid2.speed = -asteroid2.speed;

    asteroid1.initializing = true;
    asteroid2.initializing = true;

    kctx.wait(1, () => {
      asteroid1.initializing = false;
      asteroid2.initializing = false;
    });
  });

  for (let index = 0; index < MAX_NUMBER_OF_ASTEROIDS; index++) {
    spawnAsteroid();
  }
}

export default gameScene;
