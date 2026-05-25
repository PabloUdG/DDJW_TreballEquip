export default class EscenaPausa extends Phaser.Scene {

    constructor() {
        super({ key: 'EscenaPausa' });
    }

    create() {
        const continuar = this.crearBoto(250, 'Continuar');
        continuar.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('TrainScene');
        });
        const menu = this.crearBoto(340, 'Tornar al menu');
        menu.on('pointerdown', () => {
            this.scene.stop('TrainScene');
            this.scene.start('MenuScene');
        });
    }
    crearBoto(y, text) {
        const boto = this.add.text(
            this.cameras.main.width / 2,
            y,
            text,
            {
                fontSize: '32px',
                backgroundColor: '#444',
                padding: { x: 20, y: 10 },
                color: '#ffffff'
            }
        )
        .setOrigin(0.5)
        .setInteractive();
        boto.on('pointerover', () => {
            boto.setStyle({ backgroundColor: '#666' });
        });
        boto.on('pointerout', () => {
            boto.setStyle({ backgroundColor: '#444' });
        });
        return boto;
    }
}