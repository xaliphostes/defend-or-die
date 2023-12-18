class Game {
    stars: Stars = undefined
    asteroids: Asteroid[] = []
    ship: SpaceShip = undefined
    help: any = undefined

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
        button.position(width + 45, 40)
        button.mousePressed(() => {
            this.asteroids.forEach(a => a.sprite.removed = true)
            const n = this.asteroids.length
            this.asteroids = []
            for (let i = 0; i < n; i++) {
                const r = new Asteroid(random(width), random(height), this.speed)
                this.asteroids.push(r)
            }

            this.stars.setSpeed(this.speed - 1)

            this.theEnd = false
        })

        this.generateHelp()

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

        // this.help()
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
                this.stars.increaseSpeed()
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

    generateHelp() {
        // this.help = createP(`
        // <h4>Help</h4> <br/>
        // <span>→: right <br/>
        // <span>←: left <br/>
        // <span>↓: down <br/>
        // <span>↑: up <br/>
        // <span>Space: fire <br/>
        // <span>A: Go to hyper-space <br/>`)
        // this.help.position(30, height + 45)

        this.help = createP(`
    <table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>→</td>
            <td>Go right</td>
        </tr>
        <tr>
            <td>←</td>
            <td>Go left</td>
        </tr>
        <tr>
            <td>↓</td>
            <td>Go down</td>
        </tr>
        <tr>
            <td>↑</td>
            <td>Go up</td>
        </tr>
        <tr>
            <td>Space</td>
            <td>Fire</td>
        </tr>
        <tr>
            <td>A</td>
            <td>Go to hyper space</td>
        </tr>
    </tbody>
    </table>`)
    this.help.position(30, height + 45)
    }
}
