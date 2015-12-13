var canvas = document.getElementById("game");
function Convergame(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  var hasGP = false, repGP, axes;
  this.draw = null;
  this.input = null;
  this.scene = null;
  this.collision = null;
  this.storage = null;
  
  this.then = null;

  this.mainGameLoop = function() {
    var now = Date.now(),
    delta = now - this.then,
    time = delta / 1000;

    // 1. Run update for all persistentScenes (allows main scene to reference data set in persistentScenes)
    for (var i = 0; i < this.scene.persistentScenes.length; i++) {
      this.scene.persistentScenes[i].update(time);
    }
    // 2. Run update main scene
    this.scene.currentScene.update(time);
    
    // 3. Run render main scene (appears below persistentScenes rendering)
    this.scene.currentScene.render();
    
    // 4. Run render for all persistentScenes (appears above main scene rendering)
    for (i = 0; i < this.scene.persistentScenes.length; i++) {
      this.scene.persistentScenes[i].render();
    }

    this.then = now;
    this.controlsPressed = [];

    // Request to do this again ASAP
    requestAnimationFrame(this.mainGameLoop.bind(this));
  };

  this.startMainGameLoop = function() {
    if (!this.scene.sceneCheck()) {return;}

    this.then = Date.now();
    this.mainGameLoop();
  };
  
  this.initComponents = function() {
      
    this.draw = new ConvergameDraw();
    this.draw.init(this);
    
    this.input = new ConvergameInput();
    this.input.init(this);
    
    this.scene = new ConvergameScene();
    this.scene.init(this);
    
    this.collision = new ConvergameCollision();
    this.collision.init(this);

    this.audio = new ConvergameAudio();
    this.audio.init(this);
    
    this.storage = new ConvergameStorage();
    this.storage.init(this);
      
  };
  
  this.initEventListeners = function() {
      
    //Disable right click / context menu
    document.oncontextmenu = function() { return false; }

    window.addEventListener("resize", function(e) {
      this.draw.setCanvasTo16By9Ratio();
    }.bind(this));

    window.addEventListener("keydown", function(e) {
      var control = this.input.getControlNameFromKeyCode(e.keyCode);

      this.input.controlsMap[control] = true;

      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }.bind(this));

    window.addEventListener("keyup", function(e) {
      var control = this.input.getControlNameFromKeyCode(e.keyCode);

      this.input.controlsMap[control] = false;
    }.bind(this));

    var stopPropagation = function(e)
    {
      if (e && e.preventDefault) { e.preventDefault(); }
      else if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
    };

    this.canvas.ondragstart = stopPropagation;
    this.canvas.onselectstart = stopPropagation;
      
  };

  this.init = function() {
    
    this.initComponents();
    
    this.initEventListeners();
    
    this.draw.setCanvasTo16By9Ratio(); //Todo: Add the option between 16:9, 16.10 or 4:3 (Game manifest file?)
    
    document.getElementsByTagName('body')[0].style.padding = '0';
    document.getElementsByTagName('body')[0].style.margin = '0';

    
  };
  /* Workaround for activating fullscreen API via canvas? 
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
  */

  this.random = function(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  };
  
}
