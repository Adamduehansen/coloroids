import { Vec2 } from 'kaboom';
import kctx from '../kctx';

export function pointAt(distance: number, angle: number): Vec2 {
  const radians = -1 * kctx.deg2rad(angle);
  return kctx.vec2(distance * Math.cos(radians), -distance * Math.sin(radians));
}
