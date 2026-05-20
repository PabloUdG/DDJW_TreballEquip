class TrainScene extends Phaser.Scene {
    constructor() {
        super('TrainScene');
    }

    preload() {
        this.load.image("Fons", "assets/ImatgeCabina.jpg");
    }
    
    create() {
        this.add.image(0, 0, "Fons")
        .setOrigin(0, 0)
        .setDisplaySize(this.scale.width, this.scale.height);
    }
}

export default TrainScene;