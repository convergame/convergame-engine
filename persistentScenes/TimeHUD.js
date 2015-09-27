
function TimeHUD()
{	
    this.convergame = null;
    
    this.datetime = null;
    
    this.update = function(time)
    {
        this.datetime = new Date();
    };
    
    this.render = function()
    {
		this.convergame.text(40, 60, "#ffffff", 20, "sans-serif", "left", this.datetime, true, 2, 2, "#000000");
    };
    
    this.init = function(convergame)
    {
        this.convergame = convergame;
    };
}
