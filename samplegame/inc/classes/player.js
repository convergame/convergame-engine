var Player = Player || {}, player = new Player();
function Player(x, y, image, width, height, speed) {
  //speed: 256; // movement in pixels per second
  var health;
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = width;
  this.height = height;
  this.speed = speed;
  // Collision
  this.cx = 128;
  this.cy = 64;
  this.cw = 128;
  this.cy = 64;

  // Velocity
  this.vx = 200;
  this.vy = 200;

  // Acceleration
  this.ax = 0.02;
  this.ay = 0.02;
  this.fric = 0.8;
  this.getSpeed = function() {
    return this.speed;
  }
  this.setSpeed = function(speed) {
    this.speed = speed;
  }
  this.getHealth = function () {
    return this.health;
  }

  this.setHealth = function(health) {
    this.health = health;
  }
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
  /*Get & Set Velocity*/
  this.getVX = function() {
    return this.vx;
  }

  this.setVX = function(vx) {
    this.vx = vx;
  }

  this.getVY = function() {
    return this.vy;
  }

  this.setVY = function(vy) {
    this.vy = vy;
  }
  /*Get & Set Acceleration*/
  this.getAX = function() {
    return this.ax;
  }

  this.setAX = function(ax) {
    this.ax = ax;
  }

  this.getAY = function() {
    return this.ay;
  }

  this.setAY = function(ay) {
    this.ay = ay;
  }
  this.update = function(modifier) {

  }
  this.draw = function(hit) {

    if (playerReady) {
      /*ctx.fillStyle = "#F0F";
      ctx.fillRect(this.x, this.y, playerWidth, playerHeight);*/
      ctx.drawImage(this.image, parseInt(this.x, 10) , parseInt(this.y, 10) , parseInt(this.width, 10), parseInt(this.height, 10));
    }
  }
}
