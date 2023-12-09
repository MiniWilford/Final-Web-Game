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
            y: 300
            }
        }
    },
    scene: [preloadGame, playGame, gameOver]
}
game = new Phaser.Game(config);