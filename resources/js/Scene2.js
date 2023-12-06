class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
    
    create() { 
      // makes sprite with the size of our game screen (tiled)
      this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
      // pivot to the top left corner
      this.bg_1.setOrigin(0, 0);
      // fixed it so it won't move when the camera moves.
      // Moves texture on update
      this.bg_1.setScrollFactor(0);

      // Add a second background layer. Repeat as in bg_1
      this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
      this.bg_2.setOrigin(0, 0);
      this.bg_2.setScrollFactor(0);

      // add the ground (48 pixels tall)
      this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
      this.ground.setOrigin(0, 0);
      this.ground.setScrollFactor(0);
      // tile is shorter, positioned it at the bottom of he screen
      this.ground.y = 12 * 16;

      // add the player
      this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "player");
      // create an animation for the player known as "fly"
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1
      });
      this.player.play("fly");

      // enables keys to be read from keyboard
      this.cursors = this.input.keyboard.createCursorKeys();

      // set the world bound to enable camera to follow the player
      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

      // Makes camera follow the player
      this.myCam.startFollow(this.player);

    }

    update() {
      // move player on arrow key(s) pressed
      if (this.cursors.left.isDown && this.player.x > 0) {
        this.player.x -= 3;
        this.player.scaleX = 1;
      } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
        this.player.x += 3;
        this.player.scaleX = -1;
      }

      // scrolls the background along with the camera being scroll
      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      this.ground.tilePositionX = this.myCam.scrollX;
    }
}