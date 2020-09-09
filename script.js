var ballSpeedY = 12;
var ballSpeedX = 12;
var ballPosX = 100;
var ballPosY = 100;
var collisionFix = false;
var rectPos = 500;
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
        } else if (keyCode === 39 && rectPos <= 1660) {
            rectPos += 10;
        }
    }

    //balk en ball
    fill(255, 0, 0);
    ellipse(ballPosX, ballPosY, 40, 40);

    fill(0, 0, 255);
    rect(rectPos, 960, 190, 25);

    //ball physics
    if (ballPosX >= rectPos - 20 && ballPosX <= rectPos + 210 && ballPosY >= 950 && ballPosY <= 965 && collisionFix === false) {
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

    bounceCooldown -= 1;

}