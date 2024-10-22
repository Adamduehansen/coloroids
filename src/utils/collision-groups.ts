import * as ex from "excalibur";

export const PlayerCollisionGroup = ex.CollisionGroupManager.create("player");
export const BulletCollisionGroup = ex.CollisionGroupManager.create("bullet");
export const AsteroidCollisionGroup = ex.CollisionGroupManager.create(
  "asteroid",
);
