function Input() {

  this.convergame = null;

  this.x = 0;
  this.y = 0;

  this.width = 200;
  this.height = 50;

  this.font = "Arial, Helvetica, Sans-Serif";
  this.fontSize = 40;
  this.align = "left";

  this.colour = "#FFF";
  this.backgroundColour = "#000";
  this.borderColour = "#FFF";
  this.borderWidth = 1;

  this.placeholder = '';

  this.id = null;

  this.render = function()
  {
    var x = this.x * this.convergame.draw.getXScale();
    var y = this.y * this.convergame.draw.getYScale();
    var width = this.width * this.convergame.draw.getXScale();
    var height = this.height * this.convergame.draw.getYScale();
    var fontSize = this.fontSize * this.convergame.draw.getXScale();
    var borderWidth = this.borderWidth * this.convergame.draw.getXScale();

    var inputNode = document.getElementById(this.id);

    var style = "position: absolute; top: "+y+"px; left: "+x+"px; ";
    style += "font-family: \""+this.font+"\"; text-align: "+this.align+"; ";
    style += "width: "+width+"px; height: "+height+"px; ";
    style += "font-size: "+fontSize+"px; color: "+this.colour+"; ";
    style += "background-color: "+this.backgroundColour+"; ";
    style += "border-color: "+this.borderColour+"; ";
    style += "border-width: "+borderWidth+"px; ";
    style += "padding: 0px; ";

    inputNode.setAttribute('style', style);
    inputNode.setAttribute('placeholder', this.placeholder);

  };

  this.init = function(convergame, x, y, width, height, placeholder)
  {
      this.convergame = convergame;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.placeholder = placeholder;
      this.id = "input_"+Math.random();

      var inputNode = document.createElement("input");
      inputNode.setAttribute("id", this.id);

      document.getElementsByTagName("body")[0].appendChild(inputNode);
  };

}
