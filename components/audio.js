function ConvergameAudio() {
  this.convergame = null;
  
  this.init = function(convergame)
  {
    this.convergame = convergame;
  };
  this.load = function(snd, dir, loop) {
    //Ver 2 Todo: Use split on the '/' & canPlayType for fallback for other formats
    if(typeof loop === 'undefined'){loop = false}
    snd = new Audio(''+dir+'');
    if(loop === true) {snd.loop = true;}
    return snd;
  };
  this.play = function(snd) {
    return snd.play();    
  }
  this.pause = function(snd) {
    return snd.pause();
  }
}
