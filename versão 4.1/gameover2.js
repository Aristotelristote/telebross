import {
    fase2
} from "/fase2.js";
export {
    gameover2
};




var player;
var scoreText;

var platforms;

var gameOver = true;
var music;


var gameover2 = new Phaser.Scene("gameover");

gameover2.preload = function () {
    this.load.image('parede', 'assets/parede.png');
    this.load.image('ground', 'assets/plataforma.png');
    this.load.image('bloco', 'assets/bloco.png');
    this.load.image('blocolongo', 'assets/bloco2.png');
    this.load.image('morto', 'assets/ifiano/morto.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('boi', 'assets/boi.png');
    this.load.image('porta', 'assets/saida.png');
    this.load.image('reiniciar', 'assets/reiniciar.png');

    this.load.spritesheet('idle', 'assets/ifiano/idle.png', {
        frameWidth: 38,
        frameHeight: 62
    });
    this.load.spritesheet('dead', 'assets/ifiano/dead.png', {
        frameWidth: 75,
        frameHeight: 62
    });
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.audio('music', 'assets/music.mp3')
};

gameover2.create = function () {


    //  A simple background for our game
    this.add.image(400, 300, 'parede');
    this.add.image(1200, 300, 'parede');

    this.add.image(500, 510, 'porta');




    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });
    //texto GameOver
    this.GameOverText = this.add.text(100, 100, 'Tente Novamente', {
        fontSize: '64px',
        fill: '#000'

    });
    this.GameOverText = this.add.text(200, 200, 'fase2', {
        fontSize: '64px',
        fill: '#000'
    })
    this.GameOverText.visible = true

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();




    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 700, 'ground').setScale(2).refreshBody(); // chão
    platforms.create(1200, 700, 'ground').setScale(2).refreshBody(); //chão
    platforms.create(600, 440, 'bloco').setScale(2).refreshBody(); //nivel 1
    platforms.create(350, 310, 'blocolongo').setScale(2).refreshBody(); //nivel 2


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'morto');

    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    //criação da musica
    music = this.sound.add("music");
    music.play({
        loop: true
    });


    //fullscreen
    var button = this.add.image(800 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();




    var FKey = this.input.keyboard.addKey('F');

    FKey.on('down', function () {

        if (this.scale.isFullscreen) {
            button.setFrame(1);
            this.scale.stopFullscreen();
        } else {
            button.setFrame(0);
            this.scale.startFullscreen();
        }

        this.physics.add.collider(player, platforms);
    }, this);




    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);



    var trocacena = this.add.image(500 - 64, 400, 'reiniciar', 0).setOrigin(1, 0).setInteractive();
    trocacena.on('pointerup', function () {
        music.stop();
        player.anims.play('turn', false);
        gameOver = false;
        this.scene.start(fase2);

    }, this);



}