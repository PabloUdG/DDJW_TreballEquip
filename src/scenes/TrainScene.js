class TrainScene extends Phaser.Scene {
    constructor() {
        super('TrainScene');
    }

    preload() {
        this.load.image("Fons", "assets/ImatgeCabina.jpg");
    }
    
    create() {
        // Constants
        this.velocitat_limit = 150
        this.round_max = 5

        // Elements del joc
        this.background = this.add.image(0, 0, "Fons").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
        this.buttons = [];
        this.buttonData = [
            {x: 225, y: 450, color: 0x61683e},
            {x: 278, y: 450, color: 0x457e78},
            {x: 332, y: 450, color: 0xa55135},
            {x: 385, y: 450, color: 0x457e78},
        ]
        this.buttonData.forEach((data, index)=> {
            const button = this.add.rectangle(data.x, data.y, 40, 40).setOrigin(0, 0).setInteractive({useHandCursor: true}).setFillStyle(data.color, 1).setAlpha(0.001);
            button.on('pointerdown', () => this.button_pressed(index))
            const bloom = 1
            this.buttons.push(button);
        })
        // Variables del jugador
        this.correct_count = 0;
        this.guess_array = [];
        
        // Estat del joc
        this.derrota = false
        this.round_number = 2; // Nombre de llums de la ronda de simon
        this.current_round = 1;
        this.patro_mostrat = false;
        this.round_array = Array.from({length: 4}, () => this.rng(0, 3));
        this.velocitat = 90;
        var speed_timer = this.time.addEvent({
            delay: 10000,
            callback: () => {this.velocitat += 5; console.log(this.velocitat)},
            callbackScope: this,
            loop: true,
        });
        this.animating = false;
    }

    update(time, delta){
        if(this.animating) return;
        if(!this.patro_mostrat){
            this.time.delayedCall(400, () => {
                this.mostrar_patro();
                this.patro_mostrat = true;
            });
        }if(this.current_round <= this.guess_array.length){
            this.guess_array = [];
            this.patro_mostrat = false;
            if(this.check_guess()){
                this.current_round++;
            }
        }if(this.current_round >= this.round_number){
            for (let index = 0; index < this.buttons.length; index++) {
                this.iluminar_boto(index);
                
            }
            if(this.round_number < 5){
                this.round_number++;
            }
            this.current_round = 1;
            this.round_array = Array.from({length: 4}, () => this.rng(0, 3));
        }
    }

    button_pressed(index){
        if(!this.patro_mostrat || this.animating) return;
        this.iluminar_boto(index);
        this.guess_array.push(index);
        console.log(this.guess_array);
    }

    rng(min, max){
        return Math.floor(Math.random() * (max - min + 1))
    }

    iluminar_boto(index){
        this.animating = true;
        this.buttons[index].setAlpha(0.7);
        this.time.delayedCall(200, () => {this.buttons[index].setAlpha(0.001); this.animating = false;});
    }

    mostrar_patro(){
        for (let index = 0; index < this.current_round; index++) {
            console.log("amogus");
            this.time.delayedCall(500*index, () => {this.iluminar_boto(this.round_array[index]);});
        }
    }

    check_guess(){ // retorna si l'ultim element de guess_array es igual al element de mateix index de round_array
        if(this.guess_array[this.guess_array.length-1] == this.round_array[this.guess_array.length-1]) return true;
        else return false;
    }
}

export default TrainScene;