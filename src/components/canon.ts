import * as ex from "excalibur";

export class CanonComponent extends ex.Component {
  events = new ex.EventEmitter<{ fired: void }>();

  fire(): void {
    this.events.emit("fired");
  }
}
