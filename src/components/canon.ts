import * as ex from "excalibur";

export class CanonComponent extends ex.Component {
  events = new ex.EventEmitter<{ fired: void }>();
  isReloading = false;

  reloadTime: number;

  constructor(reloadTime: number) {
    super();
    this.reloadTime = reloadTime;
  }

  *reload(): ReturnType<ex.CoroutineGenerator> {
    this.isReloading = true;
    let elapsed = 0;

    while (elapsed < this.reloadTime) {
      elapsed += yield 1;
    }

    this.isReloading = false;
  }

  attemptFire(): void {
    if (this.isReloading) {
      return;
    }

    this.events.emit("fired");

    ex.coroutine(this.owner!.scene!.engine, this.reload.bind(this));
  }
}
