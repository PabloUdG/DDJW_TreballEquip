import TrainScene from './scenes/TrainScene.js'

let config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game-container',
        width: 1440,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    scene: [TrainScene]
};
const game = new Phaser.Game(config);