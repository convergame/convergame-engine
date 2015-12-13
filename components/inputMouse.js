function ConvergameInputMouse() {

    this.convergame = null;

    this.mouseX = 0;
    this.mouseY = 0;

    this.leftButtonPressed = false;
    this.rightButtonPressed = false;

    this.init = function(convergame)
    {
        this.convergame = convergame;

        var _this = this;

        var setMousePosition = function (event)
        {
          var rect = _this.convergame.canvas.getBoundingClientRect();
          _this.mouseX = event.clientX - rect.left;
          _this.mouseY = event.clientY - rect.top;
        };

        this.convergame.canvas.addEventListener('mousemove', function(event) {
          setMousePosition(event);
          event.preventDefault();
        });

        var setButtonPressed = function(buttonNumber, pressed)
        {
          if (buttonNumber===0) _this.leftButtonPressed = pressed;
          else if (buttonNumber===2) _this.rightButtonPressed = pressed;
        };

        this.convergame.canvas.addEventListener('mousedown', function(event) {
            setMousePosition(event);
            setButtonPressed(event.button, true);
            event.preventDefault();
        });

        this.convergame.canvas.addEventListener('touchstart', function(event) {
            setMousePosition(event.touches[0]);
            _this.leftButtonPressed = true;
            event.preventDefault();
        });

        this.convergame.canvas.addEventListener('mouseup', function(event) {
            setMousePosition(event);
            setButtonPressed(event.button, false);
            event.preventDefault();
        });

        this.convergame.canvas.addEventListener('touchend', function(event) {
            setMousePosition(event.touches[0]);
            _this.leftButtonPressed = false;
            event.preventDefault();
        });
    };

    this.getX = function()
    {
        return (this.mouseX / (this.convergame.draw.getXScale())).toFixed(2);
    };

    this.getY = function()
    {
        return (this.mouseY / this.convergame.draw.getYScale()).toFixed(2);
    };

    this.getXUnscaled = function()
    {
        return (this.mouseX).toFixed(2);
    };

    this.getYUnscaled = function()
    {
        return (this.mouseY).toFixed(2);
    };

    this.isLeftButtonPressed = function()
    {
        return this.leftButtonPressed;
    };

    this.isRightButtonPressed = function()
    {
        return this.rightButtonPressed;
    };

    this.isPointerWithinRect = function(x, y, width, height)
    {
        if (this.getX() > x && this.getX() < x + width &&
            this.getY() > y && this.getY() < y + height)
        {
            return true;
        }

        return false;
    };

    this.resetButtonState = function()
    {
        this.leftButtonPressed = false;
        this.rightButtonPressed = false;
    };

}
