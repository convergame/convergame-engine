function PhysicObject() {

  this.convergame = null;

  this.sprite = null;

  this.gravityForce = 1;
  this.gravityAngle = 1;    // Radians
  this.isObstacle = false;

  this.physicsTimer = 0;
  this.physicsTimerLimit = 0.05;

  this.update = function(time)
  {
    this.physicsTimer += time;

    if (this.physicsTimer > this.physicsTimerLimit) {

      this.physicsTimer = 0;

      // Perform physics actions here and adjust sprite's x and y coordinates

    }

  };

  this.render = function()
  {
    this.convergame.draw.image(this.imagePath, this.x, this.y, this.width, this.height);
  };

  this.init = function(convergame, sprite, gravityForce, gravityAngle, isObstacle)
  {
      this.convergame = convergame;
      this.sprite = sprite;
      this.gravityForce = gravityForce;
      this.gravityAngle = gravityAngle;
      this.isObstacle = isObstacle;
  };

}
