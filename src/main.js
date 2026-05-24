import MenuScene from './scenes/menuScene.js'
import OptionsScene from './scenes/OptionsScene.js'
import TrainScene from './scenes/TrainScene.js'
import EscenaPausa from './scenes/EscenaPausa.js'

let config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game-container',
        width: 1440,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    scene: [MenuScene, TrainScene, OptionsScene, EscenaPausa]
};
const game = new Phaser.Game(config);