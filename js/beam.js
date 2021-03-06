var speed = 12;
var angle = 0;

function charBeam() {
  this.x = 9999;
  this.y = 9999;
  this.speedX = 0.0;
  this.speedY = 0.0;
  this.n = 0;
  this.screen = " ";
  this.c = " ";
  this.launch = function(kc,sc){
    this.n = numByKc(kc);
    this.c = charByKc(kc);
//    console.log(n);
    this.x = keys[this.n].x + 6;
    this.y = keys[this.n].y + 70;
    this.speedX = speed * Math.sin(angle);
    this.speedY = -1.0 * speed * Math.cos(angle);
    this.screen = sc;
  }
  this.move = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    if ((this.y < 0)&&(this.screen == "near")) {
      this.moveFar();
    }
    //console.log(this.x);
  }
  this.receive = function(x,speedX,speedY,c){
    this.x = x;
    this.y = 800;
    this.speedX = speedX;
    this.speedY = speedY;
    this.c = c;
  }

  this.display = function(){
    textSize(64);
    text(this.c,this.x,this.y);
  }

  this.moveFar = function(){
    var data = {x:this.x, y:this.y, speedX:this.speedX, speedY:this.speedY, char:this.c};
    this.x = 9999;
    this.y = 9999;
    this.screen = "far";
  }
}
