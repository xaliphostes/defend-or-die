class Star {
    speed = 2
    constructor(public x: number, private y: number, private c: p5.Color) {
    }

    draw() {
        this.x += this.speed
        if (this.x > width) this.x = 0
        stroke(this.c)
        strokeWeight(2)
        point(this.x, this.y)
    }
}


class Stars {
    points: Star[] = []

    constructor() {
        for (let i = 0; i < 1000; i++) {
            this.points.push(new Star(random(width), random(height), color(random(0, 255), random(0, 255), random(0, 255))))
        }
    }

    draw() {
        this.points.forEach(p => p.draw())
    }

    setSpeed(v: number) {
        this.points.forEach(p => p.speed = v)
    }
}