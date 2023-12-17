class Game {
    stars: Stars = undefined
    asteroids: Asteroid[] = []
    ship: SpaceShip = undefined

    theEnd = false
    speed = 3

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            const r = new Asteroid(random(width), random(height), this.speed)
            this.asteroids.push(r)
        }

        this.stars = new Stars()
        this.ship = new SpaceShip(this)

        let button = createButton('Start over')
        button.position(width + 100, 120)
        button.mousePressed(() => {
            this.asteroids.forEach(a => a.sprite.removed = true)
            const n = this.asteroids.length
            this.asteroids = []
            for (let i = 0; i < n; i++) {
                const r = new Asteroid(random(width), random(height), this.speed)
                this.asteroids.push(r)
            }
            this.theEnd = false
        })
    }

    // This routine is called many times each second
    //
    draw() {
        background(0)

        if (!this.theEnd) {
            this.ship.keyPressed()
        }
        else {
            textSize(50)
            fill(255)
            // text('The end!', width / 2 - 100, height / 2)
        }

        this.stars.draw()

        this.asteroids.forEach(asteroid => {
            asteroid.display()
            let collide = false
            if (!this.theEnd) {
                if (asteroid.collision(this.ship)) {
                    collide = true
                }
            }
            if (collide) {
                this.endOfGame()
            }
        })

        this.countAndDisplay() // Check if we won
        this.score()
    }

    private score() {
        textSize(20)
        fill(255)
        text(`Score: ${this.asteroids.reduce((prev, cur) => prev + (cur.hit ? 1 : 0), 0)}/${this.asteroids.length}`, 10, 30)
    }

    private endOfGame() {
        bankOfSounds.explode.play()
        setTimeout(() => {
            bankOfSounds.explode.stop()
        }, 2000)

        alert("End of game")

        this.endAll()
    }

    private countAndDisplay() {
        const n = this.asteroids.reduce((prev, cur) => prev + (cur.hit ? 1 : 0), 0)
        if (n === this.asteroids.length) {
            textSize(50)
            fill(255)
            text('You win!', width / 2, height / 2)

            if (this.theEnd === false) {
                bankOfSounds.final.play()
                this.endAll()
                this.speed += 1
            }
        }
    }

    endAll() {
        this.theEnd = true

        this.asteroids.forEach(a => {
            a.speed = 0
        })

        this.stars.setSpeed(0)
    }
}
