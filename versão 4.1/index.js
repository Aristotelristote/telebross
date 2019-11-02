import { start } from "./start.js";
import { fase1 } from "./fase1.js";
import { fase2 } from "./fase2.js";
import { gameover1 } from "./gameover1.js";
import { gameover2 } from "./gameover2.js";

var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 390
      },
      debug: true
    }
  },
  // Suporte a tela cheia
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  // Várias cenas, em sequência
  scene: [start, fase1, gameover1, fase2, gameover2] //removendo gameover2 funciona
};

var game = new Phaser.Game(config);
