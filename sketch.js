//creating gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;


//creating variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var gameOverImage, refreshImage;
var score;

function preload()
{   
//loading monkey Animation
monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

//loading banana Image
bananaImage = loadImage("banana.png");
  
//loading obstacle Image
obstacleImage = loadImage("obstacle.png");
  
//loading gameOver Image
gameOverImage = loadImage("gameOver.png");

//loading refresh Image
refreshImage = loadImage("refresh.png");
 
}


function setup() 
{
  createCanvas(600,400);
  
  var message = "Creating Monkey";
  console.log(message);

  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  //creating gameover
  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImage);
  
  //creating refresh
  refresh = createSprite(300,200);
  refresh.addImage(refreshImage);
  
  //creating scales of gameover and refresh
  gameOver.scale = 0.9;
  refresh.scale = 1.4;
  
  //create obstacle and banana group
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //creating collider
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  score = 0;
  
}


function draw() 
{
  background("lightgreen");
  
  var survivalTime=0;
  
  
  if (gameState === PLAY)
{
  
  //making gameover and refresh invisible during playState
  gameOver.visible = false;
  refresh.visible = false;
  
  //creating ground velocity
  ground.velocityX = -(4 + 3* score/100);
 
  
  //creating score
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: " + score, 500,50)
  
  //creating survivalTime
  stroke("white");
  textSize(20); 
  fill("blue");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 200, 50);
  
  if (ground.x <200)
{
  ground.x = ground.width/2;  
}
 
  if (keyDown("space") && monkey.y >= 100)
{
  monkey.velocityY = -12;
}
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //creating obstacles function
  Obstacles();
  
 //creating food function
  Food();
  
  if (obstacleGroup.isTouching(monkey))
{
  gameState = END;
}
  
}  
  
  else if (gameState === END)
{
  
  //making gameover and refresh visible during playState
  gameOver.visible = true;
  refresh.visible = true;
  
  //making velocity of ground and monkey as 0
  ground.velocityX = 0;
  monkey.velocityY = 0;
  
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  
}
  
  if (monkey.isTouching(foodGroup))
{
  foodGroup.destroyEach();
  score = score+1;
}
  
  if (monkey.isTouching(obstacleGroup))
{
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  ground.visible = false;
  monkey.visible = false;
}  
  
  monkey.collide(ground);
  
  
drawSprites();
}


function Obstacles()
{
 if (frameCount % 300 === 0)
{
  var obstacle = createSprite(600,323,10,40);
  obstacle.velocityX = -(6 + score/100);
  
  
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.lifetime = 300;
  
  obstacleGroup.add(obstacle);
  
}

}

function Food()
{
  if (frameCount % 80 === 0)
{
  var banana = createSprite(600,230,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
  
  banana.setlifetime = 200;
  
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth+1;

  foodGroup.add(banana);
  
}
   
}






