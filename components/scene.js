function ConvergameScene() {
	this.convergame = null;
	this.currentScene = null;
	this.persistentScenes = [];
	this.controlsMap = {};
  	
  	this.init = function(convergame)
    {
        this.convergame = convergame;
    };
  	
  	this.sceneCheck = function() {
      if (typeof this.currentScene !== 'object') {
        console.log('You must set a scene using the convergame.scene.changeScene method.');
        return false;
      }
      return true;
    };

	this.changeScene = function(scene) {
	    // Ensuring control presses do not carry over to next scene
	    this.convergame.input.controlsMap = {};
	    // Switch scene
	    this.currentScene = scene;
	    // Run scene initialisation
	    this.convergame.scene.currentScene.init(this.convergame);
	  };
	  
	  this.addPersistentScene = function(sceneObject) {
	    // Run scene initialisation
	    sceneObject.init(this);
	    
	    // Add scene to persistentScenes array
	    this.persistentScenes.push(sceneObject);
	  };
	  
	  this.removePersistentScene = function(sceneObject) {
	    // Remove scene from persistentScenes array
	    var index = this.persistentScenes.indexOf(sceneObject);
	    this.persistentScenes.splice(index, 1);
	  };
}
