'use strict';


var canvas = document.getElementById('onitama_board');
var context = canvas.getContext('2d');

var OnitamaBlue = '#4286f4';
var onitamaRed = '#f45042';
var boardColor = '#f3c99f';

var width;
var height;

var boardX;
var boardY;

var canvasSize;
var mainBoardSize;
var mainSquareSize;

var pieceBeingMoved;
var pieceTracker = new Array();
var cardTracker = new Array();

var cardW;

var WHOS_TURN_IS_IT;

var cursorLocation = [0,0];






var cards = [
    new Card('Boar',  [[-1,0], [1,0], [0,1]]),
    new Card('Crab',  [[2, 0], [-2, 0], [0, 1]]),
    new Card('Crane',  [[0,1], [-1,-1], [1, -1]]),
    new Card('Cobra',  [[-1,0], [1,1], [1,-1]]),
    new Card('Dragon',  [[2,1],[-2,1],[-1,-1],[1,-1]]),
    new Card('Eel',  [[-1,1], [-1,-1], [0,1]]),
    new Card('Elephant',  [[1,0], [1,1], [-1,0], [-1,1]]),
    new Card('Frog',  [[-2,0], [-1,1], [1,-1]]),
    new Card('Goose',  [[-1,1],[-1,0],[1,0],[1,-1]]),
    new Card('Horse',  [[-1,0], [0, 1], [0, -1]]),
    new Card('Mantis',  [[1,1], [-1,1], [0,-1]]),
    new Card('Monkey',  [[1, 1], [-1, -1], [-1, 1], [1, -1]]),
    new Card('Ox',  [[0,1], [0,-1], [1,0]]),
    new Card('Rabbit',  [[-1,-1], [1,1], [2,0]]),
    new Card('Rooster',  [[-1,-1], [-1,0], [1,0], [1,1]]),
    new Card('Tiger', [[0, 2], [0, -1]]),
    new Card('Fill', [[0, 0]]),
];


window.onresize = function(){update();};



function initializeGame(){

    getBoardSize();
    initializePieces();
    initializeCards();
    drawGame();

    
    WHOS_TURN_IS_IT = OnitamaBlue;

}

function update(){
    getBoardSize();
    drawGame();

}

function getBoardSize(){
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    canvasSize = height;

    if(height<width){
        mainBoardSize = height/3;
    }else{
        mainBoardSize = width/3;
    }

    mainSquareSize = mainBoardSize/5;

    cardW = mainBoardSize/2;

    boardX = cardW*(5/4);
    boardY = height/4;
}

function drawGame(){
    drawBackground();
    drawMainBoard();
    drawPieces();
    drawCards();
}

function drawBackground(){
    context.fillStyle = "#483d4d";
    context.fillRect(0,0,2*width/3,height);
}

function drawMainBoard(){
    var boardSize = mainBoardSize;
    var sectionSize = mainSquareSize;

    makeBoardArt(boardX, boardY, boardSize);
    canvas.addEventListener("mousedown",clickPiece,false);
}

