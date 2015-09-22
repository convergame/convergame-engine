var canvas = document.getElementById("game");
function Convergame(canvas) {

  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  var hasGP = false, repGP, axes;
   this.draw = null;
   this.input = null;
   this.scene = null;
  this.scene = null;
  
  this.persistentScenes = [];

  this.controlsMap = {};

  this.loadedImages = {};

  this.then = null;

  this.sanityCheck = function() {
    if (typeof this.scene !== 'object') {
      console.log('You must set a scene using the convergame.changeScene method.');
      return false;
    }
    return true;
  };

  this.mainGameLoop = function() {
    var now = Date.now();
    var delta = now - this.then;
    var time = delta / 1000;
    
    var i;

    // 1. Run updateFunction for all persistentScenes (allows main scene to reference data set in persistentScenes)
    for (i = 0; i < this.persistentScenes.length; i++) {
        this.persistentScenes[i].updateFunction(time);
    }

    // 2. Run updateFunction main scene
    this.scene.updateFunction(time);
    
    // 3. Run renderFunction main scene (appears below persistentScenes rendering)
    this.scene.renderFunction();
    
    // 4. Run renderFunction for all persistentScenes (appears above main scene rendering)
    for (i = 0; i < this.persistentScenes.length; i++) {
        this.persistentScenes[i].renderFunction();
    }

    this.then = now;
    this.controlsPressed = [];

    // Request to do this again ASAP
    requestAnimationFrame(this.mainGameLoop.bind(this));
  };

  this.startMainGameLoop = function() {
    if (!this.sanityCheck()) {return;}

    this.then = Date.now();
    this.mainGameLoop();
  };

  this.getCanvasWidth = function() {
    return canvas.width;
  };

  this.getCanvasHeight = function() {
    return canvas.height;
  };

  this.setCanvasTo16By9Ratio = function() {
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
    if (typeof this.controlsMap[controlName] === 'undefined')
    {
      return false;
    }

    return this.controlsMap[controlName];
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
    this.draw = new ConvergameDraw();
    this.input = new ConvergameInput();
    this.scene = new ConvergameScene();
    this.setCanvasTo16By9Ratio();
    document.getElementById('body').style.padding = '0';
    document.getElementById('body').style.margin = '0';


    //this.include('/js/webfonts.js');
    //this.include('/js/convergame-touch.js');

    window.addEventListener("resize", function(e) {
      this.setCanvasTo16By9Ratio();
    }.bind(this));

    window.addEventListener("keydown", function(e) {
      var control = this.getControlNameFromKeyCode(e.keyCode);

      this.controlsMap[control] = true;

      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }.bind(this));

    window.addEventListener("keyup", function(e) {
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

  this.fullscreen = function() {
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

  this.setPixelGame = function(active) {
    if (active) {
      this.ctx.webkitImageSmoothingEnabled = false;
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.imageSmoothingEnabled = false;
    } else {
      this.ctx.webkitImageSmoothingEnabled = true;
      this.ctx.mozImageSmoothingEnabled = true;
      this.ctx.imageSmoothingEnabled = true;
    }
  };

  this.getXScale = function() {
    return (this.getCanvasWidth()/1920);
  };

  this.getYScale = function() {
    return (this.getCanvasHeight()/1080);
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
    this.ctx.save();
    var dx = Math.random()*8, dy = Math.random()*8;
    this.ctx.translate(dx, dy);
  };

  this.postShake = function() {
    this.ctx.restore();
  };
  
  this.addPersistentScene = function(sceneObject) {
    // Run scene initialisation
    sceneObject.init(this);
    
    // Add scene to persistentScenes array
    this.persistentScenes.push(sceneObject);
  };
  
  this.removePersistentScene = function(sceneObject) {

    // Remove scene from persistentScenes array
    var index = this.persistentScenes.indexOf(sceneObject);
    this.persistentScenes.splice(index, 1);

  };
  
}
