
class SpaceShip {
    color = color(255, 255, 255)
    speed = 5
    sprite: any = undefined
    w = 70
    h = 19

    constructor(private game: Game) {
        const image = loadImage('images/spaceship.png')
        this.sprite = createSprite(300, 150)
        this.sprite.addImage(image)
        this.sprite.x = width / 1.2
        this.sprite.y = height / 2
        this.sprite.collider = 'none'
    }

    get width() {
        return this.sprite.width
    }

    get height() {
        return this.sprite.height
    }

    get x() {
        return this.sprite.position.x
    }

    get y() {
        return this.sprite.position.y
    }

    getRect() {
        return {
            x: this.sprite.position.x - this.w/2,
            y: this.sprite.position.y - this.h,
            width: this.w,
            height: this.h
        }
    }

    translate(x: number, y: number) {
        this.sprite.position.x += x
        this.sprite.position.y += y

        // Check que l'on ne depasse pas en x...
        if (this.sprite.position.x > width) {
            this.sprite.position.x = width
        }
        if (this.sprite.position.x < 0) {
            this.sprite.position.x = 0
        }
        // Check que l'on ne depasse pas en y...
        if (this.sprite.position.y > height) {
            this.sprite.position.y = height
        }
        if (this.sprite.position.y < 0) {
            this.sprite.position.y = 0
        }
    }

    keyPressed() {
        if (keyIsPressed) {
            if (keyCode === DOWN_ARROW) {
                this.translate(0, this.speed)
            }

            if (keyCode === UP_ARROW) {
                this.translate(0, -this.speed)
            }

            if (keyCode === LEFT_ARROW) {
                this.translate(-this.speed, 0)
            }

            if (keyCode === RIGHT_ARROW) {
                this.translate(this.speed, 0)
            }

            if (keyCode === 32) {
                bankOfSounds.laser.play()
                stroke(255)
                line(this.sprite.x, this.sprite.y + 5, 0, this.sprite.y + 5)
                this.hit(this.sprite.x, this.sprite.y)
            }

            if (keyCode === 65) {
                this.sprite.x = random(0, width)
                this.sprite.y = random(0, height)
                bankOfSounds.swap.play()
            }
        }
    }

    hit(start: number, elevation: number) {
        this.game.asteroids.forEach(a => {
            if (a.hit === false) {
                const r = a.getRect()
                if (intersectLineRect(r, start, elevation)) {
                    a.hit = true
                    a.sprite.removed = true
                }
            }
        })
    }

}
