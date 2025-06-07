//board
let board;
let boardwidth=360;
let boardHeight=640;
let context;

//bird
let birdHeight=24;
let birdWidth=34;
let birdX=boardwidth/8;
let birdY=boardHeight/2;
let birdImg;
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height  : birdHeight
}
//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardwidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2.15;
let velocityY = 0;

window.onload=function(){
    board=document.getElementById("board");
    board.width=boardwidth;
    board.height=boardHeight;
    context=board.getContext("2d"); //almost like brush

    //context.fillStyle = "blue";
    //context.fillRect(bird.x,bird.y,bird.width,bird.height);

    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);}

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes,1500);
    document.addEventListener("keydown",moveBird);
    document.addEventListener("touchstart",tmoveBird);

} 

function update(){
    requestAnimationFrame(update);

    context.clearRect(0,0,board.width,board.height);
    //redraw bird
    bird.y += velocityY;
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height); 
    }

}

function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = pipeHeight/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }


    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp"){
        velocityY = -6;
    }
}

function tmoveBird(){
    velocityY = -6;
}
