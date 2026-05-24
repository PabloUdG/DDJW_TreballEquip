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
        this.derrota = false;
        this.victoria = false;
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

        // Revisor
        this.porta_oberta = true;
        this.porta_activada = true;
        this.porta_percentatge = 100; // 0-100
        this.revisor_estat = 'lluny'; // 'lluny', 'aprop', 'porta'

        this.crear_ui_porta();
        this.time.addEvent({
            delay: 15000,
            callback: () => this.revisor_update(),
            loop: true,
        });
    }

    update(time, delta) {
        if(this.velocitat >= this.velocitat_limit){
            this.derrota = true;
        }
        if (this.derrota) {
            window.alert("Derrota");
        }
        if(this.victoria){
            window.alert("Victoria");
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

    crear_ui_porta() {
        const px = 575, py = 675; // position of the panel

        // Panel background
        this.add.rectangle(px, py, 220, 80, 0x5992a6, 1).setOrigin(0, 0).setDepth(5);

        // Progress bar background
        this.add.rectangle(px + 10, py + 10, 120, 24, 0x333333).setOrigin(0, 0).setDepth(6);

        // Progress bar fill
        this.porta_bar = this.add.rectangle(px + 10, py + 10, 120, 24, 0x00cc66)
            .setOrigin(0, 0).setDepth(7);

        // Warning triangle (hidden by default)
        this.triangle_perill = this.add.text(px + 10, py + 42, '▲ !', {
            fontSize: '20px',
            color: '#ffff00',
        }).setDepth(7).setVisible(false);

        // Open/Close button
        this.porta_boto_text = this.add.text(px + 140, py + 20, 'Tancar', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#1a6644',
            padding: { x: 10, y: 8 }
        })
            .setDepth(7)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.toggle_porta())
            .on('pointerover', () => this.porta_boto_text.setStyle({ color: '#ffff00' }))
            .on('pointerout',  () => this.porta_boto_text.setStyle({ color: '#ffffff' }));

        // Deactivated overlay (hidden by default)
        this.porta_desactivada_text = this.add.text(px + 10, py + 44, 'PORTA DESACTIVADA', {
            fontSize: '13px',
            color: '#ff4444',
        }).setDepth(8).setVisible(false);
    }

    toggle_porta() {
        if (!this.porta_activada) return;

        this.porta_oberta = !this.porta_oberta;
        this.porta_boto_text.setText(this.porta_oberta ? 'Tancar' : 'Obrir');
        this.porta_boto_text.setStyle({
            backgroundColor: this.porta_oberta ? '#1a6644' : '#8b1a1a'
        });
        console.log('Porta ' + (this.porta_oberta ? 'oberta' : 'tancada'));
    }

    revisor_update() {
        if (!this.porta_activada) return;

        // Revisor a prop
        this.revisor_estat = 'aprop';
        this.triangle_perill.setVisible(true).setStyle({ color: '#ffff00' });

        // Revisor a la porta
        this.time.delayedCall(5000, () => {
            if (this.revisor_estat !== 'aprop') return;
            this.revisor_estat = 'porta';
            this.triangle_perill.setStyle({ color: '#ff4444' });
            console.log('Revisor a la porta!');
            this.iniciar_compte_enrere_porta();
        });
    }

    iniciar_compte_enrere_porta() {
        // Cada 5 segons resta 20% de la
        this.porta_timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.porta_oberta) {
                    this.revisor_marxar();
                    return;
                }

                this.porta_percentatge -= 20;
                this.actualitzar_barra_porta();

                if (this.porta_percentatge <= 0) {
                    this.porta_percentatge = 0;
                    this.desactivar_porta();
                }
            },
            loop: true,
        });
    }

    actualitzar_barra_porta() {
        const maxWidth = 120;
        this.porta_bar.width = maxWidth * (this.porta_percentatge / 100);

        // Color de la barra en funcio del percentatge de la porta
        if (this.porta_percentatge > 60) {
            this.porta_bar.setFillStyle(0x00cc66); // Verd
        } else if (this.porta_percentatge > 30) {
            this.porta_bar.setFillStyle(0xffaa00); // Taronja
        } else {
            this.porta_bar.setFillStyle(0xff3333); // Vermell
        }
    }

    revisor_marxar() {
        if (this.porta_timer) this.porta_timer.remove();
        this.revisor_estat = 'lluny';
        this.triangle_perill.setVisible(false);
    }

    desactivar_porta() {
        if (this.porta_timer) this.porta_timer.remove();
        this.porta_activada = false;
        this.revisor_estat = 'lluny';
        this.triangle_perill.setVisible(false);
        this.porta_boto_text.setVisible(false);
        this.porta_desactivada_text.setVisible(true);
        this.porta_bar.setFillStyle(0x555555);
        this.derrota = true;
    }
}

export default TrainScene;