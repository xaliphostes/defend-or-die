
class BankOfSounds {
    laser: any = undefined
    swap: any = undefined
    explode: any = undefined
    final: any = undefined

    constructor() {
        this.laser = loadSound('sounds/laser.wav')
        this.swap = loadSound('sounds/swap.wav')
        this.explode = loadSound('sounds/explode.wav')
        this.final = loadSound('sounds/final.wav')
        this.laser.setVolume(0.5)
    }
}