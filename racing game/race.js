const canvas=document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector(".btn");
const redCar = document.querySelector(".red");
const blueCar = document.querySelector(".blue");
const resultsDisplay = document.querySelector(".results")
const finishline = canvas.width - 10;
let blueSpeed = 0;
let redSpeed=0;
let running = false;
let bluePos = 10;
let redPos = 10;
let redA = true;
let blueJ = true;
let blueImg = new Image();
blueImg.src = "images/fighter (2).png";
let redImg = new Image();
redImg.src = "images/car (2).png";
const numColumns = 12;
const numRows = 1;
const frameWidth = blueImg.width/ numColumns;
const frameHeight = blueImg.height/ numRows;
let maxFrame = numColumns *numRows -1;
let currentFrame = 0;
const speed = 1;
setInterval(draw, 33);
document.addEventListener('keypress', move);
btn.addEventListener('click', start);
function draw(){
    currentFrame++;
    ctx.fillStyle ="gray";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    if (currentFrame>maxFrame){
        currentFrame=0;
    }
    let column = currentFrame % numColumns;
    let row = 0;
    ctx.drawImage(blueImg, column * frameWidth, 0, frameWidth, frameHeight, bluePos, 5, frameWidth, frameHeight);
    //32, 16
    ctx.drawImage(redImg, column * frameWidth, 0, frameWidth, frameHeight, redPos, 40, frameWidth, frameHeight);
    //75, 50
    bluePos += blueSpeed;
    redPos+= redSpeed;
    redSpeed *= 0.95;
    blueSpeed *= 0.95;
}
function move(event){
    if(!running){
        return
    }
    if(event.key == 'a'){
        if (redA){
            redSpeed += speed;
            redA = false;
        }
    }
    else if(event.key == 's'){
        if(!redA){
            redSpeed += speed;
            redA = true;
        }
    }
    else if(event.key == 'j'){
        if(blueJ){
            blueSpeed += speed;
            blueJ = false;
        }
    }
    else if(event.key == 'k'){
        if(!blueJ){
            blueSpeed += speed;
            blueJ = true;
        }
    }
    detectWin();
}
function detectWin(){
    if (redPos > finishline){
        resultsDisplay.innerHTML = "car wins";
        running = false;
    }
    else if(bluePos > finishline){
        resultsDisplay.innerHTML = "jet wins";
        running = false;
    }
}
function start(){
    running = true;
    redPos = 10;
    bluePos= 10;
    redSpeed = 0;
    blueSpeed = 0;
    resultsDisplay.innerHTML = "go";
}