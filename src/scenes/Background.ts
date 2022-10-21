import Phaser from "phaser";
import { Color } from "../constants";
class GameBackground extends Phaser.Scene {
  preload() {}
  create() {
    this.add.line(400, 250, 0, 0, 0, 500, Color.white, 1).setLineWidth(2);
    this.add.circle(400, 250, 50).setStrokeStyle(5, Color.white);
    console.log("gameBackground");
  }
}
export default GameBackground;
