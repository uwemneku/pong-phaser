import Phaser from "phaser";
import { SceneKeys } from "../constants";
import WebFontFile from "../utils/WebFontFile";

class TitleScene extends Phaser.Scene {
  instructions!: Phaser.GameObjects.Group;
  constructor() {
    super({ key: SceneKeys.TitleScreen });
  }
  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }
  create() {
    const title = this.add.text(400, 250, "Ping Pong Go", {
      fontSize: "50px",
      fontFamily: `"Press Start 2P"`,
    });
    title.setOrigin(0.5, 0.5);
    const text = this.add.text(400, 350, "Press Space to start", {
      fontSize: "20px",
      fontFamily: `"Press Start 2P"`,
    });
    text.setOrigin(0.5);
    this.instructions = this.add.group([title, text]);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.instructions.children.iterate((i) => console.log(i));
      this.scene.start(SceneKeys.GameScreen);
    });
  }

  update(time: number, delta: number): void {
    // console.log(time);
  }
}

export default TitleScene;
