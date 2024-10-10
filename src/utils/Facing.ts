export type Facing = "up" | "right" | "down" | "left";

const Facing: Record<Facing, number> = {
  up: 270,
  right: 0,
  down: 90,
  left: 180,
} as const;

export function adaptToRotation(facing: keyof typeof Facing): number | never {
  return Facing[facing] * Math.PI / 180;
}
