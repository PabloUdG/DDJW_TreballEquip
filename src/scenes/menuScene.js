export default class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // ✔ ruta CORRECTA (important)
        this.load.image('fons', '../scenes/Menu.png');
    }

    create() {

        const bg = this.add.image(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			'fons'
		);

		const scaleX = this.cameras.main.width / bg.width;
		const scaleY = this.cameras.main.height / bg.height;
		const scale = Math.max(scaleX, scaleY);

		bg.setScale(scale).setScrollFactor(0);

        // 📝 TÍTOL
        this.add.text(
            this.cameras.main.width / 2,
            120,
            'Evita el colapse!',
            {
                fontSize: '48px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // 🎮 BOTONS
        const jugar = this.crearBoto(250, 'Jugar');
        const opcions = this.crearBoto(340, 'Opcions');
        const sortir = this.crearBoto(430, 'Sortir');

        jugar.on('pointerdown', () => console.log('Jugar'));
        opcions.on('pointerdown', () => console.log('Opcions'));
        sortir.on('pointerdown', () => console.log('Sortir'));
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