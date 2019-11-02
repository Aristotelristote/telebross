import { gameover1 } from "./gameover1.js";
import { fase2 } from "./fase2.js";

//criação do player 1/2
var player;
//var player2;

//criação de inimigos
var bombs;
//var inimigoX; // posicao x do slime
//var inimigoY; // posicao y do slime
var inimigo;
//var inimigopoint = 400;

//plataformas/icones na tela
var scoreText;
var scoreText2;
var scoreJogador1 = 0;
var scoreJogador2 = 0;
var platforms;

//parte de coletáveis
var stars;
var telefones;
//var antena;

//movimtação de câmeras
var moveCam = false;

//movimentação personagens
var cursors;
var WKey;
var AKey;
var DKey;

//mudança de cena
var gameOver = false;
var proximafase = false;
var portas;

//adicionando sons
var music;

var fase1 = new Phaser.Scene("fase1");

fase1.preload = function() {
  console.log("fase1.preload");
  //carregando imagens em geral
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
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

  //animação coletáveis
  this.load.spritesheet("dude", "assets/fases/fase1/antena.png", {
    frameWidth: 60,
    frameHeight: 59
  });

  //fullscreen
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  //animação da porta
  this.load.spritesheet("saida", "assets/saida.png", {
    frameWidth: 60,
    frameHeight: 85
  });

  //animações dos inimigos
  /*this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  });*/

  //audios do jogo
  this.load.audio("music", "assets/sons/music.mp3");
};

fase1.create = function() {
  //parte de movimentação de cameras
  this.cameras.main.setBounds(0, 0, 3200, 600);
  this.physics.world.setBounds(0, 0, 3200, 600);

  //parte de tela dupla no jogo local, ajutar alguns detalhes
  //this.cameras.main.setSize(800, 300);
  //this.cameras.add(0, 300, 800, 300);

  //  colocando a imagem de fundo
  this.add.image(400, 300, "parede");
  this.add.image(1200, 300, "parede");
  this.add.image(2000, 300, "parede");
  this.add.image(2800, 300, "parede");

  //adionando imagem de porta
  this.add.image(3000, 510, "porta");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  criando física das plataformas
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms
    .create(400, 700, "ground")
    .setScale(2)
    .refreshBody(); // chão
  platforms
    .create(1200, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão
  platforms
    .create(2000, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão
  platforms
    .create(2800, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão
  platforms
    .create(3600, 700, "ground")
    .setScale(2)
    .refreshBody();
  platforms
    .create(3600, 500, "ground")
    .setScale(2)
    .refreshBody();
  platforms
    .create(-400, 500, "ground")
    .setScale(2)
    .refreshBody();
  platforms
    .create(600, 440, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1
  platforms
    .create(350, 310, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2

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

  //animação de coletável
  this.anims.create({
    key: "dude",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 9
    }),
    frameRate: 20,
    repeat: -1
  });

  //animação da porta
  this.anims.create({
    key: "saida",
    frames: this.anims.generateFrameNumbers("saida", {
      start: 0,
      end: 4
    }),
    frameRate: 1,
    repeat: 0
  });
  //animação do 'inimigo'
  this.anims.create({
    key: "dude",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 9
    }),
    frameRate: 20,
    repeat: -1
  });

  //adicionando musica de fundo

  music = this.sound.add("music");
  music.play({
    loop: true,
    volume: 0.3
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
  WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: "star",
    repeat: 2,
    setXY: {
      x: 12,
      y: 0,
      stepX: 70
    }
  });

  stars.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  //adicionando coletável como a estrela
  telefones = this.physics.add.group({
    key: "telefone",
    repeat: 3,
    setXY: {
      x: 500,
      y: 0,
      stepX: 70
    }
  });

  telefones.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();
  portas = this.physics.add.group();
  inimigo = this.physics.add.group();

  //  The score1
  scoreText = this.add.text(16, 16, "score1: 0", {
    fontSize: "32px",
    fill: "#000"
  });
  scoreText.setScrollFactor(0);

  //  The score2
  /*scoreText2 = this.add.text(16, 40, 'score2: 0', {
    fontSize: '32px',
    fill: '#000'
  });
  scoreText2.setScrollFactor(0);*/

  //fullscreen
  var button = this.add
    .image(800 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive();

  button.on(
    "pointerup",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);

        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);

        this.scale.startFullscreen();
      }
    },
    this
  );
  button.setScrollFactor(0);

  var FKey = this.input.keyboard.addKey("F");

  FKey.on(
    "down",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  //this.physics.add.collider(player2, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(telefones, platforms); //coletável com plataforma
  //this.physics.add.collider(antena, platforms); //coletável com plataforma
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(portas, platforms);
  this.physics.add.collider(inimigo, platforms);
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.overlap(player, telefones, abrirporta, null, this);
  //this.physics.add.overlap(player, telefones, coletar, null, this); //coletar coletáveis

  this.physics.add.collider(player, bombs, hitBomb, null, this);
  //this.physics.add.collider(player2, bombs, hitBomb, null, this);
  this.physics.add.collider(player, portas, mudarfase, null, this);
  this.physics.add.collider(player, inimigo, hitBomb, null, this);

  //adicionando inimigo
  var boneco = inimigo.create(500, 510, "dude");
  boneco.setBounce(1);
  boneco.setCollideWorldBounds(true);
  boneco.setVelocity(Phaser.Math.Between(-200, 200), 20);
  boneco.allowGravity = false;
};

