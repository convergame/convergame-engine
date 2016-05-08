function Sprite() {

  this.convergame = null;

  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0; 
  this.imagePath = null;

  this.render = function()
  {
    this.convergame.draw.image(this.imagePath, this.x, this.y, this.width, this.height);
  };

  this.setWidth = function (width) 
  {
    this.width = width;
  }
  this.setHeight = function(height)
  {
    this.height = height;
  }
  this.setX = function(x)
  {
    this.x = x;
  };

  this.setY = function(y)
  {
    this.y = y;
  };

  this.setImagePath = function(imagePath)
  {
    this.imagePath = imagePath;
  };

  this.getWidth = function()
  {
    return this.width;
  }

  this.getHeight = function()
  {
    return this.height;
  }

  this.getX = function()
  {
    return this.x;
  };

  this.getY = function()
  {
    return this.y;
  };

  this.getImagePath = function()
  {
    return this.imagePath;
  };

  this.init = function(convergame, x, y, width, height, imagePath)
  {
      this.convergame = convergame;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.imagePath = imagePath;
  };

}
