//binnenkort zinloos
var ballSpeedY = 12;
var ballSpeedX = 12;
var ballPosX = 100;
var ballPosY = 100;


//blok en bal
const ballRadius = 40;
var rectLength = 190;
var rectPos = 500;

//stuiteren
var hasBounced = false;
var angleVerandering = 0;
var bounceCooldown = 0;

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

    ////////test/////////
    fill(240, 240, 40);
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 7; j++) {
            rect(265 + i * 175, 230 + j * 55, 160, 40);
        }
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