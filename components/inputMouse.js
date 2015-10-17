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
        
        this.convergame.canvas.addEventListener('mousemove', function(event) {
            var rect = canvas.getBoundingClientRect();
            _this.mouseX = event.clientX - rect.left;
            _this.mouseY = event.clientY - rect.top;
        });
        
        this.convergame.canvas.addEventListener('mousedown', function(event) {
            if (event.button===0) _this.leftButtonPressed = true;
            else if (event.button===2) _this.rightButtonPressed = true;
        });
        
        this.convergame.canvas.addEventListener('mouseup', function(event) {
            if (event.button===0) _this.leftButtonPressed = false;
            else if (event.button===2) _this.rightButtonPressed = false;
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