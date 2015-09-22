var ConvergameDraw = ConvergameDraw || {};

function ConvergameDraw() {
  this.convergame = convergame;
	this.drawImage = function(imagePath, x, y, imgWidth, imgHeight)
  	{
	    if (typeof this.loadedImages[imagePath] !== 'undefined')
	    {
	      this.convergame.ctx.drawImage(this.loadedImages[imagePath], x * this.convergame.getXScale(), y * this.convergame.getYScale(), imgWidth * this.convergame.getXScale() , imgHeight * this.convergame.getYScale());
	    }
	    else
	    {
	      var img = new Image();
	      var _this = this;

	      img.onload = function () {
	        _this.loadedImages[imagePath] = img;
	      };

	      img.src = imagePath;
	    }
	  };

  this.drawCircle = function(centreX, centreY, radius, style)
  {
    this.convergame.ctx.strokeStyle = style;
    this.convergame.ctx.beginPath();
    this.convergame.ctx.arc(centreX * this.convergame.getXScale(), centreY * this.convergame.getYScale(), radius * this.convergame.getXScale(), 0, 2*Math.PI);
    this.convergame.ctx.stroke();
  };

  this.drawFilledCircle = function(centreX, centreY, radius, strokeStyle, fillStyle)
  {
    this.convergame.ctx.strokeStyle = strokeStyle;
    this.convergame.ctx.fillStyle = fillStyle;
    this.convergame.ctx.beginPath();
    this.convergame.ctx.arc(centreX * this.convergame.getXScale(), centreY * this.convergame.getYScale(), radius * this.convergame.getXScale(), 0, 2*Math.PI);
    this.convergame.ctx.stroke();
    this.convergame.ctx.fill();
  };

  this.drawRect = function(x, y, width, height, style)
  {
    this.convergame.ctx.strokeStyle = style;
    this.convergame.ctx.strokeRect(x*this.convergame.getXScale(), y * this.convergame.getYScale(), width*this.convergame.getXScale(), height*this.convergame.getYScale());
  };

  this.drawFilledRect = function(x, y, width, height, strokeStyle, fillStyle)
  {
    this.convergame.ctx.strokeStyle = strokeStyle;
    this.convergame.ctx.fillStyle = fillStyle;
    this.convergame.ctx.fillRect(x*this.convergame.getXScale(), y * this.convergame.getYScale(), width*this.convergame.getXScale(), height*this.convergame.getYScale());
  };

  this.drawText = function(x, y, style, fontSize, font, align, text, shadow, shadowOffsetX, shadowOffsetY, shadowCol)
  {
    shadow = typeof shadow !== 'undefined' ? shadow : false;
    this.convergame.ctx.font = fontSize * this.convergame.getXScale() + "px " + font;
    this.convergame.ctx.textAlign = align;

    if(shadow === true) {
      this.convergame.ctx.fillStyle = shadowCol;
      this.convergame.ctx.fillText(text, (x + shadowOffsetX) * this.convergame.getXScale(), (y + shadowOffsetY) * this.convergame.getYScale());
    }

    this.convergame.ctx.fillStyle = style;
    this.convergame.ctx.fillText(text, x * this.convergame.getXScale(), y * this.convergame.getYScale());
  };
}
