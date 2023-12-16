

class Game {
    asteroids: Asteroid[] = []
    ship: SpatialShip = undefined
    theEnd = false

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            const r = new Asteroid(random(width), random(height))
            this.asteroids.push(r)
        }

        this.ship = new SpatialShip(this)
    }

    draw() {
        background(0)

        if (!this.theEnd) {
            this.ship.keyPressed()
        }
        else {
            textSize(50)
            fill(255)
            text('The end!', width / 2 - 100, height / 2)
        }

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

        this.countAndDisplay()
        this.score()
    }

    private score() {
        textSize(20)
        fill(255)
        text(`Score: ${this.asteroids.reduce( (prev, cur) => prev + (cur.hit ? 1 : 0), 0)}/${this.asteroids.length}`, 10, 30)
    }

    private endOfGame() {
        this.theEnd = true

        this.asteroids.forEach(a => {
            a.speed = 0
        })

        bankOfSounds.explode.play()
        setTimeout(() => {
            bankOfSounds.explode.stop()
        }, 2000)
    }

    private countAndDisplay() {
        const n = this.asteroids.reduce( (prev, cur) => prev+(cur.hit?1:0), 0)
        if (n === this.asteroids.length) {
            textSize(50)
            fill(255)
            text('You win!', width/2, height/2)
            bankOfSounds.final.play()
        }
    }
}
