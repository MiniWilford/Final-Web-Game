class gameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
    }

    preload() {
        // load all assets tile sprites
        this.load.image("bg_1", "resources/assets/bg-1.png");
        this.load.image("bg_2", "resources/assets/bg-2.png");
        this.load.image("ground", "resources/assets/ground.png");
        // Load Pipes
        this.load.image('pipeb', 'resources/assets/pipeb.png');
        this.load.image('pipet', 'resources/assets/pipet.png');
        // Load Item
        this.load.image('item', 'resources/assets/star.png');
        // load spritesheet as player
        this.load.spritesheet("player", "resources/assets/bee.png",{
            frameWidth: 37,
            frameHeight: 39
        });

    }

    create() {

    }

    update() {

    }
}