export default class HudManager {
  static updateLifesText(lifes: number) {
    document.querySelector("#lifes")!.textContent = `Lifes: ${lifes}`;
  }
}
