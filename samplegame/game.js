//ToDo: Move this once ID creation has been set up in the DB?

function getPath() {
  var script = document.currentScript, fullUrl = script.src;
  fullUrl = fullUrl.replace("game.js", "");
  return fullUrl;
}

//All this needs to move to init();
convergame.init();
convergame.include(getPath()+'inc/webfonts.js');
convergame.include(getPath()+'inc/classes/player.js');
convergame.include(getPath()+'inc/classes/bullet.js');
convergame.include(getPath()+'inc/classes/comet.js');
var playerHit = false, backgroundShake = false, musPause = false, playerWidth, playerHeight, cometWidth, cometHeight, cometRotate = 0, canFire = true, points = 0, sndHurt, sndComet, sndBullet, musBackground;
sndBullet = new Audio(getPath()+"snd/sndBullet.wav");
sndComet = new Audio(getPath()+"snd/sndComet.wav");
sndHurt = new Audio(getPath()+"snd/sndShip.wav");
musBackground = new Audio(getPath()+"snd/bg.mp3");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = getPath()+"images/bg.png";


var playerReady = false, playerImage = new Image();
playerImage.src = getPath()+"images/ship0.png";
playerImage.onload = function () {
  playerReady = true;
  playerWidth = (playerImage.width / 2) * convergame.getScreenScale();
  playerHeight = (playerImage.height / 2) * convergame.getScreenScale();
}

// comet image
var cometReady = false;
var cometImage = new Image();
cometImage.src = getPath()+"images/comet.png";
cometImage.onload = function () {
  cometReady = true;
  cometWidth = (cometImage.width * 2) * convergame.getScreenScale();
  cometHeight = (cometImage.height * 2) * convergame.getScreenScale();

};

// bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.src = getPath()+"images/bullet.png";
bulletImage.onload = function () {
  bulletReady = true;
  bulletWidth = (bulletImage.width / 2) * convergame.getScreenScale();
  bulletHeight = (bulletImage.height / 2) * convergame.getScreenScale();
};

var bullets = [], comets = [], cometsCaught = 0, keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

function spawnComet(num) {
  for(var c = 0;  c < num;  c++) {
    var random = convergame.random(64, canvas.height);
    var randSpeed = convergame.random(256, 512);
    comet = new Rock(canvas.width, random, cometImage, cometWidth, cometHeight, randSpeed);
    comets.push(comet);
  }
}


// Init the game
var init = function () {
  convergame.loadScene('scenes/test.html');
  player = new Player(canvas.width / 4, canvas.height / 2, playerImage, playerWidth, playerHeight, 256);
  musBackground.play();
  musBackground.loop = true;
  player.setHealth(100);
  spawnComet(10);
  convergame.fetchGamepad();
};

