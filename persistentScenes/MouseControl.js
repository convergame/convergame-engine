
function MouseControl()
{	
    this.convergame = null;
    
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.leftButtonPressed = false;
    this.rightButtonPressed = false;
    
    this.update = function(time)
    {
        
    };
    
    this.render = function()
    {
		
    };
    
    this.getX = function()
    {
        return this.mouseX * this.convergame.draw.getXScale();
    };
    
    this.getY = function()
    {
        return this.mouseY * this.convergame.draw.getYScale();
    };
    
    this.getXUnscaled = function()
    {
        return this.mouseX;
    };
    
    this.getYUnscaled = function()
    {
        return this.mouseY;
    };
    
    this.isLeftButtonPressed = function()
    {
        return this.leftButtonPressed;  
    };
    
    this.isRightButtonPressed = function()
    {
        return this.rightButtonPressed;  
    };
    
    this.init = function(convergame)
    {
        this.convergame = convergame;
        
        this.convergame.canvas.addEventListener('mousemove', function(evt) {
            var rect = canvas.getBoundingClientRect();
            this.mouseX = evt.clientX - rect.left;
            this.mouseY = evt.clientY - rect.top;
        });
        
        this.convergame.canvas.addEventListener('mousedown', function(evt) {
            if (event.button===0) this.leftButtonPressed = true;
            else if (event.button===2) this.rightButtonPressed = true;
        });
        
        this.convergame.canvas.addEventListener('mouseup', function(evt) {
            if (event.button===0) this.leftButtonPressed = false;
            else if (event.button===2) this.rightButtonPressed = false;
        });
    };
}
