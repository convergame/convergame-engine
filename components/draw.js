function ConvergameDraw() {
  this.convergame = null;
  
  this.loadedImages = {};
  
  this.init = function(convergame)
  {
    this.convergame = convergame;
  };
  
	this.image = function(imagePath, x, y, imgWidth, imgHeight)
  	{
	    if (typeof this.loadedImages[imagePath] !== 'undefined')
	    {
	      this.convergame.ctx.drawImage(this.loadedImages[imagePath], parseInt(x * this.getXScale()), parseInt(y * this.getYScale()), parseInt(imgWidth * this.getXScale()), parseInt(imgHeight * this.getYScale()));
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

  this.circle = function(centreX, centreY, radius, style)
  {
    this.convergame.ctx.strokeStyle = style;
    this.convergame.ctx.beginPath();
    this.convergame.ctx.arc(parseInt(centreX * this.getXScale()), parseInt(centreY * this.getYScale()), parseInt(radius * this.getXScale()), 0, 2*Math.PI);
    this.convergame.ctx.stroke();
  };

  this.filledCircle = function(centreX, centreY, radius, strokeStyle, fillStyle)
  {
    this.convergame.ctx.strokeStyle = strokeStyle;
    this.convergame.ctx.fillStyle = fillStyle;
    this.convergame.ctx.beginPath();
    this.convergame.ctx.arc(parseInt(centreX * this.getXScale()), parseInt(centreY * this.getYScale()), parseInt(radius * this.getXScale()), 0, 2*Math.PI);
    this.convergame.ctx.stroke();
    this.convergame.ctx.fill();
  };

  this.rectangle = function(x, y, width, height, style)
  {
    this.convergame.ctx.strokeStyle = style;
    this.convergame.ctx.strokeRect(parseInt(x*this.getXScale()), parseInt(y * this.getYScale()), parseInt(width*this.getXScale()), parseInt(height*this.getYScale()));
  };

  this.filledRectangle = function(x, y, width, height, strokeStyle, fillStyle)
  {
    this.convergame.ctx.strokeStyle = strokeStyle;
    this.convergame.ctx.fillStyle = fillStyle;
    this.convergame.ctx.fillRect(parseInt(x*this.getXScale()), parseInt(y * this.getYScale()), parseInt(width*this.getXScale()), parseInt(height*this.getYScale()));
  };

  this.text = function(x, y, style, fontSize, font, align, text, shadow, shadowOffsetX, shadowOffsetY, shadowCol)
  {
    shadow = typeof shadow !== 'undefined' ? shadow : false;
    this.convergame.ctx.font = parseInt(fontSize * this.getXScale()) + "px " + font;
    this.convergame.ctx.textAlign = align;

    if(shadow === true) {
      this.convergame.ctx.fillStyle = shadowCol;
      this.convergame.ctx.fillText(text, parseInt((x + shadowOffsetX) * this.getXScale()), parseInt((y + shadowOffsetY) * this.getYScale()));
    }

    this.convergame.ctx.fillStyle = style;
    this.convergame.ctx.fillText(text, parseInt(x * this.getXScale()), parseInt(y * this.getYScale()));
  };

  this.getCanvasWidth = function() {
    return this.convergame.canvas.width;
  };

  this.getCanvasHeight = function() {
    return this.convergame.canvas.height;
  };

  this.setCanvasTo16By9Ratio = function() {
    this.convergame.canvas.width = window.innerWidth;
    this.convergame.canvas.height = this.convergame.canvas.width*0.5625;

    while (this.convergame.canvas.width>=window.innerWidth || this.convergame.canvas.height>=window.innerHeight)
    {
      this.convergame.canvas.width -= 1;
      this.convergame.canvas.height -= 1;
    }
  };

  this.getTextWidth = function(string) {
    var text = this.convergame.ctx.measureText(string);
    return text.width;
  };

  this.getTextHeight = function(string) {
    var text = this.convergame.ctx.measureText(string);
    return text.height;
  };

  this.blankCanvas = function(style)
  {
    this.convergame.ctx.fillStyle = style;
    this.convergame.ctx.fillRect(0, 0, parseInt(this.getCanvasWidth()), parseInt(this.getCanvasHeight()));
  };

  this.setPixelGame = function(active) {
    if (active) {
      this.convergame.ctx.webkitImageSmoothingEnabled = false;
      this.convergame.ctx.mozImageSmoothingEnabled = false;
      this.convergame.ctx.imageSmoothingEnabled = false;
    } else {
      this.convergame.ctx.webkitImageSmoothingEnabled = true;
      this.convergame.ctx.mozImageSmoothingEnabled = true;
      this.convergame.ctx.imageSmoothingEnabled = true;
    }
  };

  this.getXScale = function() {
    return (this.getCanvasWidth()/1920);
  };

  this.getYScale = function() {
    return (this.getCanvasHeight()/1080);
  };

  this.preShake = function() {
    this.convergame.ctx.save();
    var dx = Math.random()*8, dy = Math.random()*8;
    this.convergame.ctx.translate(dx, dy);
  };

  this.postShake = function() {
    this.convergame.ctx.restore();
  };
}
