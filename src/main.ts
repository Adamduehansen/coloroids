import * as ex from "excalibur";
import { loader } from "./utils/resources.ts";
import { TestLevel } from "./scenes/test-level.ts";

const engine = new ex.Engine({
  width: 800,
  height: 600,
  maxFps: 60,
  suppressPlayButton: true,
  displayMode: ex.DisplayMode.FillScreen,
  physics: {
    solver: ex.SolverStrategy.Realistic,
    gravity: ex.vec(0, 0),
  },
});

const testLevel = new TestLevel();

engine.addScene("test-level", testLevel);

await engine.start(loader);
engine.goToScene("test-level");
