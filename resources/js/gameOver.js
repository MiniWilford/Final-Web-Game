class gameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // load all assets tile sprites
        this.load.image("bg_1", "resources/assets/bg-1.png");
        this.load.image("bg_2", "resources/assets/bg-2.png");
        // Load Pipes
        this.load.image('goalb', 'resources/assets/goal_bottom.png');
        this.load.image('goalt', 'resources/assets/goal_top.png');
        // Load Item
        this.load.image('item', 'resources/assets/football.png');
        // load spritesheet as player
        this.load.spritesheet("player", "resources/assets/helmet.png",{
            frameWidth: 37,
            frameHeight: 39
        });

    }

    create() {

        // Add main background
        this.add.rectangle(0, 0, 384, 240, 0x000000).setOrigin(0, 0);

        // Add text for player
        this.add.text(0, 20, "Game Over!!, \n\nPress left or right arrow key\n to restart...").setOrigin(0,0);
        this.add.text(0, 150, "{name} scored: " + score);

        // enables keys to be read from keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        // Read User input to initiate restart
        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            //restart to scene1
            collectedItems = 0;
            player_gameOver = false;
            hit_times = 0;
            this.scene.start("PlayGame");
            score = 0;
        } 

    }
}