// Update game objects
var update = function (modifier) {
  if(player != null && player.getHealth() <= 0) {

    player.setHealth(0);
    playerReady = false;
    playerImage = null;
    player = null;
    comets = null;
    delete player;
    delete comets;
    delete playerImage;

    gameover();
  }
  if (playerReady == true && player != null) {
    player.update();

    if (38 in keysDown || convergame.vkUp()  == true) { // Player holding up
      player.y -= player.ay + player.fric * player.vy  * modifier;
    }
    if (40 in keysDown || convergame.vkDown() == true) { // Player holding down
      player.y += player.ay + player.fric * player.vy  * modifier;
    }
    if (37 in keysDown || convergame.vkLeft() == true) { // Player holding left
      player.x -= player.ax + player.fric * player.vx  * modifier;
    }
    if (39 in keysDown || convergame.vkRight() == true) { // Player holding right
      player.x += player.ax + player.fric * player.vx  * modifier;
    }
    if (77 in keysDown) { // Player holding right
      if(musPause == false) {
        musBackground.pause();
        musPause = true;
      } else if(musPause == true) {
        musBackground.play();
        musPause = false;
      }

    }
    if ((32 in keysDown  || convergame.vkBtn1() && canFire == true) && canFire == true) { // Player holding Space
      //player.setSpeed(150);
      createBullet();
      canFire = false;
    }
    if ((32 in keysDown == false && !convergame.vkBtn1()) && canFire == false) { // Player holding Space

      canFire = true;

      //player.setSpeed(256);
    }
    //for (var i = 0, ii = bullets.length; i < ii; i++) {
    for(var b=0;b < bullets.length; b++) {

      bullets[b].update(modifier);


      for(var c=0;c < comets.length; c++) {
        if (bullets[b] != null && convergame.isCollide(comets[c], bullets[b])) {
          convergame.sleep(20);
          sndComet.play();

          bullets.shift(bullets[b]);
          comets[c].x = canvas.width;
          comets[c].y = convergame.random(64, canvas.height - comets[c].height);
          points += 2;
        }
      }

      if(bullets[b] != null && bullets[b].x > canvas.width ) {
         bullets.shift(bullets[b]);
      }

    }


    for(var c=0;c < comets.length; c++) {
      comets[c].update(modifier);
      if(comets[c].x < -64) {
        comets[c].x = canvas.width;
        comets[c].y = convergame.random(64, canvas.height - comets[c].height);
      }

      /*If Player collides with comet*/
      if (convergame.isCollide(player, comets[c])) {
        convergame.sleep(20);
        playerHit = true;
        backgroundShake = true;
        sndHurt.play();
        comets[c].x = canvas.width;
        comets[c].y = convergame.random(64, canvas.height - comets[c].height);
        player.setHealth(player.getHealth() - 10);
        spawnComet(1);
      }

    }


  }
};

function createBullet() {
  bullet = new Bullet(player.x + (playerWidth / 2), (player.y + playerHeight) - bulletHeight * 2, bulletImage, bulletWidth, bulletHeight);
  sndBullet.play();
  bullets.push(bullet);
};

var gameover = function() {
  // Score
  ctx.font = "" + 48 * convergame.getScreenScale() + "px Orbitron, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.fillStyle = "#E42";
  ctx.fillText("- GAME OVER - ", canvas.width / 2, canvas.height / 4);
  ctx.fillStyle = "#ED2";
  ctx.fillText("- GAME OVER - ", canvas.width / 2, canvas.height / 4 - 2);

  ctx.fillStyle = "#E42";
  ctx.fillText("FINAL SCORE: " + points, canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "#ED2";
  ctx.fillText("FINAL SCORE: " + points, canvas.width / 2, canvas.height / 2 - 2);

}

var render = function () {
 if(player != null) {


  if (bgReady && backgroundShake == false) {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  } else if(backgroundShake == true) {
    convergame.preShake();
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    convergame.postShake();
    setTimeout(function () { backgroundShake = false;}, 500);
  }
  for(var bd=0;bd < bullets.length; bd++) {
    bullets[bd].draw();
  }
  for(var c=0;c < comets.length; c++) {
    comets[c].draw();
  }
  if (playerReady && playerHit == false) {
    player.draw();
  } else {

    convergame.preShake();
    player.draw();
    convergame.postShake();
    setTimeout(function () { playerHit = false;}, 1000);

  }

  // Score
  ctx.font = "" + 48 * convergame.getScreenScale() + "px Orbitron, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(20,20,20,0.5)";
  ctx.fillRect(0,0,canvas.width, 62);
  ctx.fillStyle = "#E7D";
  ctx.fillText("CREDITS: " + points, 32, 20);
  ctx.fillStyle = "#FEFEFE";
  ctx.fillText("CREDITS: " + points, 32, 18);
  ctx.fillStyle = "#E7D";
  ctx.fillText("HEALTH: " + player.getHealth(), (canvas.width / 2), 20);
  ctx.fillStyle = "#FEFEFE";
  ctx.fillText("HEALTH: " + player.getHealth(), (canvas.width / 2) , 18);
  }
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;
  var time = delta / 1000;
  update(time);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();

window.onload = function() {
  init();
  main();
}
