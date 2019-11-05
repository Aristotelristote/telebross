import { fase1 } from "./fase1.js";

var start = new Phaser.Scene("start");

var player;
var stars;
var bombs;
var platforms;
var resistor;
var capacitor;
var indutor;
var score = 0;
var gameOver = true;
var scoreText;
var music;

start.preload = function() {
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("boi", "assets/boi.png");
  this.load.image("porta", "assets/portaverde.png");
  this.load.image("parede", "assets/parede.png");
  this.load.image("resistor", "assets/fases/fase4/resistor.png");
  this.load.image("iniciar", "assets/iniciar.png");
  this.load.image("inicio", "assets/início.png");
  // this.load.image('telebross', 'assets/telebross.png');
  this.load.image("capacitor", "assets/fases/fase5/capacitor.png");
  this.load.image("indutor", "assets/fases/fase5/indutor.png");
  this.load.spritesheet("idle", "assets/ifiano/idle.png", {
    frameWidth: 38,
    frameHeight: 62
  });
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  //animação do diodo
  /*this.load.spritesheet('diodo', 'assets/fases/fase5/diodo.png', {
    frameWidth: 0,
    frameHeight: 16,
  });
  this.load.spritesheet('diodo2', 'assets/fases/fase5/diodo.png', {
    frameWidth: 9,
    frameHeight: 16
  });*/
  this.load.audio("music", "assets/sons/music.mp3");
};
start.create = function() {
  //animação do diodo
  /*this.anims.create({
    key: 'diodovermelho',
    frames: this.anims.generateFrameNumbers('diodo1', {
      start: 0,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });*/

  /*this.anims.create({
    key: 'diodoverde',
    frames: this.anims.generateFrameNumbers('diodo', {
      start: 9,
      end: 16
    }),
    frameRate: 10,
    repeat: -1
  });
  */
  //  A simple background for our game
  this.add.image(400, 300, "parede");
  this.add.image(500, 510, "porta");

  //adicionando qualquer texto ao jogo
  /*this.GameOverText = this.add.text(25, 200, 'click here play game', { //(x,y, 'texto',)
    fontSize: '64px', //tamanho do texto
    fill: '#000' //cor do texto(procurar no piskel cor desejada)

  });
  this.GameOverText.visible = true // se o texto será visível
*/
  //adicionando física das plataformas
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
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
    .create(600, 455, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1
  platforms
    .create(350, 320, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2

  //criação do player
  player = this.physics.add.sprite(100, 450, "idle");

  //player não bater nas bordas
  player.setCollideWorldBounds(true);

  //adicionando musica
  /*var music = this.sound.add('music');
  music.play();*/

  //adiconando objetos a tela
  capacitor = this.physics.add.group({
    key: "capacitor",
    repeat: 2,
    setXY: {
      x: 12,
      y: 50,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  capacitor.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.allowGravity = false;
  });

  //adiconando objetos a tela
  resistor = this.physics.add.group({
    key: "resistor",
    repeat: 2,
    setXY: {
      x: 48,
      y: 20,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  resistor.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.allowGravity = false;
  });

  //adiconando objetos a tela
  indutor = this.physics.add.group({
    key: "indutor",
    repeat: 2,
    setXY: {
      x: 64,
      y: 0,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  indutor.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.allowGravity = false;
  });

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

  //fullscreen com tecla F
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

  //criação de bombas
  bombs = this.physics.add.group();

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(resistor, platforms);
  this.physics.add.collider(capacitor, platforms);
  this.physics.add.collider(indutor, platforms);

  //adicionando musica
  var music = this.sound.add("music");

  music.play({
    loop: true,
    volume: 0.3
  });

  var trocacena = this.add
    .image(500 - 64, 400, "iniciar", 0)
    .setOrigin(1, 0)
    .setInteractive();
  trocacena.on(
    "pointerup",
    function() {
      music.stop();
      this.scene.start(fase1);
    },
    this
  );
};

export { start };
