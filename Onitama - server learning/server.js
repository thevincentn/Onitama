// WebServer for Onitama Game
// Author: Vincent Nguyen
// Last Modified: September 12 2017

//Using express
var express = require('express');
//Create App
var app = express();

//Set up server and open port
var server = app.listen(3000);

//Use public folder for app
app.use(express.static('public'));

//Initiate Sockets
var socket = require('socket.io');
var io = socket(server);
var lastPlayerID = 1;
var currentPlayer = 1;
var players = new Array();

var CARDS_IN_PLAY;
var pieceTracker = new Array();

var onitamaBlue = '#4286f4';
var onitamaRed = '#f45042';
setupServer();
io.sockets.on('connection', newConnection);







function setupServer(){
	console.log('server has started');
	shuffle();
	for(var i = 0; i< CARDS_IN_PLAY.length; i++){
		console.log(CARDS_IN_PLAY[i]);
	}
	initializePieces();
}

function initializePieces(){
    for(var x = 0; x<5; x++){
        for(var y = 0; y<5; y++){
            //if third square onitamaRed king
            if( x == 2 && y == 0){
                pieceTracker.push(new Piece(x,y,true,onitamaRed));
            }
            //if third square onitamaBlue king
            else if(x == 2 && y == 4){
                pieceTracker.push(new Piece(x,y,true,onitamaBlue));
            }
            // if top row PIeces will be onitamaRed
            else if( x!=2 && y < 1){
                pieceTracker.push(new Piece(x,y,false,onitamaRed));
            }
            // bottom row PIeces be onitamaBlue
            else if(  x!=2 && y > 3 ){
                pieceTracker.push(new Piece(x,y,false,onitamaBlue));
            }
            
        }
    }
}


function newConnection(socket){
	// //If the game is just starting set up cards in play
	// if(lastPlayerID==1){
	// 	setUpCards();
	// }
	console.log('New connection:' + socket.id);



	var newcomer = new Player(socket.id, lastPlayerID, (lastPlayerID==currentPlayer));

	players.push(newcomer);

	socket.emit('initClient', {ID: lastPlayerID, cards: CARDS_IN_PLAY, yourTurn: (lastPlayerID==currentPlayer)});
	socket.emit('pieces', pieceTracker);
	// socket.on('moves', data);
	// socket.on('cardOrder', data);


	

	lastPlayerID++;

	// socket.emit('cards', CARDS_IN_PLAY,cardindex) // emit cards
	// socket.on('mouse', mouseMessage);

}

function Player(id, playerN, isTurn){
	this.id = id;
	this.playerNum = playerN;
	this.turn = isTurn;
}

function Piece(x,y,m,c){
    this.col = x;
    this.row = y;
    this.master = m;
    this.color = c;

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
}

function shuffle() {
	var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var currentIndex = array.length;
	var temporaryValue;
	var randomIndex;
	

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	array.splice(4,11);
	array.push(16);
	
	CARDS_IN_PLAY = array;
}