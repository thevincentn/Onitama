function Piece(x,y,i,j,s,m,c){

	this.col = x;
    this.row = y;
    this.size = s;
    this.master = m;
    this.color = c;

	this.drawMaster(x, y, color){
	    var xcenter = x*size + size/2;
	    var ycenter = y*size + size/2;
	    var headRadius = size/8;

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

	this.drawStudent(x, y, color){
	    var xcenter = x*size + size/2;
	    var ycenter = y*size + size/2;
	    var headRadius = size/8;

	    context.fillStyle = color;
	    context.beginPath();
	    context.arc(xcenter, ycenter-size/8, size/8, 0, Math.PI * 2, true); // Outer circle
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