var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(600,600, {BackgroundColor: 0x3344ee});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
PIXI.loader.add("assets.json").load(ready);
// load in the image
var start_button = PIXI.Texture.fromImage("start_button.png");
var ship = PIXI.Texture.fromImage("ship.png");
var background = PIXI.Texture.fromImage("stars.png");
//save the different scenes
var scene1 = new PIXI.Container();
var scene2 = new PIXI.Container();
//create sprites
var button = new PIXI.Sprite(start_button);
var player = new PIXI.Sprite(ship);
var stars= new PIXI.Sprite(background)

var current_screen = new PIXI.Container();
var still= new PIXI.Sprite(PIXI.Texture.fromFrame('ship_sprite_sheet1'));
var moving= new PIXI.Sprite(PIXI.Texture.fromFrame('ship_sprite_sheet2'));
player = still;
scene2.addChild(stars);
scene1.addChild(button);
scene2.addChild(player);
stage.addChild(scene1);
stage.addChild(scene2);
current_screen = scene1;
function change_ship()
{
 var frames = [];
  for(var i = 1; i<=2; i++)
    frames.push(PIXI.Texture.fromFrame('ship_sprite_sheet'+i+'.png'));
  }
flying= new PIXI.extras.MovieClip(frames);
flying.position.x = player.position.x;
flying.position.y = player.position.y;
flying.animationSpeed = 0.1;
flying.play();
stage.addChild(flying);
}
function mouseHandler(e)
{
  current_screen = scene2;
  animate_game();

}
function mouseHandler2(e)
{
  var xpos = e.clientX -20 ;
  var ypos = e.clientY +80;
  change_ship();
  createjs.Tween.get(player.position).to({x: xpos, y:ypos}, 1000);
  change_ship();
}
var timertext = new PIXI.Text('60');


player.position.x = 300;
player.position.y = 560;
document.addEventListener('mousedown',mouseHandler2,false);
button.interactive = true;
button.on('mousedown', mouseHandler);
button.position.x = 200;
button.position.y = 200;
document.addEventListener('keydown', onKeyDown);
if(current_screen == scene1)
{
  animate_start_screen();
}else
{
  animate_game();
}
function animate_start_screen()
{
 renderer.render(scene1);
 requestAnimationFrame(animate_start_screen);
}
function animate_game()
{
  renderer.render(scene2);
  requestAnimationFrame(animate_game);
}
function onKeyDown(key)
{
 if(key.keyCode ===87 || key.keyCode === 38)
 {
   //checks to make sure you arent at the edge of the world
   if(player.position.y != 0)
   {
     player.position.y -=20;

   }
 }
   if (key.keyCode === 83 || key.keyCode === 40)
   {
       //checks to make sure you arent at the edge of the world
       if(player.position.y != 560)
       {
           player.position.y += 20;
       }

   }
   //65 and 37 are A and the left arrow in ascii
   if (key.keyCode === 65 || key.keyCode === 37)
   {
       //checks to make sure you arent at the edge of the world
       if (player.position.x != 0)
       {//moves player
           player.position.x -= 20;
       }
   }

   // D Key is 68
   // Right arrow is 39
   if (key.keyCode === 68 || key.keyCode === 39)
   {
       //checks to make sure you arent at the edge of the world
       if (player.position.x != 560)
       {
           // Don't move to the right if the player is at the right side of the stage
           player.position.x += 20;
       }
   }//end of keydown
}
