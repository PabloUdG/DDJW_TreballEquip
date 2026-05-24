import MenuScene from '../scenes/menuScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    scene: [MenuScene]
};

new Phaser.Game(config);