let game;
let config = {
    type: Phaser.CANVAS,
    width: 384,
    height: 240,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
            y: 10
            }
        }
    },
    scene: [preloadGame, playGame]
}
game = new Phaser.Game(config);