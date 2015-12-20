function BackgroundMusic()
{	
    this.convergame = null;
    
    this.update = function(time)
    {
        
    };
    
    this.render = function()
    {
		
    };
    
    this.init = function(convergame)
    {
        this.convergame = convergame;
        var bgMusic;
        bgMusic = this.convergame.audio.load(bgMusic, 'https://dl.dropboxusercontent.com/u/6773567/bg.mp3');
        this.convergame.audio.play(bgMusic); // Or just use 'bgMusic.play();'
    };
}