function drawPieces(){
    for(var i = 0; i < pieceTracker.length; i++){
        if(pieceTracker[i].master){
            master(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
        }else{
            student(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
        }
    }
}

function initializePieces(){
    for(var x = 0; x<5; x++){
        for(var y = 0; y<5; y++){
            //if third square onitamaRed king
            if( x == 2 && y == 0){
                pieceTracker.push(new piece(x,y,true,onitamaRed));
            }
            //if third square OnitamaBlue king
            else if(x == 2 && y == 4){
                pieceTracker.push(new piece(x,y,true,OnitamaBlue));
            }
            // if top row PIeces will be onitamaRed
            else if( x!=2 && y < 1){
                pieceTracker.push(new piece(x,y,false,onitamaRed));
            }
            // bottom row PIeces be OnitamaBlue
            else if(  x!=2 && y > 3 ){
                pieceTracker.push(new piece(x,y,false,OnitamaBlue));
            }
            
        }
    }
}

function initializeCards(){
    while(cards.length>6){
        var randomNum = Math.ceil(Math.random()*(cards.length-1)-1);
        cards.splice(randomNum,1);
    }
}

function drawCards(){
    for(var i = 0; i<cards.length; i++){
        if(cards[i].name!='Fill'){
            if(i==0){
                cards[i].drawCard(boardX-10,boardY-cardW*(7/12)-10,cardW);
            }else if(i==1){
                cards[i].drawCard(boardX+mainBoardSize/2+10,boardY-cardW*(7/12)-10,cardW);
            }else if(i==2){
                cards[i].drawCard(boardX-10,boardY+mainBoardSize+10,cardW);
            }else if(i==3){
                cards[i].drawCard(boardX+mainBoardSize/2+10,boardY+mainBoardSize+10,cardW);
            }else if(i==4){
                cards[i].drawCard(boardX-cardW-10,boardY+mainBoardSize/2,cardW);
            }else {
                cards[i].drawCard(boardX+mainBoardSize+10,boardY+mainBoardSize/2,cardW);
            }
        }
        
        
        
        
        
    }
}

function makeBoardArt(xpos,ypos,boardSize){
    var sectionSize = boardSize / 5;

    for(var x = 0; x<5; x++){
        for(var y = 0; y<5; y++){
            context.fillStyle = boardColor;
            context.fillRect(xpos+x*sectionSize,ypos+y*sectionSize,sectionSize,sectionSize);
            
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.strokeRect(xpos+x*sectionSize,ypos+y*sectionSize,sectionSize,sectionSize);

            if( x == 2 && y == 0){
                context.fillStyle = onitamaRed;
                context.fillRect(xpos+x*sectionSize+sectionSize/6,ypos+y*sectionSize,4*sectionSize/6,sectionSize/3);
            }
            if( x == 2 && y == 4){
                context.fillStyle = OnitamaBlue;
                context.fillRect(xpos+x*sectionSize+sectionSize/6,ypos+y*sectionSize+2*sectionSize/3,4*sectionSize/6,sectionSize/3);
            }
        }
    }
}

function piece(x,y,m,c){
    this.col = x;
    this.row = y;
    this.master = m;
    this.color = c;

}

function master(xpos, ypos, squareSize, color){

    var xcenter = xpos + squareSize/2;
    var ycenter = ypos + squareSize/2;
    var headRadius = squareSize/8;

    context.fillStyle = color;
    
    context.beginPath();
    context.arc(xcenter, ycenter-2*headRadius, headRadius, 0, Math.PI * 2, true);
    context.moveTo(xcenter+(Math.cos((4/3)*Math.PI))*headRadius,ycenter+((Math.sin((4/3)*Math.PI))-1)*headRadius);
    context.lineTo(xcenter+(Math.cos((5/4)*Math.PI))*headRadius,ycenter+headRadius/2);
    context.lineTo(xcenter+(Math.cos((5/4)*Math.PI))*headRadius,ycenter+3*headRadius);
    context.lineTo(xcenter+(Math.cos((7/4)*Math.PI))*headRadius,ycenter+3*headRadius);
    context.lineTo(xcenter+(Math.cos((7/4)*Math.PI))*headRadius,ycenter+headRadius/2);
    context.lineTo(xcenter+(Math.cos((5/3)*Math.PI))*headRadius,ycenter+((Math.sin((5/3)*Math.PI))-1)*headRadius);
    context.lineTo(xcenter+(Math.cos((4/3)*Math.PI))*headRadius,ycenter+((Math.sin((4/3)*Math.PI))-1)*headRadius);
    
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
    context.fill();
}

function student(xpos, ypos, squareSize, color){
    var xcenter = xpos + squareSize/2;
    var ycenter = ypos + squareSize/2;
    var headRadius = squareSize/8;

    context.fillStyle = color;
    context.beginPath();
    context.arc(xcenter, ycenter-squareSize/8, squareSize/8, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(xcenter+(Math.cos((4/3)*Math.PI))*headRadius,ycenter+(Math.sin((4/3)*Math.PI))*headRadius);
    context.lineTo(xcenter+(Math.cos((5/4)*Math.PI))*headRadius,ycenter+3*headRadius/4);
    context.lineTo(xcenter+(Math.cos((5/4)*Math.PI))*headRadius,ycenter+3*headRadius);
    context.lineTo(xcenter+(Math.cos((7/4)*Math.PI))*headRadius,ycenter+3*headRadius);
    context.lineTo(xcenter+(Math.cos((7/4)*Math.PI))*headRadius,ycenter+3*headRadius/4);
    context.lineTo(xcenter+(Math.cos((5/3)*Math.PI))*headRadius,ycenter+(Math.sin((5/3)*Math.PI))*headRadius);
    context.lineTo(xcenter+(Math.cos((4/3)*Math.PI))*headRadius,ycenter+(Math.sin((4/3)*Math.PI))*headRadius);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
    context.fill();
}

function canvasLoc(e){
    var canvasLocation = [0,0];
    var canvasXOffset = boardX;
    var canvasYOffset = boardY;
    
    // Get cursor location relative to the broswer
    if ((e.pageX != undefined) && (e.pageY != undefined)) {
        canvasLocation[0] = e.pageX;
        canvasLocation[1] = e.pageY;

    } else {

        canvasLocation[0] = 0;
        canvasLocation[1] = 0;
    }
    
    canvasLocation[0] -= canvasXOffset;
    canvasLocation[1] -= canvasYOffset;

    
    return canvasLocation;
}

function cursorLoc(e){
    var canvasLocation = canvasLoc(e);
                
    // Get the cursor location relative to the squares on the board and store in an array
    var cl1 = Math.floor(canvasLocation[0] * (1 / mainSquareSize));
    var cl2 = Math.floor(canvasLocation[1] * (1 / mainSquareSize));


    cursorLocation = [cl1,cl2];
}

function clickPiece(e){
    // Get the current square location
    cursorLoc(e);
    
    // Check if the square clicked has a piece and get the color
    var isPiece = checkForPiece();
    
    // If the clicked piece is the users turn, continue the game
    if(isPiece == WHOS_TURN_IS_IT) {
        // Remove piece from tracking array so that it looks likes its being dragged
        for(var i = 0; i < pieceTracker.length; i++) {
            if((pieceTracker[i].col == cursorLocation[0]) && (pieceTracker[i].row == cursorLocation[1])) {
                pieceBeingMoved = pieceTracker[i];
                pieceTracker.splice(i,1);
            }
        }
        
        // Set event listener to check piece drag and piece drop
        canvas.addEventListener("mousemove",dragPiece,false);
        canvas.addEventListener("mouseup",dropPiece,false);
    }
}

function checkForPiece(){
    // Check if the square contains a piece and return the color
    var pieceColor = null;
    for(var i = 0; i < pieceTracker.length; i++) {
        if((pieceTracker[i].col == cursorLocation[0]) && (pieceTracker[i].row == cursorLocation[1])) {
            pieceColor = pieceTracker[i].color;
        }
    }
    
    return pieceColor;
}

function dragPiece(e){
    // Get cursor location
    cursorLoc(e);
    drawGame();
    
    // Drag the piece and onitamaRedraw the game until you drop the piece
    var canvasLocation = canvasLoc(e);
    
    if(pieceBeingMoved.master) { 
        master(boardX+canvasLocation[0]-mainSquareSize/2,boardY+canvasLocation[1]-mainSquareSize/3,mainSquareSize,pieceBeingMoved.color);
    }else{
        student(boardX+canvasLocation[0]-mainSquareSize/2,boardY+canvasLocation[1]-mainSquareSize/3,mainSquareSize,pieceBeingMoved.color);
    }
}

function dropPiece(e){
    // Get the cursor location and get the legal status
    cursorLoc(e);
    
    var isOccupied = checkForPiece();

    // Check if the move is legal
    // If it is, move the piece, otherwise put it back where it was;
    if(pieceBeingMoved.color == WHOS_TURN_IS_IT && (!(isOccupied==WHOS_TURN_IS_IT) || (isOccupied==null))) {
        // Create the new piece and add to tracking array
        var newPiece = new piece(cursorLocation[0],cursorLocation[1],pieceBeingMoved.master,pieceBeingMoved.color);
        pieceTracker.push(newPiece);
        switchSides();
    } else {
        // The move was not legal so put the piece back where it came from
        pieceTracker.push(pieceBeingMoved);
        if(pieceBeingMoved.master) { 
            master(boardX+(pieceBeingMoved.col)*mainSquareSize, boardY+(pieceBeingMoved.row)*mainSquareSize,mainSquareSize,pieceBeingMoved.color);
        }else{
            student(boardX+(pieceBeingMoved.col)*mainSquareSize, boardY+(pieceBeingMoved.row)*mainSquareSize,mainSquareSize,pieceBeingMoved.color);
        }
    }
    
    
    // Remove the listeners and onitamaRedraw the board
    canvas.removeEventListener("mousemove",dragPiece,false);
    canvas.removeEventListener("mouseup",dropPiece,false);
    

    drawGame();
    
    // Set the piece being moved flag to false
    pieceBeingMoved = false;

}

function checkValidity(){
    var validity = true;
    pieceBeingMoved.color == WHOS_TURN_IS_IT && (!(isOccupied==WHOS_TURN_IS_IT) || (isOccupied==null))
}


function switchSides(){
    if(WHOS_TURN_IS_IT == OnitamaBlue){
        WHOS_TURN_IS_IT = onitamaRed;
    }else{
        WHOS_TURN_IS_IT = OnitamaBlue;
    }
}

function Card(n,m){

    this.name = n;
    this.moves = m;


    var boardColor = '#f3c99f'

    

    this.drawCard = function(xloc,yloc,cardWidth){
        var cardHeight = cardWidth*(7/12);
        var sectionSize = cardWidth/12;

        context.fillStyle = boardColor;
        context.fillRect(xloc,yloc,cardWidth,cardHeight);

        for(var x = 0; x<5; x++){
            for(var y = 0; y<5; y++){
                if( x == 2 && y == 2){
                    context.fillStyle = "black";
                }else{
                    context.fillStyle = boardColor;
                }
                context.fillRect(xloc+cardWidth/2+x*sectionSize,yloc+y*sectionSize+sectionSize,sectionSize,sectionSize);
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.strokeRect(xloc+cardWidth/2+x*sectionSize,yloc+y*sectionSize+sectionSize,sectionSize,sectionSize);
            }
        }
        for (var i = 0; i<this.moves.length; i++){
            context.lineWidth = 2;
            context.strokeStyle = 'green';
            context.strokeRect(xloc+cardWidth/2+(2+this.moves[i][0])*sectionSize,yloc+sectionSize+(2-this.moves[i][1])*sectionSize,sectionSize,sectionSize);
        }
        context.font = cardWidth/12+" Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText(this.name, xloc+cardWidth/16, yloc+cardHeight/2); 
    }
}