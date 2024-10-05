export type Facing = "up" | "right" | "down" | "left";

const Facing: Record<Facing, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
} as const;

export function adaptToRotation(facing: keyof typeof Facing): number | never {
  return Facing[facing] * Math.PI / 180;
}
