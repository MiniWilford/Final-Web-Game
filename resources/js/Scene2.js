let obstacleCount = 0;
let canvasWidth = 384;
let canvasHeight = 240;
let scoreText;
let collectedItems;

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
      this.ground.y = 20 * 16;
     
      // add the player
      this.player = this.physics.add.sprite(25, game.config.height / 1.75, "player");

      // add the collectable item sprite
      this.item = this.add.sprite(1100, 110, "item");
      this.item.setInteractive();

      // Add Obstacles and respective gaps
      let obstacles = this.physics.add.staticGroup();
      let xGap = 50;
      let canvasWidth = 384;
      let obstaclePos = canvasWidth+2*xGap
      let pos = getRandom();

      // bottom placable at 260+gap to height
      obstacles.create(obstaclePos, pos[0], 'pipeb').setScale(1).refreshBody();
      obstacles.create(obstaclePos, pos[1], 'pipet').setScale(1).refreshBody();


      // Add Player Collision with Obstacles / items
      this.physics.add.collider(this.player, obstacles, playerHit, null, game)
			this.physics.add.collider(this.player, this.item);


      // Collect Item
			this.physics.add.overlap(this.player, this.item, collectItem, null, this);

      // Add score text
			scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
      //scoreText.cameraOffset(true)

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
      this.ground.tilePositionX = this.myCam.scrollX;
      scoreText.tilePositionX = this.myCam.ScrollX;

      // Reset & Failure conditions when touching skybox / ground
      if(this.player.y > Number(game.canvas.height)+100) {
        console.log("y= ", this.player.y)
        this.player.y -= 100;
      }
      //set lower Bounds
      if(this.player.y < -200) {
          console.log("y= ", this.player.y)
          this.player.y += 200;
      }

      // Determine if user can move on to next scene
      if(collectedItems >= 1) {
        console.log("Collected Item")
        //this.scene.start("PlayGame");
      }
    }
  }

function getRandom() {
  let gap = 150;
  let safePadding = 25;
  let min = Math.ceil(safePadding+gap/2);
  let max = Math.floor(canvasHeight-safePadding-gap/2);
  let ran =  Math.floor(Math.random() * (max - min + 1)) + min;
  let rantop = ran-((gap/2)+260);
  let ranbot = ran+((gap/2)+260);
  console.log(ranbot,rantop)
  return [ranbot, rantop]
}

let hitflag = false;
function playerHit() {
    if(hitflag) return
    console.log("Player hit!!!!!!!!!")
    hitflag=true;
    setTimeout(playerDead, 200)
}

function playerDead() {
    console.log("Player dead!!!!!!!!!")
    let player = this.player
    //player.setCollideWorldBounds(false);
    let gameOver =  true;
}

let score = 0;
function collectItem (player, item) {
        // Remove item after collected
				this.item.disableBody(true, true);
        collectedItems =+ 1;

        // Change Score
				score += 10;
        scoreText.setText('Score: ' + score);
      }