
const config = {
    type: Phaser.CANVAS,
    width: 384,
    height: 240,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
}

const game = new Phaser.Game(config);