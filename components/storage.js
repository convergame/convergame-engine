function ConvergameStorage() {
  this.convergame = null;
  this.interalPrefix = 'Convergame';
  this.driver = null;
  
  this.init = function(convergame) {
    
    this.convergame = convergame;
    this.setDriverToHTML5LocalStorage();
    
  };
  
  this.setDriver = function(driver) {
    this.driver = driver;
  };
  
  this.setDriverToHTML5LocalStorage = function() {
    this.setDriver('HTML5LocalStorage');
  };
  
  this.isDriverHTML5LocalStorage = function() {
    return (this.driver==='HTML5LocalStorage');
  };
  
  this.getPrefixedKey = function(key) {
      return this.interalPrefix+"_"+key;
  };
  
  this.set = function(key, value) {
    
    key = this.getPrefixedKey(key);
    
    if (this.isDriverHTML5LocalStorage()) {
        localStorage.setItem(key, value);
    }
    
  };
  
  this.get = function(key) {
    
    key = this.getPrefixedKey(key);
    
    if (this.isDriverHTML5LocalStorage()) {
        return localStorage.getItem(key);
    }
    
  };
  
}