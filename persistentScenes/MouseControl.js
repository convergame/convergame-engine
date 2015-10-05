
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
    };
}
