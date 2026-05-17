const game = new Phaser.Game({
    type: Phaser.CANVAS,
    scale: {
        parent: 'game-container',
        width: 1440,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false,
        },
    },
});

game.scene.add('GameScene', GameScene);
game.scene.start('GameScene');