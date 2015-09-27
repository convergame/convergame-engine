
function BasicGameControllers()
{
    this.convergame = null;
    
    this.debug = false;
    
    this.gameControllers = [];
    
    this.axisThreshold = 0.20;
    
    this.update = function(time)
    {
        if (!this.checkGameControllerSupport)
        {
            return;
        }
        
        this.gameControllers = navigator.getGamepads();
        
    };
    
    this.render = function()
    {
        if (this.debug)
        {
            var i, j;
            
            this.convergame.text(20, 40, "#ffffff", 16, "sans-serif", "left", "Number of game controllers: "+this.gameControllers.length, true, 2, 2, "#000000");
        
            for (i = 0; i < this.gameControllers.length; i++) 
            {
                var controllerDebugText = "Index: "+this.gameControllers[i].index+", ID: "+this.gameControllers[i].id+", ";
                
                for (j = 0; j < this.gameControllers[i].buttons.length; j++) 
                {
                    controllerDebugText += "B"+j+": "+this.gameControllers[i].buttons[j].value+", ";
                }
                
                for (j = 0; j < this.gameControllers[i].axes.length; j++) 
                {
                    controllerDebugText += "A"+j+": "+(Math.floor(this.gameControllers[i].axes[j]*100)/100)+", ";
                }
                
                this.convergame.text(20, 40+((i+1)*25), "#ffffff", 16, "sans-serif", "left", controllerDebugText, true, 2, 2, "#000000");
            }
        }
    };
    
    this.init = function(convergame)
    {
        this.convergame = convergame;
        
    };
    
    this.setDebug = function(debugState)
    {
        this.debug = debugState;
    };
    
    this.checkGameControllerSupport = function()
    {
        return "getGamepads" in navigator;
    };
    
    this.getNumberOfConnectedControllers = function()
    {
        return this.gameControllers.length;
    };
    
    this.getControllerName = function(controllerNumber)
    {
        for (i = 0; i < this.gameControllers.length; i++) 
        {
            if (this.gameControllers[i].index==controllerNumber)
            {
                return this.gameControllers[i].id;
            }
        }
    };
    
    this.isButtonPressed = function(controllerNumber, buttonNumber)
    {
        for (i = 0; i < this.gameControllers.length; i++) 
        {
            if (this.gameControllers[i].index==controllerNumber)
            {
                if (this.gameControllers[i].buttons[buttonNumber].value>=0.5)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    };
    
    this.isAxisPositive = function(controllerNumber, axisNumber)
    {
        if (this.getAxisValue(controllerNumber, axisNumber) >= this.axisThreshold)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    
    this.isAxisNegative = function(controllerNumber, axisNumber)
    {
        if (this.getAxisValue(controllerNumber, axisNumber) <= -this.axisThreshold)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    
    this.getAxisValue = function(controllerNumber, axisNumber)
    {
        for (i = 0; i < this.gameControllers.length; i++) 
        {
            if (this.gameControllers[i].index==controllerNumber)
            {
                return this.gameControllers[i].axis[axisNumber];
            }
        }
    };
    
}