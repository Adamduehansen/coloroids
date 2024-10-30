import * as ex from "excalibur";
import { loader } from "./utils/resources.ts";
import { TestLevel } from "./scenes/test-level.ts";
import { Level1 } from "./scenes/level-1.ts";
import { Level2 } from "./scenes/level-2.ts";
import { LevelManager } from "./utils/level-manager.ts";
import { Level3 } from "./scenes/level-3.ts";
import { Level4 } from "./scenes/level-4.ts";

const engine = new ex.Engine({
  width: 800,
  height: 600,
  maxFps: 60,
  suppressPlayButton: true,
  displayMode: ex.DisplayMode.FillScreen,
  backgroundColor: ex.Color.Black,
  physics: {
    solver: ex.SolverStrategy.Realistic,
    gravity: ex.vec(0, 0),
  },
});

const testLevel = new TestLevel();
const level1 = new Level1();
const level2 = new Level2();
const level3 = new Level3();
const level4 = new Level4();
const levelManager = new LevelManager(engine);

engine.addScene("test-level", testLevel);
engine.addScene("level-1", level1);
engine.addScene("level-2", level2);
engine.addScene("level-3", level3);
engine.addScene("level-4", level4);

await engine.start(loader);
engine.goToScene(levelManager.getCurrentLevel);
