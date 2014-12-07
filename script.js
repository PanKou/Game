var dt = 1 / 100;
var fps = 1000;
 
var player_image = new Image();
player_image.src = "spritef.png";
player_points = 0;
player_xvel = 0;
player_yvel = 0;
player_x = 350;
player_y = 500;
player_w = 50;
player_h = 100;
var moveright = false;
var moveleft = false;
var movedown = false;
var moveup = false;
var screenx = 0;
var coincon = false;
 
function scaninput(e) {
    if (window.event) {
        keypress = e.keyCode;
    } else if (e.which) {
        keypress = e.which;
    }
    switch (keypress) {
    case 38: //Up key
//        console.log("you pressed up");
        moveup = true;
        player_image.src = "spriteb.png";
        break;
    case 39: //Right key
//        console.log("you pressed right");
        moveright = true;
        player_image.src = "spriter.png";
        break;
    case 37: //Left Key
//        console.log("you pressed left");
        moveleft = true;
        player_image.src = "spritel.png";
        break;
    case 40: //Down Key
//        console.log("you pressed down");
        movedown = true;
        player_image.src = "spritef.png";
        break;
    }
}
 
function stopmove(e) {
    if (window.event) {
        keyup = e.keyCode;
    } else if (e.which) {
        keyup = e.which;
    }
    switch (keyup) {
    case 38: // Up
        moveup = false;
        break;
    case 39: // Right
        moveright = false;
        break;
    case 37: // Left
        moveleft = false;
        break;
    case 40: //Down
        movedown = false;
        player_image.src = "spritef.png";
        break;
    }
}
 
var update = function () {
 
    if (moveright) {
        player_xvel = 100
    }
    if (moveleft) {
        player_xvel = -100
    }
    if (!moveleft && !moveright) {
        player_xvel = 0
    }
    if (moveup) {
        player_yvel = -100
    }
    if (movedown) {
        player_yvel = 100
    }
    if (!moveup && !movedown) {
        player_yvel = 0
    }
    player_x = player_xvel * dt + player_x;
    player_y = player_yvel * dt + player_y;
    if (player_x > 800){
        player_x = 0;
        screenx++;
    }
    if (player_x < 0){
        player_x = 800;
        screenx--;
    }
};

function collrect(x, y, w, h){
    
    if(player_x > x - player_w && player_x < (x+w)){
        if (player_y > y) {
        player_y = y;
        player_yvel = 0;
    }
      }
      if(player_y < y - h){
      }
      if(player_y === y - h){
      }
     else{
      if(player_y < 540){
        if(player_y + h === y){
        }
    }
  }
}

function coin(x, y, w, h){
  if(player_x > x - player_w && player_x < (x+w)){
    coincon = true;
    moveright = false;
    moveleft = false;
    moveup = false;
    alert("Thanks for testing out my broken physics engine!");
  }
}
function draw() {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 800, 600); //Draws white background

    
    if (screenx < -1){
    screenx = -1;
    }
    if (screenx > 4){
    screenx = 4;
    }
   
   //draw background 
    switch (screenx) {
      case -1:
        context.fillStyle = "#ff0000";
        context.fillRect(0, 0, 800, 600);

        break;    
      case 0:
        context.font = "24px Arial";
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.fillText("Use the arrow keys to go right!", 300, 300);
        break;
      case 1:
        context.fillStyle = "#000000";
        context.fillRect(200, 500, 400, 40);
        collobs(200, 500, 400, 40);
        context.fillRect(250, 450, 100, 50);
        collobs(250, 450, 100, 50);
        break;
      case 2:
        context.fillStyle = "#000000";
        context.fillRect(200, 500, 400, 40);
        collobs(200, 500, 400, 40);
        context.fillRect(250, 450, 350, 50);
        collobs(250, 450, 350, 50);
        context.fillRect(300, 400, 300, 50);
        collobs(300, 400, 300, 50);
        context.fillRect(350, 350, 250, 50);
        collobs(350, 350, 250, 50);
        break;
       case 3:
        context.fillStyle = "#000000";
        context.fillRect(500, 300, 100, 700);
        collobs(500, 300, 100, 700);
        if(!coincon){
          context.font = "24px Arial";
          context.fillStyle = "rgba(255, 255, 255, 0.8)";
          context.fillText("Climb the tower to grab the coin!", 300, 300);
          context.fillStyle = "#ffff00";
          context.fillRect(525, 200, 50, 50);
          coin(525, 200, 50, 50);
          }
          break;
          
        case 4:
         context.font = "24px Arial";
         context.fillStyle = "rgba(255, 255, 255, 0.8)";
         context.fillText("There is nothing else here for now.", 300, 300);
        
        break;
    }
     
    //Draw player
    context.save();
    context.translate(player_x, player_y);
    context.drawImage(player_image, 0, -(player_h));
    context.restore();
}
 
function run() {
    update();
    draw();
//    console.log("x,y" + player_x + ", " + player_y + " xvel:" + player_xvel + " yvel:" + player_yvel + "ground? " + ground);
}
 
_intervalId = setInterval(run, 1000 / fps);