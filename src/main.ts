import Phaser from "phaser";
import { SceneKeys } from "./constants";
import GameBackground from "./scenes/Background";
import GameScene from "./scenes/Game";
import TitleScene from "./scenes/TitleScreen";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  // scene: [TitleScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
game.scene.add(SceneKeys.TitleScreen, TitleScene);
game.scene.add(SceneKeys.GameScreen, GameScene);
game.scene.add(SceneKeys.GameBackground, GameBackground);
game.scene.start(SceneKeys.TitleScreen);
