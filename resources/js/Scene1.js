class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){ 
       // load all assets tile sprites
       this.load.image("bg_1", "assets/bg-1.png");
       this.load.image("bg_2", "assets/bg-2.png");
       this.load.image("ground", "assets/ground.png");
       // load spritesheet
       this.load.spritesheet("player", "assets/bee.png",{
         frameWidth: 37,
         frameHeight: 39
       });

    }

    create() { 
      this.scene.start("FirestLevel");
    }
}