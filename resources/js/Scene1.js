class preloadGame extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  
    preload(){ 
       // load all backgrounds
       this.load.image("bg_1", "resources/assets/bg-1.png");
       this.load.image("bg_2", "resources/assets/bg-2.png");
       // Load goals
       this.load.image('goalb', 'resources/assets/goal_bottom.png');
       this.load.image('goalt', 'resources/assets/goal_top.png');
       // Load Item
       this.load.image('item', 'resources/assets/football.png');
       // load player
       this.load.spritesheet("player", "resources/assets/helmet.png",{
         frameWidth: 37,
         frameHeight: 39
       });
       
       // Load Audio
       this.load.audio('cheer', 'resources/assets/sounds/stadium_cheer.wav');

    }

    create() { 
      // Start game
      this.scene.start("PlayGame");
    }
}