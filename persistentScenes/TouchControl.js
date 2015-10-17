function TouchControl()
{	
    this.convergame = null;
    
    this.debug = false;
    
    this.touchX = 0;
    this.touchY = 0;
    
    this.touchPressed = false;
    
    this.update = function(time)
    {
        
    };
    
    this.render = function()
    {
		if (this.debug)
        {
            var debugText = "X: "+this.getX()+", Y: "+this.getY()+", ";
            
            debugText += "Touch pressed: "+this.isTouch()+", ";
            
            this.convergame.draw.text(20, 40, "#ffffff", 20, "sans-serif", "left", debugText, true, 2, 2, "#000000");
        }
    };
    
    this.getX = function()
    {
        return (this.touchX / (this.convergame.draw.getXScale())).toFixed(2);
    };
    
    this.getY = function()
    {
        return (this.touchY / this.convergame.draw.getYScale()).toFixed(2);
    };
    
    this.getXUnscaled = function()
    {
        return (this.touchX).toFixed(2);
    };
    
    this.getYUnscaled = function()
    {
        return (this.touchY).toFixed(2);
    };
    
    this.isTouch = function()
    {
        return this.touchPressed;  
    };
    
    this.resetTouchState = function()
    {
        this.touchPressed = false;
    };
    
    this.setDebug = function(debug)
    {
        this.debug = debug;
    };
    
    this.init = function(convergame)
    {
        this.convergame = convergame;
        
        var _this = this;

        this.convergame.canvas.addEventListener('touchmove', function(event) {
            var rect = canvas.getBoundingClientRect();
            _this.touchX = event.touches[0].clientX - rect.left;
            _this.touchY = event.touches[0].clientY - rect.top;
        });
        
        this.convergame.canvas.addEventListener('touchstart', function(event) {
            if (event.touches[0]) _this.touchPressed = true;
        });
        
        this.convergame.canvas.addEventListener('touchend', function(event) {
            if (!event.touches[0]) _this.touchPressed = false;
        });

        this.convergame.canvas.addEventListener('touchcancel', function(event) {
            if (!event.touches[0]) _this.touchPressed = false;
        });
    };
}
