var k;
var kc;
var prevKc;
var x,y,w,h;
var dipX = 17;
var dipY = 17;
var origX = 20;
var origY = 300;
var keys = [];
var c;
var offsetX = 2;
var offsetY = 60;
var currentBeam = 0;
var beamNum = 20;
var beams = [beamNum];
var currentColor = 0;

function setup() {
  createCanvas(1280, 800);
  k = "";
  textSize(1);
  c = color(100,200,255);
  //c = red;
  for (var i=0;i<beamNum;i++){
    beams[i] = new charBeam();
  }
}

function draw() {
  background(0);
  set1stKeys();
  set2ndKeys();
  set3rdKeys();
  set4thKeys();
  set5thKeys();
  set6thKeys();
  setEnter();
  fill(0);
  strokeWeight(1);
  stroke(c);
  for(j=0;j<77;j++){
    rect(keys[j].x, keys[j].y, keys[j].w, keys[j].h, 4);
  }
  fill(color(0,0,0));
  strokeWeight(0);
  rect(1120,origY+2*dipY+39+66+1,30,64,4); // Enterキー内の線を削除
  fill(c);
  for (i=0;i<beamNum;i++){
    beams[i].move();
    beams[i].display();
  }

}

function keyPressed() {
  prevKc = kc;
  kc = keyCode;
  if (kc != 13){
    beams[currentBeam].launch(kc, "near");
    currentBeam += 1;
  }
  if (currentBeam >= beamNum){
    currentBeam = 0;
  }
  console.log(kc);
  if (kc == 13){
    changeColor();
    fill(c);
    for(j=0;j<77;j++){
      rect(keys[j].x, keys[j].y, keys[j].w, keys[j].h, 4);
    }
    playAudio('assets/enter.mp3');
  } else {
    var n = numByKc(kc);
    fill(c);
    rect(keys[n].x, keys[n].y, keys[n].w, keys[n].h, 4);
    playAudio('assets/key.mp3');
  }
}

function playAudio(src){
   var audio = new Audio();
   audio.src = src;
   audio.play();
}

function changeColor(){
  switch (currentColor){
    case 0:
      c  = color(255,255,0); //yellow
      currentColor++;
      break;
    case 1:
      c  = color(255,0,0); //red
      currentColor++;
      break;
    case 2:
      c  = color(0,255,0); //white
      currentColor++;
      break;
    case 3:
      c  = color(255,255,255); //blue
      currentColor++;
      break;
    case 4:
      c  = color(100,200,255); //blue
      currentColor = 0;
      break;
  }
}

function set1stKeys(){
  x = origX;
  y = origY;
  w = 70;
  h = 39;
  for(j=0;j<14;j++){
    setKey(j);
  }
}

function set2ndKeys(){
  x = origX;
  y = origY+dipY+39;
  w = 110;
  h = 66;
  setKey(j);
  w = 67;
  for(j=15;j<28;j++){
    setKey(j);
  }
}

function set3rdKeys(){
  x = origX;
  y = origY+2*dipY+39+66;
  w = 67;
  for(j=28;j<41;j++){
    setKey(j);
  }
}

function set4thKeys(){
  x = origX;
  y = origY+3*dipY+39+2*66;
  w = 88;
  keys[j] = {x:x, y:y, w:w, h:h};
  x = x + w + dipX;
  w = 67;
  for(j=42;j<54;j++){
    setKey(j);
  }
}

function set5thKeys(){
  x = origX;
  y = origY+4*dipY+39+3*66;
  w = 130;
  setKey(j);
  w = 67;
  for(j=55;j<66;j++){
    setKey(j);
  }
  w = 130;
  setKey(j);
}

function set6thKeys(){
  x = origX;
  y = origY+5*dipY+39+4*66;
  w = 119;
  h = 75;
  for(j=67;j<69;j++){
    setKey(j);
  }
  w = 88;
  setKey(69);
  w = 277;
  setKey(70);
  w = 88;
  setKey(71);
  w = 119;
  for(j=72;j<74;j++){
    setKey(j);
  }
  w = 154;
  setKey(74);
}

function setEnter(){
  x = 1112;
  y = origY+2*dipY+39+66;
  w = 109;
  h = 66;
  setKey(75);
  x = 1133;
  w = 88;
  h = 149;
  setKey(76);
}

function setKey(index){
  keys[index] = {x:x, y:y, w:w, h:h};
  x = x + w + dipX;
}

function drawVowel(a,i,u,e,o,ltu){
  drawChar(a,keys[42].x, keys[42].y, false);
  drawChar(i,keys[36].x, keys[36].y, false);
  drawChar(u,keys[35].x, keys[35].y, false);
  drawChar(e,keys[31].x, keys[31].y, false);
  drawChar(o,keys[37].x, keys[37].y, false);
  if (0 < ltu) {
    drawChar("っ",keys[ltu].x, keys[ltu].y, false);
  }
}

function drawConsonant(a,i,u,e,o,n){
  var posX = keys[n].x;
  var posY = keys[n].y;
  var t = 21;

  textSize(t);
  // if (false) {
    fill(c);
    // rect(posX,posY,67,66,4);
    // fill(0);
    noStroke();
  // }
  var strs = [a,i,u,e,o];
  for (var i=0; i<3; i++){
    if (strs[i].length > 1){
      textSize(t/2);
    } else {
      textSize(t);
    }
    // text(strs[i],posX+1+(offsetX+t)*i,posY+offsetY/2);
  }
  for (var i=3; i<5; i++){
    if (strs[i].length > 1){
      textSize(t/2);
    } else {
      textSize(t);
    }
    // text(strs[i],posX+1+(offsetX+t)*(i-3),posY+offsetY);
  }
}

function drawChar(str,posX,posY,isFilled){
  if ((str.length > 1)||(str == "っ")||(kc==76)||(kc==88)) {
    textSize(32);
  } else {
    textSize(64);
  }
  if (str.length > 0) {
    if(!isFilled){
      fill(c);
      rect(posX,posY,67,66,4);
      fill(0);
      noStroke();
    }
    // text(str,posX+offsetX,posY+offsetY);
  }
}
