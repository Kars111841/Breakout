const blokLengte = 160;
const blokHoogte = 40;

//blokjes
class Blok {
    constructor(x, y, health) {
        this.x = x;
        this.y = y
        this.hp = health;
    }

    display() {
        if(this.hp === 3) {fill(255, 255, 0); }
        if(this.hp === 2) {fill(255, 128, 0); }
        if(this.hp === 1) {fill(255, 0, 0);   }
        rect(this.x, this.y, blokLengte, blokHoogte);
    }
}