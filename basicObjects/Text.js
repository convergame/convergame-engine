function Text() {

  this.convergame = null;

  this.x = 0;
  this.y = 0;

  this.style = "#000000";
  this.font = "Arial, Helvetica, Sans-Serif";
  this.fontSize = 40;
  this.align = "left";

  this.text = 'Text';

  this.render = function()
  {
    this.convergame.draw.text(this.x, this.y, this.style, this.fontSize, this.font, this.align, this.text, false, null, null, null);
  };

  this.init = function(convergame, x, y, text)
  {
      this.convergame = convergame;
      this.x = x;
      this.y = y;
      this.text = text;
  };

}
