import flashing from './custom/flashing';
import { mobile } from './custom/MobileComp';
import { wrap } from './custom/WrapComp';
import kctx from '../kctx';

const playerComponents = [
  kctx.sprite('spaceship'),
  kctx.color(kctx.WHITE),
  kctx.pos(kctx.width() / 2, kctx.height() / 2),
  kctx.solid(),
  kctx.origin('center'),
  kctx.rotate(0),
  kctx.area(),
  wrap(),
  mobile(),
  flashing(0.2, {
    paused: true,
  }),
  'player',
  {
    turnSpeed: 3,
    maxThrust: 150,
    acceleration: 2,
    deceleration: 4,
    canShoot: true,
    laserCooldown: 0.5,
    invulnerable: false,
    invulnerablityTime: 3,
    thrusting: false,
    animateThrust: false,
  },
];

export default playerComponents;
