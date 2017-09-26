'use strict';
var canvas = document.getElementById('onitama_board');
var context = canvas.getContext('2d');

var onitamaBlue = '#4286f4';
var onitamaRed = '#f45042';
var boardColor = '#f3c99f';

// Keep track of our socket connection
var socket;
var myTurn;
var myPlayerNumber;
var CARDS_IN_PLAY;
var pieceTracker;

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

var hand;

var width;
var height;

var boardX;
var boardY;

var canvasSize;
var mainBoardSize;
var mainSquareSize;

var cardW;

var cursorLocation = [0,0];
getBoardSize();

async function setup(){
    getBoardSize();
    socket = io.connect('http://localhost:3000');
    socket.on('initClient', function(data){
        myPlayerNumber = data.ID;
        myTurn = data.yourTurn;
        CARDS_IN_PLAY = data.cards;
    });
    socket.on('pieces', function(data){
        pieceTracker = data;
        whatismyshit();
            getBoardSize();

        initializeGame();
    });

}


window.onresize = function(){
    update();
};





function update(){
    getBoardSize();
    drawGame();

}

function initializeGame(){

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

function whatismyshit(){
    console.log(myPlayerNumber);
    console.log(CARDS_IN_PLAY);
    console.log(myTurn);

    for(var i = 0; i<CARDS_IN_PLAY.length; i++){
        console.log(CARDS_IN_PLAY[i]);
    }
}

function drawGame(){
    drawBackground();
    drawMainBoard();
    drawPieces();
    drawCards();
}

function getMyHand(){

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

function drawBackground(){
    context.fillStyle = "#483d4d";
    context.fillRect(0,0,2*width/3,height);
}

function drawMainBoard(){
    var boardSize = mainBoardSize;
    var sectionSize = mainSquareSize;

    makeBoardArt(boardX, boardY, boardSize);
    // canvas.addEventListener("mousedown",clickPiece,false);
}

function drawPieces(){
    if(myPlayerNumber%2==0){
        for(var i = 0; i < pieceTracker.length; i++){

            if(pieceTracker[i].master){
                drawMaster(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
            }else{
                drawStudent(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
            }
        }
    }else{
        for(var i = 0; i < pieceTracker.length; i++){
            if(pieceTracker[i].color==onitamaRed){
                if(pieceTracker[i].master){
                    drawMaster(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row+4)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
                }else{
                    drawStudent(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row+4)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
                }
            }else{
                if(pieceTracker[i].master){
                    drawMaster(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row-4)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
                }else{
                    drawStudent(boardX+(pieceTracker[i].col)*mainSquareSize, boardY+(pieceTracker[i].row-4)*mainSquareSize,mainSquareSize,pieceTracker[i].color);
                }
            }
        }
    }
    
}

function drawCards(){
    var factor = (myPlayerNumber%2)*((CARDS_IN_PLAY.length)/2);
    for(var i = 0; i<CARDS_IN_PLAY.length; i++){
        if(cards[CARDS_IN_PLAY[i]].name!='Fill'){
            if((i+factor)%(CARDS_IN_PLAY.length)==0){
                if(myPlayerNumber%2==0){
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX-10,boardY-cardW*(7/12)-10,cardW); 
                }else{
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX+mainBoardSize/2+10,boardY-cardW*(7/12)-10,cardW); 
                }
                
            }else if((i+factor)%(CARDS_IN_PLAY.length)==1){
                if(myPlayerNumber%2==0){
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX+mainBoardSize/2+10,boardY-cardW*(7/12)-10,cardW); 
                }else{
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX-10,boardY-cardW*(7/12)-10,cardW);
                }
            }else if((i+factor)%(CARDS_IN_PLAY.length)==2){
                cards[CARDS_IN_PLAY[i]].drawCard(boardX+mainBoardSize+10,boardY+mainBoardSize/2,cardW); 
            }else if((i+factor)%(CARDS_IN_PLAY.length)==3){
                if(myPlayerNumber%2==0){
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX+mainBoardSize/2+10,boardY+mainBoardSize+10,cardW);
                }else{
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX-10,boardY+mainBoardSize+10,cardW);
                } 
            }else if((i+factor)%(CARDS_IN_PLAY.length)==4){
                if(myPlayerNumber%2==0){
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX-10,boardY+mainBoardSize+10,cardW);
                }else{
                    cards[CARDS_IN_PLAY[i]].drawCard(boardX+mainBoardSize/2+10,boardY+mainBoardSize+10,cardW)
                }  
            }else {
                cards[CARDS_IN_PLAY[i]].drawCard(boardX-cardW-10,boardY+mainBoardSize/2,cardW); 
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
                if(myPlayerNumber%2==1){
                    context.fillStyle = onitamaBlue;
                }
                context.fillRect(xpos+x*sectionSize+sectionSize/6,ypos+y*sectionSize,4*sectionSize/6,sectionSize/3);
            }
            if( x == 2 && y == 4){
                context.fillStyle = onitamaBlue;
                if(myPlayerNumber%2==1){
                    context.fillStyle = onitamaRed;
                }
                context.fillRect(xpos+x*sectionSize+sectionSize/6,ypos+y*sectionSize+2*sectionSize/3,4*sectionSize/6,sectionSize/3);
            }
        }
    }
}

function Piece(x,y,m,c){
    this.col = x;
    this.row = y;
    this.master = m;
    this.color = c;
}

function drawMaster(xpos, ypos, squareSize, color){

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

function drawStudent(xpos, ypos, squareSize, color){
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