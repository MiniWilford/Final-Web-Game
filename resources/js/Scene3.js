class playGameLevelTwo extends Phaser.Scene {
    constructor() {
      super("PlayGameLevelTwo");
    }

    create() {
        // Create background (main)
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
        // pivot to the top left corner
        this.bg_1.setOrigin(0, 0);
        // Texture moves each updated frame
        this.bg_1.setScrollFactor(0);

        // Create Secondary Background
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        
        // add the player
        this.player = this.physics.add.sprite(25, game.config.height / 1.75, "player");

        // add the collectable item sprite
        this.itemOne = this.physics.add.sprite(1100, 110, "item");
        this.itemOne.setInteractive();
        this.itemOne.body.allowGravity = false; // enable to float by itself

        this.itemTwo = this.physics.add.sprite(1100, 30, "item");
        this.itemTwo.setInteractive();
        this.itemTwo.body.allowGravity = false; // enable to float by itself

        this.itemThree = this.physics.add.sprite(1100, 210, "item");
        this.itemThree.setInteractive();
        this.itemThree.body.allowGravity = false; // enable to float by itself


        // Add Obstacles and respective gaps
        let obstacles = this.physics.add.staticGroup();
        let obstaclePos = 500; // Place Obstacle

        // Generate random gaps
        let obstacleRandomGapOne = getRandomGap();
        let obstacleRandomGapTwo = getRandomGap(); 
        let obstacleRandomGapThree = getRandomGap();
        let obstacleRandomGapFour = getRandomGap();

        // Place obstacles with random gap
        obstacles.create(obstaclePos, obstacleRandomGapOne[0], 'goalb').setScale(1).refreshBody();
        obstacles.create(obstaclePos, obstacleRandomGapOne[1], 'goalt').setScale(1).refreshBody();

        // Add another random obstacle location for player to avoid
        obstaclePos = 200;
        obstacles.create(obstaclePos, obstacleRandomGapTwo[0], 'goalb').setScale(1).refreshBody();
        obstacles.create(obstaclePos, obstacleRandomGapTwo[1], 'goalt').setScale(1).refreshBody();

        // Add one more obstacle
        obstaclePos = 100;
        obstacles.create(obstaclePos, obstacleRandomGapThree[0], 'goalb').setScale(1).refreshBody();
        obstacles.create(obstaclePos, obstacleRandomGapThree[1], 'goalt').setScale(1).refreshBody();

        // More obstacle
        obstaclePos = 700;
        obstacles.create(obstaclePos, obstacleRandomGapFour[0], 'goalb').setScale(1).refreshBody();
        obstacles.create(obstaclePos, obstacleRandomGapFour[1], 'goalt').setScale(1).refreshBody();

        // Add Player Collision with Obstacles
        this.physics.add.collider(this.player, obstacles, playerHit);

        // Collect Item(s)
        this.physics.add.overlap(this.player, this.itemOne, collectItem, null, this);
        this.physics.add.collider(this.player, this.itemOne, collectItem, null, this);
        this.physics.add.overlap(this.player, this.itemTwo, collectItem, null, this);
        this.physics.add.collider(this.player, this.itemTwo, collectItem, null, this);
        this.physics.add.overlap(this.player, this.itemThree, collectItem, null, this);
        this.physics.add.collider(this.player, this.itemThree, collectItem, null, this);

        // Add score text
        scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setFont("32px Castellar")
        scoreText.setScrollFactor(0); // Scroll with screen

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
        if(this.cursors.up.isDown) {
          this.player.setVelocityY(-200);
        }
      } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
        this.player.x += 3;
        this.player.scaleX = -1;
        if(this.cursors.up.isDown) {
          this.player.setVelocityY(-200);
        }
      }
        // Check is up is pressed by itself (more fluid combined)
        if(this.cursors.up.isDown) {
          this.player.setVelocityY(-200);
      }

      // scrolls the background along with the camera being scroll
      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      scoreText.tilePositionX = this.myCam.ScrollX;

      // Reset & Failure conditions when touching skybox / ground
      if(this.player.y > Number(game.canvas.height)+100) { // Restart position to scene start (x,y)
        this.player.x = 25; // Back to start
        this.player.y = game.config.height / 1.75; // Middle of screen
        score -= 10;
        scoreText.setText('Score: ' + score);

      }
      //set Upper Bounds
      if(this.player.y < 0) {
        this.player.y = 20;
          
      }

      // Determine if user can move on to next scene
      if(collectedItems > 3) {
        console.log("Collected Item")
        // Play Cheer 
        // this.sound.play("cheer");
        //this.scene.start("GameWon");
        this.scene.start("GameWon");
      }

      // Determine GameOver condition
      if(player_gameOver == true || score <= -20) {
        this.scene.start("GameOver");
      }
    }
}



// Required Functions for game functionality
function getRandomGap() {
    let gap = 150;
    let padding = 25;
    let min = Math.ceil(padding+gap/2);
    let max = Math.floor(canvasHeight-padding-gap/2);
    let random =  Math.floor(Math.random() * (max - min + 1)) + min;
    let random_top = random-((gap/2)+260);
    let random_bottom = random+((gap/2)+260);
    return [random_bottom, random_top]
}
  
  
function playerHit() {
    if(hit) return
    console.log("Player hit!!!!!!!!!");
    hit=true;
    hit_times += 1;
    score -= 100;
    scoreText.setText('Score: ' + score);
    player_gameOver = true;
}
  
function collectItem (player, item) {
    // Remove item after collected
    item.disableBody(true, true);
    collectedItems += 1;
  
    // Change Score
    score += 10;
    scoreText.setText('Score: ' + score);
}