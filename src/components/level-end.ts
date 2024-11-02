import * as ex from "excalibur";

export type LevelEndType = "next-level" | "reset-levels";

export class LevelEndComponent extends ex.Component {
  type: LevelEndType;

  constructor(levelEndType: LevelEndType) {
    super();
    this.type = levelEndType;
  }
}
