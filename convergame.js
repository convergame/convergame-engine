var canvas = document.getElementById("game");
function Convergame(canvas) {

  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  var hasGP = false, repGP, axes;

  this.scene = null;
  
  this.controlsMap = {};
  
  this.loadedImages = [];
  
  this.then = null;
  
  this.sanityCheck = function(){
      if (typeof this.scene != 'object') {
          console.log('You must set a scene using the convergame.changeScene method.');
          return false;
      }
      return true;
  };

  this.mainGameLoop = function(){
      var now = Date.now();
      var delta = now - this.then;
      var time = delta / 1000;
      
      this.scene.updateFunction(time);
      this.scene.renderFunction();
    
      this.then = now;
      this.controlsPressed = [];
    
      // Request to do this again ASAP
      requestAnimationFrame(this.mainGameLoop.bind(this));
  };
  
  this.startMainGameLoop = function(){
      
      if (!this.sanityCheck()) return;
      
      this.then = Date.now();
      this.mainGameLoop();
  };

  this.getCanvasWidth = function(){
    return canvas.width;
  };
  this.getCanvasHeight = function(){
    return canvas.height;
  };
  this.setCanvasTo16By9Ratio = function(){
    canvas.width = window.innerWidth;
    canvas.height = canvas.width*0.5625;
    
    while (canvas.width>=window.innerWidth || canvas.height>=window.innerHeight)
    {
        canvas.width -= 1;
        canvas.height -= 1;
    }
  };
  
  this.getControlNameFromKeyCode = function(keyCode)
  {
      var control = null;
      
      switch (keyCode)
        {
            case 37: // left arrow key
            case 65: // a
              control = "left";
              break;
            case 38: // up arrow key
            case 87: // w
              control = "up";
              break; 
            case 39: // right arrow key
            case 68: // d
              control = "right";
              break;
            case 40: // down arrow key
            case 83: // s
              control = "down";
              break;
            case 13: // enter
              control = "enter";
              break;
            case 32: //space
              control = "space";
              break;
        }
        
        return control;
  };
  
  this.isControlPressed = function(controlName)
  {
      if (typeof this.controlsMap[controlName] == 'undefined')
      {
          return false;
      }
      
      return this.controlsMap[controlName];
  };

  this.drawImage = function(imagePath, x, y, imgWidth, imgHeight)
  {
    var img = new Image();
    var _this = this;
    
    img.onload = function () {
        _this.loadedImages.push(imagePath);
    };
    
    img.src = imagePath;
    
    if (this.loadedImages.indexOf(imagePath)>-1)
    {
        this.ctx.drawImage(img, x * this.getXScale(), y * this.getYScale(), imgWidth * this.getXScale() , imgHeight * this.getYScale());
    }
  };
  
  this.drawCircle = function(centreX, centreY, radius, style)
  {
    this.ctx.strokeStyle = style;
    this.ctx.beginPath();
    this.ctx.arc(centreX * this.getXScale(), centreY * this.getYScale(), radius * this.getXScale(), 0, 2*Math.PI);
    this.ctx.stroke();
  };
  
  this.drawFilledCircle = function(centreX, centreY, radius, strokeStyle, fillStyle)
  {
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.fillStyle = fillStyle;
    this.ctx.beginPath();
    this.ctx.arc(centreX * this.getXScale(), centreY * this.getYScale(), radius * this.getXScale(), 0, 2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  };
  
  this.drawRect = function(x, y, width, height, style)
  {
    this.ctx.strokeStyle = style;
    this.ctx.strokeRect(x*this.getXScale(), y * this.getYScale(), width*this.getXScale(), height*this.getYScale());
  };
  
  this.drawFilledRect = function(x, y, width, height, strokeStyle, fillStyle)
  {
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillRect(x*this.getXScale(), y * this.getYScale(), width*this.getXScale(), height*this.getYScale());
  };
  
  this.drawText = function(x, y, style, fontSize, font, align, text, shadow, shadowOffsetX, shadowOffsetY, shadowCol)
  {
    shadow = typeof shadow !== 'undefined' ? shadow : false;
    this.ctx.font = fontSize * this.getXScale() + "px " + font;
    this.ctx.textAlign = align;

    if(shadow === true) {
      this.ctx.fillStyle = shadowCol;
      this.ctx.fillText(text, (x + shadowOffsetX) * this.getXScale(), (y + shadowOffsetY) * this.getYScale());
    }

    this.ctx.fillStyle = style;
    this.ctx.fillText(text, x * this.getXScale(), y * this.getYScale());
  };

  this.getTextWidth = function(string) {
    var text = this.ctx.measureText(string);
    return text.width;
  };

  this.getTextHeight = function(string) {
    var text = this.ctx.measureText(string);
    return text.height;
  };
  
  this.blankCanvas = function(style)
  {
    this.ctx.fillStyle = style;
    this.ctx.fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
  };
  
  this.init = function() {
    this.setCanvasTo16By9Ratio();
    document.getElementById('body').style.padding = '0';
    document.getElementById('body').style.margin = '0';
    //this.include('/js/webfonts.js');
    //this.include('/js/convergame-touch.js');
    
    window.addEventListener("resize", function(e) 
    {
        this.setCanvasTo16By9Ratio();
    }.bind(this));
    
    window.addEventListener("keydown", function(e) 
    {
        var control = this.getControlNameFromKeyCode(e.keyCode);
        
        this.controlsMap[control] = true;
        
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }.bind(this));
    
    window.addEventListener("keyup", function(e) 
    {
        var control = this.getControlNameFromKeyCode(e.keyCode);
        
        this.controlsMap[control] = false;
        
    }.bind(this));
    
    this.canvas.ondragstart = function(e) 
    {
        if (e && e.preventDefault) { e.preventDefault(); }
        else if (e && e.stopPropagation) { e.stopPropagation(); }
        return false;
    };
    
    this.canvas.onselectstart = function(e) 
    {
        if (e && e.preventDefault) { e.preventDefault(); }
        else if (e && e.stopPropagation) { e.stopPropagation(); }
        return false;
    };
    
  };
  
  this.fullscreen = function(){
    if(canvas.requestFullScreen) {
      canvas.requestFullScreen();
    } else if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
    } else if(canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else {
      alert('Fullscreen not supported by your browser.');
    }
  };
  
  this.setPixelGame = function(active){
    if (active)
    {
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
    else
    {
        this.ctx.webkitImageSmoothingEnabled = true;
        this.ctx.mozImageSmoothingEnabled = true;
        this.ctx.imageSmoothingEnabled = true;
    }
  };
  
  this.getXScale = function(){
    return (convergame.getCanvasWidth()/1920);
  };
  
  this.getYScale = function(){
    return (convergame.getCanvasHeight()/1080);
  };
  
  this.random = function(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  };

  this.isCollide = function(object1, object2) {
    if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
        object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      return true;
    } else {
      return false;
    }
  };

  this.changeScene = function(scene) {
    
    // Ensuring control presses do not carry over to next scene
    this.controlsMap = {};
    
    // Switch scene
    this.scene = scene;
    
    // Run scene initialisation
    this.scene.init(this);
    
    };

  this.preShake = function() {
    ctx.save();
    var dx = Math.random()*8;
    var dy = Math.random()*8;
    ctx.translate(dx, dy);
  };

  this.postShake = function() {
    ctx.restore();
  };

}