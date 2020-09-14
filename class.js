const blokLengte = 160;
const blokHoogte = 40;
const ballRadius = 40;

//blokjes
class Blok {
    constructor(x, y, health) {
        this.x = x;
        this.y = y
        this.hp = health;
    }

    display() {
        if (this.hp === 3) { fill(255, 0, 0); }
        if (this.hp === 2) { fill(255, 128, 0); }
        if (this.hp === 1) { fill(255, 255, 0); }
        rect(this.x, this.y, blokLengte, blokHoogte);
    }
}

//ball
class Bal {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.hasBounced = false;
        this.bounceCooldown = 0;
        this.angleVerandering = 12;
    }

    hitbox() {
        //bal op het blok
        if (this.x >= rectPos - 0.5 * ballRadius && this.x <= rectPos + rectLength + 0.5 * ballRadius && this.y >= rectY - 10 && this.y <= rectY + 15 && this.bounceCooldown <= 0) {
            this.speedY = this.speedY * -1;
            this.bounceCooldown = 3;
            this.hasBounced = true;
        }

        //randen
        if ((this.x >= 1840 || this.x <= 80) && this.bounceCooldown <= 0) {
            this.speedX = this.speedX * -1;
            this.bounceCooldown = 2;
            this.hasBounced = true;
        }

        if (this.y <= 80 && this.bounceCooldown <= 0) {
            this.speedY = this.speedY * -1;
            this.bounceCooldown = 2;
            this.hasBounced = true;
        }

        //ball angle verandering
        if (this.hasBounced === true) {
            this.angleVerandering = round(random(-6, 6));
            if (this.speedX < 0) {
                this.speedX = -1 * (12 + this.angleVerandering);
            } else {
                this.speedX = 12 + this.angleVerandering;
            }

            if (this.speedY < 0) {
                this.speedY = -1 * (12 + this.angleVerandering);
            } else {
                this.speedY = 12 - this.angleVerandering;
            }
            this.hasBounced = false;
        }
        this.bounceCooldown --;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    display() {
        fill(128, 0, 128);
        ellipse(this.x, this.y, ballRadius, ballRadius);
    }
}   