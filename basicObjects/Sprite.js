function Sprite() {

  this.convergame = null;

  this.x = 0;
  this.y = 0;

  this.imagePath = null;

  this.render = function()
  {
    this.convergame.draw.image(this.imagePath, this.x, this.y, this.width, this.height);
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
