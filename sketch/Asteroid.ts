type Rect = {
    x: number,
    y: number,
    width: number,
    height: number
}

class Asteroid {
    sprite: any = undefined
    hit = false
    w = 25
    h = 14
    speed = 3

    constructor(x: number, y: number, speed: number) {
        this.speed = speed
        const image = loadImage('images/mutant.png')
        this.sprite = createSprite(300, 150)
        this.sprite.addImage(image)
        this.sprite.x = x
        this.sprite.y = y
        this.sprite.collider = 'none'
    }

    getRect() {
        return {
            x: this.sprite.position.x - this.w/2,
            y: this.sprite.position.y - this.h,
            width: this.w,
            height: this.h
        }
    }

    display() {
        if (this.hit === false) {
            this.sprite.position.x += this.speed // move to the right!
            if (this.sprite.position.x > width) { // loop to the left!
                this.sprite.position.x = -this.sprite.width
            }
        }
    }

    collision(s: SpaceShip): boolean {
        const sr = s.getRect()
        const sa = this.getRect()
        if (intersectionRectRect(sr, sa)) {
            return true
        }
        return false
    }
}
