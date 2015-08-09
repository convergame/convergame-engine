var Rock = Rock || {};

function Rock(x, y, image, width, height, speed) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = width;
  this.height = height;
  this.speed = speed;
  /*Get & Set Position*/
  this.getX = function() {
    return this.x;
  }

  this.setX = function(x) {
    this.x = x;
  }

  this.getY = function() {
    return this.y;
  }

  this.setY = function(y) {
    this.y = y;
  }
  this.update = function(modifier) {
    this.x -= this.speed * modifier;
  }
  this.draw = function() {
    ctx.drawImage(this.image, parseInt(this.x, 10), parseInt(this.y, 10), parseInt(this.width, 10), parseInt(this.height, 10));
  }
}