fase1.update = function() {
  /*
    slimeX = slime.body.x;
    slimeY = slime.body.y;

    slimeguard = slimeX - slimepoint;*/

  //gameover animação
  /*if (gameOver === true) {
    this.scene.start(gameover); //ao morrer o jogo não reiniciar
  }*/

  //mudaça de fase
  /*if (proximafase === true) {
    this.scene.start(fase2); // não troca a cena, aparece a porta e a animação
  }*/

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

  //          morte com animação
  /* if (player.anims.getCurrentKey() === "dead" &&
     player.anims.getProgress("dead") < 1) {
     //player.setTint(0xff0000);
   } else if (
     player.anims.getCurrentKey() === "dead" &&
     player.anims.getProgress("dead") === 1) {

     this.physics.pause();
     music.stop();
     gameOver = true;
   }*/

  //          mudança de fase com animação
  /*if (porta) {

    if (porta.anims.getCurrentKey() === "saida" && //fica gerando erro nessa linha falando que não esta definido.
      portas.anims.getProgress("saida") < 1) {
      //player.setTint(0xff0000);
    } else if (
      portas.anims.getCurrentKey() === "saida" &&
      portas.anims.getProgress("saida") === 1) {

      //this.physics.pause();
      music.stop();
      proximafase = true;
    }
  }*/

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
  //movimentação personagem 2
  /*
    if (AKey.isDown) {
      player2.setVelocityX(-160);

      player2.anims.play('left', true);
    } else if (DKey.isDown) {
      player2.setVelocityX(160);

      player2.anims.play('right', true);
    } else

    {
      player2.setVelocityX(0);

      player2.anims.play('turn');
    }
    if (WKey.isDown && player2.body.touching.down) {
      player2.setVelocityY(-330);
    }
  */

  //movimentação inimigo
  /*if ((inimigo.body.position.x - 400) > 75) {
    inimigo.setVelocityX(-100);
    //slime.setFlipX(false);
    inimigo.anims.play('dude', true);
  } else if ((inimigo.body.position.x - 400) < -75) {
    inimigo.setVelocityX(100);
    //slime.setFlipX(true);
    inimigo.anims.play('dude', true);
  }*/
};

//coletar estrelas e aparecer bombas/inimigo

function collectStar(player, telefone, boneco) {
  telefone.disableBody(true, true);

  //  Add and update the score
  scoreJogador1 += 1;
  scoreText.setText("Score1: " + scoreJogador1);

  if (telefones.countActive(true) === 0) {
    //  A new batch of stars to collect
    telefones.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

    //criação do personagem no mapa
    var boneco = inimigo.create(500, 510, "dude");
    // boneco.setBounce(1);
    boneco.setCollideWorldBounds(true);
    boneco.setVelocity(Phaser.Math.Between(-450, 0), 0);
    boneco.allowGravity = true;
  }
}

//aparecer porta para troca de fase
function abrirporta(player, telefone) {
  telefone.disableBody(true, true);

  //  Add and update the score
  scoreJogador1 += 1;
  scoreText.setText("Score1: " + scoreJogador1);

  if (telefones.countActive(true) === 0) {
    //  A new batch of stars to collect
    telefones.children.iterate(function(child) {
      child.enableBody(true, 0, 0, true, true);
    });

    //var x = (player.x < 400) // ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var porta = portas.create(3000, 500, "saida");
    //this.physics.pause();
    //porta.setBounce(1);
    porta.setCollideWorldBounds(true);
    // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
    porta.allowGravity = true;
  }
}

//coletar coletáveis para aparecer porta
/*function coletarnota(player, telefone) {
  telefone.disableBody(true, true);

  //  Add and update the score  
  scoreJogador1 += 1; //fazer com que o score fique independente
  scoreText.setText('Score1: ' + scoreJogador1);


  if (telefones.countActive(true) === 0) {
    //  A new batch of stars to collect
    telefones.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


    var porta = portas.create(x, 16, 'saida');
    //this.physics.pause();
    //porta.setBounce(1);
    porta.setCollideWorldBounds(true);
    // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
    porta.allowGravity = true;


  }
}*/

function hitBomb(player, bomb) {
  // this.physics.pause();

  player.setTint(0xff0000);
  // player.anims.play('dead', true);
  this.physics.pause();
  music.stop();
  gameOver = true;
  this.scene.start(gameover1);

  //criar atraso na morte para que apareça a animação
}

function mudarfase(player, portas) {
  // this.physics.pause();
  player.disableBody(true, true);

  player.setTint(0xff0000);
  portas.anims.play("saida", true);
  //mudaça de fase
  gameOver = true;
  this.scene.start(fase2); // não troca a cena, aparece a porta e a animação
}

export { fase1 };
