let game: Game = undefined
let bankOfSounds: BankOfSounds = undefined

function preload() {
    bankOfSounds = new BankOfSounds()
}

function setup() {
    createCanvas(1000, 300)
    game = new Game(10)
}

function draw() {
    game.draw()
}
