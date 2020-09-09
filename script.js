var ballSpeedY = 10;
var ballSpeedX = 10;
var ballPosX = 100;
var ballPosY = 100;

function setup() {
    createCanvas(1920, 1080);
}
  
  function draw() {
    //achtergrond
    background(0, 0, 0);
    noStroke();

    //kan gedelete worden
    fill(128, 128, 128);
    rect(0, 0, 60, 1080);
    rect(0, 0, 1920, 60);
    rect(1860, 0, 60, 1080);
    rect(0, 1020, 1920, 60);

    fill(255, 0 ,0);
    ellipse(ballPosX, ballPosY, 40, 40);

    fill(0, 0, 255);
    rect(mouseX, 960, 190, 25);

    //ball physics
    if(ballPosX >= mouseX -10 && ballPosX <= mouseX + 200 && ballPosY === 940) {
        ballSpeedY = ballSpeedY * -1;
    }

    if(ballPosX >= 1840 || ballPosX <= 80) {
        ballSpeedX = ballSpeedX * -1;
    }

    if(ballPosY <= 80) {
        ballSpeedY = ballSpeedY * -1;
    }

    if(ballPosY >= 1000) {
        textSize(80);
        fill(0, 255, 0);
        text("GAME OVER", 700, 500);
    }

    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;
    
}