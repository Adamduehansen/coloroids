import * as ex from "excalibur";

export class CanonComponent extends ex.Component {
  events = new ex.EventEmitter<{ fired: void }>();
  isReloading = false;

  reloadTime: number;

  constructor(reloadTime: number) {
    super();
    this.reloadTime = reloadTime;
  }

  attemptFire(): void {
    if (this.isReloading) {
      return;
    }

    this.events.emit("fired");

    this.isReloading = true;
  }
}
