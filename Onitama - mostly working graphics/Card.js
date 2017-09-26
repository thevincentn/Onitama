function Card(n,m){

	this.name = n;
	this.moves = m;


	var boardColor = '#f3c99f'

	

    this.drawCard = function(xloc,yloc,cardWidth){
    	var cardHeight = cardWidth*(7/12);
    	var sectionSize = w/12;

	    for(var x = 0; x<5; x++){
	        for(var y = 0; y<5; y++){
	            if( x == 2 && y == 2){
	                context.fillStyle = "black";
	            }else{
	            	context.fillStyle = boardColor;
	            }
	            context.fillRect(xloc+x*sectionSize,yloc+y*sectionSize,sectionSize,sectionSize);
	            context.lineWidth = 2;
	            context.strokeStyle = 'black';
	            context.strokeRect(xloc+x*sectionSize,yloc+y*sectionSize,sectionSize,sectionSize);
	        }
	    }
	    for (var i = 0; i<moves.length; i++){
	    	context.lineWidth = 2;
	        context.strokeStyle = 'green';
	        context.strokeRect(xloc+(2+moves[i][0])*sectionSize,yloc+(2+moves[i][1])*sectionSize,sectionSize,sectionSize);
	    }
    	context.font = "16px Arial";
		context.fillStyle = "black";
		context.textAlign = "left";
		context.fillText(this.name, cardWidth/16, cardHeight/2); 
    }
}