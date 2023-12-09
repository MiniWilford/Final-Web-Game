class preloadGame extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  
    preload(){ 
       // load all backgrounds
       this.load.image("bg_1", "resources/assets/bg-1.png");
       this.load.image("bg_2", "resources/assets/bg-2.png");
       // Load goals
       this.load.image('pipeb', 'resources/assets/pipeb.png');
       this.load.image('pipet', 'resources/assets/pipet.png');
       // Load Item
       this.load.image('item', 'resources/assets/star.png');
       // load player
       this.load.spritesheet("player", "resources/assets/bee.png",{
         frameWidth: 37,
         frameHeight: 39
       });

    }

    create() { 
      // Start game
      this.scene.start("PlayGame");
    }
}