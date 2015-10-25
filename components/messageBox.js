function ConvergameMessageBox() {
  this.convergame = null;
  
  this.init = function(convergame)
  {
    this.convergame = convergame;
  };
  
  this.alert = function(title, message, okFunction, cancelFunction)
  {
    smalltalk.alert(title, message, okFunction, cancelFunction);
  };
  
  this.confirm = function(title, message, okFunction, cancelFunction)
  {
    smalltalk.confirm(title, message, okFunction, cancelFunction);
  };
  
  this.prompt = function(title, message, okFunction, cancelFunction)
  {
    smalltalk.prompt(title, message, okFunction, cancelFunction);
  };
  
}
