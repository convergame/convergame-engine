function ConvergameInput() {
  this.convergame = null;
  
  this.init = function(convergame)
  {
    this.convergame = convergame;
  };
  
  this.controlsMap = {};
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
}