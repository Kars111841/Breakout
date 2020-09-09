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
        if (keyCode === 37 && rectPos >= 70) {
            rectPos -= 10;
        } else if (keyCode === 39 && rectPos + rectLength <= 1850) {
            rectPos += 10;
        }
    }

    //bij het beginnen van een nieuwe stage, is dit het algoritme wat de stage maakt
    if(blokjes.length === 0) {
        //reset van variabelen
       currentStage ++;
       currentLetter = 0;
       //maximale grootte van stage
       for(var i = 0; i < 7; i++) {
           for(var j = 0; j < 8; j++) {
               //als het een x is slaat ie het over
                if(level[currentStage - 1].charAt(currentLetter) !== "x") {
                    //Health Points, bepaalt ook kleur
                    if(level[currentStage - 1].charAt(currentLetter) === "r") {
                        newHp = 3;
                    } else if(level[currentStage - 1].charAt(currentLetter) === "o") {
                        newHp = 2;
                    } else {
                        newHp = 1;
                    }
                    //standaard formule voor nieuw blokje
                    newBlok = new Blok (265 + j * 175, 230 + i * 55, newHp);
                    blokjes.push(newBlok);
                }  
            currentLetter++;
           }
       } 
    }

    //display blokjes die weg gaan
    for(var i = 0; i < blokjes.length; i++) {
        blokjes[i].display();
    }

    //balk en ball
    fill(255, 0, 0);
    ellipse(ballPosX, ballPosY, ballRadius, ballRadius);

    fill(0, 0, 255);
    rect(rectPos, 960, rectLength, 25);

    //ball physics
    if (ballPosX >= rectPos - 0.5 * ballRadius && ballPosX <= rectPos + rectLength + 0.5 * ballRadius && ballPosY >= 950 && ballPosY <= 965 && bounceCooldown < 0) {
        ballSpeedY = ballSpeedY * -1;
        bounceCooldown = 3;
        hasBounced = true;
    } 

    if (ballPosX >= 1840 || ballPosX <= 80) {
        ballSpeedX = ballSpeedX * -1;
        hasBounced = true;
    }

    if (ballPosY <= 80) {
        ballSpeedY = ballSpeedY * -1;
        hasBounced = true;
    }

    if (ballPosY >= 1000) {
        textSize(80);
        fill(0, 255, 0);
        text("GAME OVER", 700, 500);
    }

    //ball positite verandering
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    //ball angle verandering
    if(hasBounced === true) {
        angleVerandering = round(random(-6, 6));
        if(ballSpeedX < 0) {
            ballSpeedX = -1 * (12 + angleVerandering);
        } else {
            ballSpeedX = 12 + angleVerandering;
        }

        if(ballSpeedY < 0) {
            ballSpeedY = -1 * (12 + angleVerandering);
        } else {
            ballSpeedY = 12 - angleVerandering;
        }
        hasBounced = false;
    }

    //bug fix dingen
    if(rectPos < 70) {rectPos = 70; }
    if(rectPos + rectLength > 1850) {rectPos = 1850 - rectLength; }
    bounceCooldown -= 1;
}