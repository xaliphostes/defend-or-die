var Asteroid = (function () {
    function Asteroid(x, y) {
        this.sprite = undefined;
        this.hit = false;
        this.w = 25;
        this.h = 14;
        this.speed = 3;
        var image = loadImage('images/mutant.png');
        this.sprite = createSprite(300, 150);
        this.sprite.addImage(image);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.collider = 'none';
    }
    Asteroid.prototype.getRect = function () {
        return {
            x: this.sprite.position.x - this.w / 2,
            y: this.sprite.position.y - this.h,
            width: this.w,
            height: this.h
        };
    };
    Asteroid.prototype.display = function () {
        if (this.hit === false) {
            this.sprite.position.x += this.speed;
            if (this.sprite.position.x > width) {
                this.sprite.position.x = -this.sprite.width;
            }
        }
    };
    Asteroid.prototype.collision = function (s) {
        var sr = s.getRect();
        var sa = this.getRect();
        if (intersectionRectRect(sr, sa)) {
            return true;
        }
        return false;
    };
    return Asteroid;
}());
var BankOfSounds = (function () {
    function BankOfSounds() {
        this.laser = undefined;
        this.swap = undefined;
        this.explode = undefined;
        this.final = undefined;
        this.laser = loadSound('sounds/laser.wav');
        this.swap = loadSound('sounds/swap.wav');
        this.explode = loadSound('sounds/explode.wav');
        this.final = loadSound('sounds/final.wav');
        this.laser.setVolume(0.5);
    }
    return BankOfSounds;
}());
var Pt = (function () {
    function Pt(x, y, c) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.speed = 2;
    }
    Pt.prototype.draw = function () {
        this.x += this.speed;
        if (this.x > width)
            this.x = 0;
        stroke(this.c);
        strokeWeight(2);
        point(this.x, this.y);
    };
    return Pt;
}());
var Game = (function () {
    function Game(n) {
        var _this = this;
        this.points = [];
        this.asteroids = [];
        this.ship = undefined;
        this.theEnd = false;
        for (var i = 0; i < n; i++) {
            var r = new Asteroid(random(width), random(height));
            this.asteroids.push(r);
        }
        for (var i = 0; i < 1000; i++) {
            this.points.push(new Pt(random(width), random(height), color(random(0, 255), random(0, 255), random(0, 255))));
        }
        this.ship = new SpaceShip(this);
        var button = createButton('Start over');
        button.position(width + 100, 120);
        button.mousePressed(function () {
            _this.asteroids.forEach(function (a) { return a.sprite.removed = true; });
            var n = _this.asteroids.length;
            _this.asteroids = [];
            for (var i = 0; i < n; i++) {
                var r = new Asteroid(random(width), random(height));
                _this.asteroids.push(r);
            }
            _this.theEnd = false;
        });
    }
    Game.prototype.draw = function () {
        var _this = this;
        background(0);
        if (!this.theEnd) {
            this.ship.keyPressed();
        }
        else {
            textSize(50);
            fill(255);
        }
        this.points.forEach(function (p) { return p.draw(); });
        this.asteroids.forEach(function (asteroid) {
            asteroid.display();
            var collide = false;
            if (!_this.theEnd) {
                if (asteroid.collision(_this.ship)) {
                    collide = true;
                }
            }
            if (collide) {
                _this.endOfGame();
            }
        });
        this.countAndDisplay();
        this.score();
    };
    Game.prototype.score = function () {
        textSize(20);
        fill(255);
        text("Score: ".concat(this.asteroids.reduce(function (prev, cur) { return prev + (cur.hit ? 1 : 0); }, 0), "/").concat(this.asteroids.length), 10, 30);
    };
    Game.prototype.endOfGame = function () {
        bankOfSounds.explode.play();
        setTimeout(function () {
            bankOfSounds.explode.stop();
        }, 2000);
        alert("End of game");
        this.endAll();
    };
    Game.prototype.countAndDisplay = function () {
        var n = this.asteroids.reduce(function (prev, cur) { return prev + (cur.hit ? 1 : 0); }, 0);
        if (n === this.asteroids.length) {
            textSize(50);
            fill(255);
            text('You win!', width / 2, height / 2);
            bankOfSounds.final.play();
            this.endAll();
        }
    };
    Game.prototype.endAll = function () {
        this.theEnd = true;
        this.asteroids.forEach(function (a) {
            a.speed = 0;
        });
        this.points.forEach(function (a) {
            a.speed = 0;
        });
    };
    return Game;
}());
var SpaceShip = (function () {
    function SpaceShip(game) {
        this.game = game;
        this.color = color(255, 255, 255);
        this.speed = 5;
        this.sprite = undefined;
        this.w = 70;
        this.h = 19;
        var image = loadImage('images/spaceship.png');
        this.sprite = createSprite(300, 150);
        this.sprite.addImage(image);
        this.sprite.x = width / 1.2;
        this.sprite.y = height / 2;
        this.sprite.collider = 'none';
    }
    Object.defineProperty(SpaceShip.prototype, "width", {
        get: function () {
            return this.sprite.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceShip.prototype, "height", {
        get: function () {
            return this.sprite.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceShip.prototype, "x", {
        get: function () {
            return this.sprite.position.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceShip.prototype, "y", {
        get: function () {
            return this.sprite.position.y;
        },
        enumerable: false,
        configurable: true
    });
    SpaceShip.prototype.getRect = function () {
        return {
            x: this.sprite.position.x - this.w / 2,
            y: this.sprite.position.y - this.h,
            width: this.w,
            height: this.h
        };
    };
    SpaceShip.prototype.translate = function (x, y) {
        this.sprite.position.x += x;
        this.sprite.position.y += y;
        if (this.sprite.position.x > width)
            this.sprite.position.x = width;
        if (this.sprite.position.x < 0)
            this.sprite.position.x = 0;
        if (this.sprite.position.y > height)
            this.sprite.position.y = height;
        if (this.sprite.position.y < 0)
            this.sprite.position.y = 0;
    };
    SpaceShip.prototype.keyPressed = function () {
        if (keyIsPressed) {
            if (keyCode === DOWN_ARROW) {
                this.translate(0, this.speed);
            }
            if (keyCode === UP_ARROW) {
                this.translate(0, -this.speed);
            }
            if (keyCode === LEFT_ARROW) {
                this.translate(-this.speed, 0);
            }
            if (keyCode === RIGHT_ARROW) {
                this.translate(this.speed, 0);
            }
            if (keyCode === 32) {
                bankOfSounds.laser.play();
                stroke(255);
                line(this.sprite.x, this.sprite.y + 5, 0, this.sprite.y + 5);
                this.hit(this.sprite.x, this.sprite.y);
            }
            if (keyCode === 65) {
                this.sprite.x = random(0, width);
                this.sprite.y = random(0, height);
                bankOfSounds.swap.play();
            }
        }
    };
    SpaceShip.prototype.hit = function (start, elevation) {
        this.game.asteroids.forEach(function (a) {
            var r = a.getRect();
            if (intersectLineRect(r, start, elevation)) {
                a.hit = true;
                a.sprite.removed = true;
            }
        });
    };
    return SpaceShip;
}());
var game = undefined;
var bankOfSounds = undefined;
function preload() {
    bankOfSounds = new BankOfSounds();
}
function setup() {
    createCanvas(1000, 300);
    game = new Game(10);
}
function draw() {
    game.draw();
}
function intersectionRectRect(rect1, rect2) {
    var x1 = rect2.x, y1 = rect2.y, x2 = x1 + rect2.width, y2 = y1 + rect2.height;
    if (rect1.x > x1) {
        x1 = rect1.x;
    }
    if (rect1.y > y1) {
        y1 = rect1.y;
    }
    if (rect1.x + rect1.width < x2) {
        x2 = rect1.x + rect1.width;
    }
    if (rect1.y + rect1.height < y2) {
        y2 = rect1.y + rect1.height;
    }
    return (x2 <= x1 || y2 <= y1) ? false : true;
}
function intersectLineRect(r, start, elevation) {
    return (elevation >= r.y && elevation <= r.y + r.height);
}
//# sourceMappingURL=build.js.map