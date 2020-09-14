//binnenkort zinloos
var ballSpeedY = 12;
var ballSpeedX = 12;
var ballPosX = 100;
var ballPosY = 100;

function setup() {
    createCanvas(1920, 1080);
}

function draw() {
    hasBounced = false;

    //achtergrond
    background(0, 0, 0);
    noStroke();

    //zijkanten
    fill(128, 128, 128);
    rect(0, 0, 60, 1080);
    rect(0, 0, 1920, 60);
    rect(1860, 0, 60, 1080);
    rect(0, 1020, 1920, 60);

    //controls
    if (keyIsPressed) {
        if (keyCode === 37 && rectPos >= 60) {
            rectPos -= 15;
        } else if (keyCode === 39 && rectPos + rectLength <= 1860) {
            rectPos += 15;
        }
    }

    //display blokjes die weg gaan
    for (var i = 0; i < blokjes.length; i++) {
        if (blokjes[i].hp <= 0) {
            blokjes.splice(i, 1);
            i--;
        }
        blokjes[i].display();
    }

    //bij het beginnen van een nieuwe stage, is dit het algoritme wat de stage maakt
    if (blokjes.length === 0) {
        //reset van variabelen
        currentStage++;
        currentLetter = 0;
        //maximale grootte van stage
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 8; j++) {
                //als het een x is slaat ie het over
                if (level[currentStage - 1].charAt(currentLetter) !== "x") {
                    //Health Points, bepaalt ook kleur
                    if (level[currentStage - 1].charAt(currentLetter) === "r") {
                        newHp = 3;
                    } else if (level[currentStage - 1].charAt(currentLetter) === "o") {
                        newHp = 2;
                    } else {
                        newHp = 1;
                    }
                    //standaard formule voor nieuw blokje
                    newBlok = new Blok(265 + j * 175, 230 + i * 55, newHp);
                    blokjes.push(newBlok);
                }
                currentLetter++;
            }
        }
    }

    if (balletjes.length === 0) {
        newBal = new Bal(rectPos + 0.5 * rectLength, rectY - 50, 0, -10);
        balletjes.push(newBal);
    }

    //hier moet ball update komen
    for (var i = 0; i < balletjes.length; i++) {
        balletjes[i].update();
        balletjes[i].display();
        balletjes[i].hitbox();
    }

    //balk
    fill(255, 0, 255);
    rect(rectPos, rectY, rectLength, 25);

    //bug fix dingen
    if (rectPos < 60) { rectPos = 60; }
    if (rectPos + rectLength > 1860) { rectPos = 1850 - rectLength; }
    bounceCooldown -= 1;
}