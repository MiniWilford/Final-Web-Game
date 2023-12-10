class gameWon extends Phaser.Scene {
    constructor() {
        super("GameWon");
    }

    preload() {
        // load all assets tile sprites
        this.load.image("bg_1", "resources/assets/bg-1.png");
        this.load.image("bg_2", "resources/assets/bg-2.png");
        // Load Pipes
        this.load.image('pipeb', 'resources/assets/pipeb.png');
        this.load.image('pipet', 'resources/assets/pipet.png');
        // Load Item
        this.load.image('item', 'resources/assets/football.png');
        // load spritesheet as player
        this.load.spritesheet("player", "resources/assets/bee.png",{
            frameWidth: 37,
            frameHeight: 39
        });

    }

    create() {

        // Add main background
        this.add.rectangle(0, 0, 384, 240, 0x000000).setOrigin(0, 0);

        // Add text for player
        this.add.text(0, 20, "You win! \n\npress left or right arrow key\n to continue...").setOrigin(0,0);
        this.add.text(0, 150, "{name} scored: " + score);

        // enables keys to be read from keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        // Read User input to initiate restart
        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            //restart to scene1
            this.scene.start("PreloadGame");
            collectedItems = 0;
            scoreText.setText('Score: ' + score);
            hit_times = 0;
        } 

    }
}