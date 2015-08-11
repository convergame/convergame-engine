var Convergame = Convergame || {}, canvas = document.getElementById("game"), ctx = canvas.getContext("2d"), convergame = new Convergame();
function Convergame() {
  var screenScale, hasGP = false, repGP, axes;

  this.getCanvasWidth = function(){
    return canvas.width;
  }
  this.getCanvasHeight = function(){
    return canvas.height;
  }
  this.setCanvasWidth = function(){
    canvas.width = canvas.parentNode.offsetWidth ;
  }
  this.setCanvasHeight = function(){
    canvas.height = canvas.parentNode.offsetHeight;
  }
  this.init = function() {
    this.setCanvasWidth();
    this.setCanvasHeight();
    document.getElementById('body').style.padding = '0';
    document.getElementById('body').style.margin = '0';
    //this.include('/js/webfonts.js');
    //this.include('/js/convergame-touch.js');
  }
  this.fullscreen = function(){
    if(canvas.requestFullScreen) {
      canvas.requestFullScreen();
    } else if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
    } else if(canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else {
      alert('Error: Fullscreen mode not supported by your browser. Please upgrade and try again!');
    }
  }
  this.resize = function() {
    canvas.setAttribute("width",parseInt(canvas.parentNode.offsetWidth, 10));
    canvas.setAttribute("height",parseInt(canvas.parentNode.offsetHeight, 10));
  }
  this.doEvent = function(element, ev, func) {
    /*ToDo: Return avaiable controls */
    /*ToDo: Add Event listeners to functions to different control tests*/
    element.addEventListener(""+ ev +"", func);
  }
  this.setPixelGame = function(){
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }
  this.getScreenScale = function(){
    //Multiply image width and height to the screen scale value as suggested: http://stackoverflow.com/a/27732737
    screenScale = Math.min((convergame.getCanvasWidth() / 1920) + (convergame.getCanvasHeight() / 1080)) / 2;
    return screenScale;
  }
  this.random = function(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  }

  this.sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  this.isCollide = function(object1, object2) {
    if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
        object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      return true;
    } else {
      return false;
    }
  }
  /*Gamepad*/
  function canGamepads() {
        return "getGamepads" in navigator;
    }

    function reportOnGamepad() {
        var gp = navigator.getGamepads()[0];
        var html = "";
            html += "id: "+gp.id+"<br/>";

        for(var i=0;i<gp.buttons.length;i++) {
            html+= "Button "+(i+1)+": ";
            if(gp.buttons[i].pressed) html+= " pressed";
            html+= "<br/>";
        }

        for(var i=0;i<gp.axes.length; i+=2) {
            html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
        }

        $("#gamepadDisplay").html(html);
    }


    this.fetchGamepad = function() {

        if(canGamepads()) {

            var prompt = "To begin using your gamepad, connect it and press any button!";
            console.log(prompt);

            $(window).on("gamepadconnected", function() {
                hasGP = true;
                console.log("Gamepad connected!");
                //console.log("connection event");
                repGP = window.setInterval(reportOnGamepad,100);
            });

            $(window).on("gamepaddisconnected", function() {
                console.log("Gamepad disconnected!");
                $("#gamepadPrompt").text(prompt);
                window.clearInterval(repGP);
            });

            //setup an interval for Chrome
            var checkGP = window.setInterval(function() {
                console.log('checkGP');
                if(navigator.getGamepads()[0]) {
                    if(!hasGP) $(window).trigger("gamepadconnected");
                    window.clearInterval(checkGP);
                }
            }, 500);
        }

    }
    this.getControllerAxis = function() {

        gp = navigator.getGamepads()[0];
         axes = gp.axes[0];
         return axes;

    }
  
  this.loadScene = function(url, element) {

    console.log('Element: ' + element);
      element = typeof element !== 'undefined' ?  element : 'game';
      element = document.getElementById(""+element+"");
      console.log('Element: ' + element);
      req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.send(null);
      element.innerHTML = req.responseText; 
    }

  this.include = function(dir) {
    var include = document.createElement('script');
    include.src = ''+ dir +'';
    include.type = 'text/javascript';
    document.body.appendChild(include);
  }

  this.preShake = function() {
    ctx.save();
    var dx = Math.random()*8;
    var dy = Math.random()*8;
    ctx.translate(dx, dy);
  }

  this.postShake = function() {
    ctx.restore();
  }


  /*Virtual Controls*/
  this.vkUp = function() {
    //13
    gp = navigator.getGamepads()[0];
    if(typeof gp != 'undefined') {


      if(gp.buttons[12].pressed == true) {
        return true;
      } else {
        return false;
      }
    }


  }
  this.vkDown = function() {
    //assign to key 14
    gp = navigator.getGamepads()[0];
    if(typeof gp !== 'undefined') {
      gp = navigator.getGamepads()[0];

      if(gp.buttons[13].pressed == true) {
        return true;
      } else {
        return false;
      }
    }
  }
  this.vkLeft = function() {
    //assign to key 15
    gp = navigator.getGamepads()[0];
    if(typeof gp !== 'undefined') {
      gp = navigator.getGamepads()[0];

      if(gp.buttons[14].pressed == true) {
        return true;
      } else {
        return false;
      }
    }

  }
  this.vkRight = function() {
    //assign to key 16
    gp = navigator.getGamepads()[0];
    if(typeof gp !== 'undefined') {
      gp = navigator.getGamepads()[0];

      if(gp.buttons[15].pressed == true) {
        return true;
      } else {
        return false;
      }
    }

  }
  this.vkStart = function() {
    //assign to key

  }
  this.vkBtn1 = function() {
    gp = navigator.getGamepads()[0];
    if(typeof gp !== 'undefined') {
      gp = navigator.getGamepads()[0];

      if(gp.buttons[0].pressed == true) {
        return true;
      } else {
        return false;
      }
    }

    //assign to key
  }
  this.vkBtn2 = function() {
    //assign to key
  }
  this.vkBtn3 = function() {
    //assign to key
  }
  this.vkBtn4 = function() {
    //assign to key
  }
  this.vkBtnL = function() {
    //assign to key
  }
  this.vkBtnR = function() {
    //assign to key
  }
  //$( ".game" ).load( "scenes/splash.html" );
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

canvas.ondragstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
}

// do nothing in the event handler except canceling the event
canvas.onselectstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
}
