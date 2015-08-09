var Bullet = Bullet || {};

function Bullet(x, y, image, width, height) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = width;
  this.height = height;

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
    this.x += 512 * modifier;
  }
  this.draw = function() {
    ctx.drawImage(this.image, parseInt(this.x + this.width, 10), parseInt(this.y, 10), parseInt(this.width, 10), parseInt(this.height, 10));
  }
}
