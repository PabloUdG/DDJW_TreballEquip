class TrainScene extends Phaser.Scene {
    constructor() {
        super('TrainScene');
    }

    preload() {
        this.load.image("Fons", "assets/ImatgeCabina.jpg");
    }
    
    create() {
        // Constants
        this.velocitat_limit = 150;
        this.round_max = 5;

        // UI
        this.speed_text = this.add.text(20, 20, 'Velocitat: 90', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {x: 10, y: 6}
        }).setDepth(10);

        // Elements del joc
        this.background = this.add.image(0, 0, "Fons").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
        this.buttons = [];
        this.buttonData = [
            {x: 225, y: 450, color: 0x61683e},
            {x: 278, y: 450, color: 0x457e78},
            {x: 332, y: 450, color: 0xa55135},
            {x: 385, y: 450, color: 0x457e78},
        ];
        this.buttonData.forEach((data, index) => {
            const button = this.add.rectangle(data.x, data.y, 40, 40)
                .setOrigin(0, 0)
                .setInteractive({ useHandCursor: true })
                .setFillStyle(data.color, 1)
                .setAlpha(0.001);
            button.on('pointerdown', () => this.button_pressed(index));
            this.buttons.push(button);
        });

        // Variables del jugador
        this.guess_array = [];
        
        // Estat del joc
        this.acceptar_input = false;
        this.round_number = 2;
        this.current_round = 1;
        this.round_array = Array.from({length: 5}, () => this.rng(0, 3));
        this.velocitat = 90;

        this.time.addEvent({
            delay: 10000,
            callback: () => { this.velocitat += 5; this.speed_text.setText('Velocitat: ' + this.velocitat); },
            loop: true,
        });

        this.time.delayedCall(400, () => this.mostrar_patro());
    }

    update(time, delta) {
        if (this.velocitat >= this.velocitat_limit) {
            // handle defeat
        }
    }

    button_pressed(index) {
        if (!this.acceptar_input) return;

        this.iluminar_boto(index);
        this.guess_array.push(index);

        if (!this.check_guess()) {
            this.velocitat += 3;
            this.speed_text.setText('Velocitat: ' + this.velocitat);
            this.guess_array = [];
            this.time.delayedCall(600, () => this.mostrar_patro());
            return;
        }

        

        if (this.guess_array.length >= this.current_round) {
            this.acceptar_input = false;
            this.guess_array = [];
            this.current_round++;
            for (let i = 0; i < this.buttons.length; i++) {
                this.iluminar_boto(i);
            }
            if (this.current_round > this.round_number) {
                this.velocitat -= 2 * this.current_round;
                this.speed_text.setText('Velocitat: ' + this.velocitat);
                this.seguent_ronda();
            } else {
                this.time.delayedCall(600, () => this.mostrar_patro());
            }
        }
    }

    seguent_ronda() {
        if (this.round_number < this.round_max) {
            this.round_number++;
        }
        this.current_round = 1;
        this.round_array = Array.from({length: 5}, () => this.rng(0, 3));
        this.time.delayedCall(600, () => this.mostrar_patro());
    }

    rng(min, max) {
        return Math.floor(Math.random() * (max - min + 1));
    }

    iluminar_boto(index) {
        this.buttons[index].setAlpha(0.7);
        this.time.delayedCall(200, () => {
            this.buttons[index].setAlpha(0.001);
        });
    }

    mostrar_patro() {
        this.acceptar_input = false;
        for (let i = 0; i < this.current_round; i++) {
            this.time.delayedCall(500 * i, () => {
                this.iluminar_boto(this.round_array[i]);
            });
        }
        // Retrasar el retorn del control per evitar problemes amb la iluminacio del boto
        const totalDuration = 200 * this.current_round;
        this.time.delayedCall(totalDuration + 300, () => {
            this.acceptar_input = true;
        });
    }

    check_guess() {
        const i = this.guess_array.length - 1;
        return this.guess_array[i] === this.round_array[i];
    }
}

export default TrainScene;