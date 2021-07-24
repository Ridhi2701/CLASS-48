var player,playerImg;
var ground,groundImg;
var stone,stoneImg,stoneGroup;
var key, keyImg1,keyImg2,keyGroup;
var glassImg,glovesImg;
var gameState= "play"
var playerEnd;
var gameOver,gameOverImg;
var edges;
var score;

function preload(){
  playerImg= loadAnimation("Player/sprite0.png","Player/sprite1.png","Player/sprite2.png","Player/sprite3.png","Player/sprite4.png","Player/sprite5.png","Player/sprite6.png","Player/sprite7.png")
  groundImg= loadImage("ground (1).jpg");
  stoneImg=loadImage("stone.png");
  keyImg1= loadImage("Key.png");
  keyImg2= loadImage("Key1.png");
  glovesImg= loadImage("gloves.png");
  glassImg=loadImage("glass.png");
  playerEnd=loadAnimation("Player/sprite3.png");
  gameOverImg=loadImage("game over.png");
}
function setup() {
  createCanvas(450,550);

  ground= createSprite(200,200,800,600);
  ground.addImage(groundImg);
  ground.scale=1;
  

  player=createSprite(200, 100, 50, 50);
  player.addAnimation("play",playerImg);
  player.addAnimation("end",playerEnd);
  player.scale=0.5;
  player.debug=false;
  player.setCollider("rectangle",0,0,50,20)

  gameOver= createSprite(225,250);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  gameOver.scale=1;

  edges=createEdgeSprites();

 stoneGroup= new Group();
 keyGroup= new Group();
 score=0;
}

function draw() {
  background("lightblue");
  if(gameState==="play"){
    //score=score+Math.round(getFrameRate()/60);
    ground.velocityY=-(6+(2*score)/200);

  if(ground.y<400){
    ground.y=ground.height/2
  }  
  if(keyDown("right")){
    player.x=player.x+1;
  }
  if(keyDown("left")){
    player.x=player.x-1;
  }
  player.collide(edges);
  spawnStones();
  spawnKeys();
  if(keyGroup.isTouching(player)){
    score=score+1
    keyGroup.destroyEach();
  }
  if(stoneGroup.isTouching(player)){
    gameState="end";
  }
} else if(gameState==="end"){
  gameOver.visible=true;
  player.velocityX=0;
  player.velocityY=0;
  ground.velocityY=0;
  stoneGroup.destroyEach();
  keyGroup.destroyEach();
  player.changeAnimation("end",playerEnd);
}
  drawSprites();
  stroke("white");
  textSize(15);
  fill(0);
  text("Score: "+score ,350,30);

}

function spawnKeys(){
  if(frameCount%100===0){
    key= createSprite(random(100,350),550,10,10);
    var rand=Math.round(random(1,4));
    switch(rand){
      case 1 : key.addImage(keyImg1);
      break;
      case 2 : key.addImage(keyImg2);
      break;
      case 3 : key.addImage(glassImg);
      break;
      case 4 : key.addImage(glovesImg);
      break;
      default: break
    }
    key.velocityY=-6;
    key.scale=0.1;
    key.lifetime=600;
    keyGroup.add(key);
  }
}
function spawnStones(){
  if(frameCount%200===0){
    stone= createSprite(random(100,350),550,10,10);
    stone.addImage(stoneImg);
    stone.velocityY=-(6+score/300);
    stone.scale=0.1;
    stone.lifetime=600;
    stoneGroup.add(stone);
    stone.debug=false;
  }
}