import Phaser, { Math } from "phaser";
import { Color, SceneKeys } from "../constants";
import WebFontFile from "../utils/WebFontFile";

type ScoreText = { updateScore: () => void };
export default class GameScene extends Phaser.Scene {
  ballVelocity = { x: 100, y: 100 };
  cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  paddleLeft!: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
  paddleRight!: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
  ball!: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
  leftScore!: ScoreText;
  rightScore!: ScoreText;
  constructor() {
    super({ key: SceneKeys.GameScreen });
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }
  create() {
    this.scene.run(SceneKeys.GameBackground);
    this.scene.sendToBack(SceneKeys.GameBackground);
    this.physics.world.setBounds(-100, 0, 1000, 500);
    this.ball = this.physics.add.existing(
      this.add.circle(400, 250, 10, 0xffff, 1),
      false
    ) as Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.setCircle(10);
    // this.resetBall();

    this.paddleLeft = this.createPaddle(50, 250);
    this.paddleRight = this.createPaddle(750, 250);
    this.physics.add.collider(this.paddleLeft, this.ball);
    this.physics.add.collider(this.paddleRight, this.ball);

    this.leftScore = this.createText(300, 125);
    this.rightScore = this.createText(500, 125);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.time.delayedCall(1500, () => this.resetBall());
  }

  update() {
    this.moveUserPaddle();
    this.moveComputerPaddle();
    this.updateScore();
  }
  createPaddle(x: number, y: number) {
    const paddle = this.physics.add.existing(
      this.add.rectangle(x, y, 30, 100, Color.white, 1)
    ) as Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
    paddle.body.setImmovable(true);
    paddle.body.allowGravity = false;
    paddle.body.setCollideWorldBounds(true);

    return paddle;
  }
  createText(x: number, y: number): ScoreText {
    let score = 0;
    const text = this.add
      .text(x, y, "Score: 0", {
        fontSize: "20px",
        fontFamily: `"Press Start 2P"`,
      })
      .setOrigin(0.5, 0.5);
    const updateScore = () => {
      text.text = `Score: ${(score += 1)}`;
      text.updateText();
    };
    return { updateScore } as ScoreText;
  }
  moveUserPaddle() {
    if (this.cursor?.down.isDown) {
      this.paddleLeft.body.setVelocityY(200);
    } else if (this.cursor?.up.isDown) {
      this.paddleLeft.body.setVelocityY(-200);
    } else {
      this.paddleLeft.body.setVelocityY(0);
    }
  }
  moveComputerPaddle() {
    const diff = this.ball.body.y - this.paddleRight.body.y;
    if (diff < -10) {
      this.paddleRight.body.setVelocityY(-150);
    } else if (diff > 90) {
      this.paddleRight.body.setVelocityY(150);
    }
  }
  updateScore() {
    const x = this.ball.body.x;
    if (x < -30) {
      this.rightScore.updateScore();
    } else if (x > 830) {
      this.leftScore.updateScore();
    }
    if (x < -30 || x > 830) {
      this.resetBall();
    }

    this.ball.body.velocity.x *= 1.0001;
    this.ball.body.velocity.y *= 1.0001;
  }
  resetBall() {
    this.ball.body.reset(400, 250);
    const angle = Math.Between(0, 360);
    const vev = this.physics.velocityFromAngle(angle, 200);
    this.ball.body.setVelocity(vev.x, vev.y);
    this.ball.body.setBounce(1, 1);
  }
}
