import { gameover1 } from "./gameover1.js";
import { fase2 } from "./fase2.js";

//criação do player 1
var player;
var chão;

//movimtação de câmeras
var moveCam = false;

//movimentação personagens
var cursors;

var fase1 = new Phaser.Scene("fase1");

fase1.preload = function() {
  //carregando imagens em geral
  this.load.image("parede", "assets/parede.png");
  this.load.image("plataforma", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("star", "assets/dude.png");
  this.load.image("telefone", "assets/fases/fase1/telefone.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("boi", "assets/boi.png");
  this.load.image("porta", "assets/portaverde.png");

  //animações dos personagem
  this.load.spritesheet("idle", "assets/ifiano/idle.png", {
    frameWidth: 38,
    frameHeight: 62
  });
  this.load.spritesheet("run", "assets/ifiano/run.png", {
    frameWidth: 43,
    frameHeight: 62
  });
  this.load.spritesheet("runleft", "assets/ifiano/runleft.png", {
    frameWidth: 43,
    frameHeight: 62
  });
  this.load.spritesheet("dead", "assets/ifiano/dead.png", {
    frameWidth: 77,
    frameHeight: 62
  });
  //mapa jogo
  this.load.tilemapTiledJSON("fase1", "assets/fases/fase1/fase1.json");
};

fase1.create = function() {
  //criando o mapa
  var map = this.add.tilemap("fase1");

  var tileset = map.addTilesetImage("plataforma", "plataforma");
  var chão = map.createStaticLayer("chão", [tileset], 0, 0);

  //parte de movimentação de cameras
  this.cameras.main.setBounds(0, 0, 3200, 600);
  this.physics.world.setBounds(0, 0, 3200, 600);

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "idle");
  //player2 = this.physics.add.sprite(150, 450, 'idle');

  //parte do player com cameras
  this.cameras.main.startFollow(player, true, 0.05, 0.05);
  //this.cameras.main.startFollow(player2, true, 0.05, 0.05);

  //  Player physics properties. Give the little guy a slight bounce.
  player.setCollideWorldBounds(true);
  //player2.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("runleft", {
      start: 0,
      end: 15
    }),
    frameRate: 15,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("idle", {
      start: 0,
      end: 15
    }),
    frameRate: 20,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("run", {
      start: 0,
      end: 15
    }),
    frameRate: 20,
    repeat: -1
  });

  this.anims.create({
    key: "dead",
    frames: this.anims.generateFrameNumbers("dead", {
      start: 0,
      end: 16
    }),
    frameRate: 10,
    repeat: 0
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
  //física do mapa
  this.physics.add.collider(player, chão);
  chão.setCollisionByProperty({
    collides: true
  });
};

fase1.update = function() {
  //teste parte de movimentação de icones na tela

  var cam = this.cameras.main;

  if (moveCam) {
    if (cursors.left.isDown) {
      cam.scrollX -= 4;
    } else if (cursors.right.isDown) {
      cam.scrollX += 4;
    }
  }

  if (cursors.up.isDown) {
    cam.scrollY -= 4;
  } else if (cursors.down.isDown) {
    cam.scrollY += 4;
  }

  //movimentação do personagem 1
  else if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
};

export { fase1 };
