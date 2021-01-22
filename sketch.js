var PLAY = 1;
var END = 0;
var gameState = 1;
var gameOver ,gameOverImage;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var cashG,diamondsG,jwelleryG,swordGroup;
var treasureCollection = 0;
var score;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
    path=createSprite(200,200);
    path.addImage(pathImg);

    //creating boy running
    boy = createSprite(70,330,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08
    cashG=new Group();
    diamondsG=new Group();
    jwelleryG=new Group();
    swordGroup=new Group();

    boy.setCollider("circle",0,0,600);
      //boy.debug = true

    score = 0
}

function draw() {

  background(0);
  
 
  
  console.log("this is ",gameState)
  edges= createEdgeSprites();
  
  if(gameState===PLAY){
    boy.x = World.mouseX;
    
     if(path.y > 400 ){ path.y = height/2; }
    path.velocityY = 10
    
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) {
      treasureCollection=treasureCollection+50;
      cashG.destroyEach();
    }
    if (diamondsG.isTouching(boy)) {
      treasureCollection=treasureCollection+100;
      diamondsG.destroyEach();
      
    }
    if(jwelleryG.isTouching(boy)) {
      treasureCollection=treasureCollection+150;
      jwelleryG.destroyEach();
    }
    
    if(swordGroup.isTouching(boy)){
      gameState=END;
    }
    
  }
  else if(gameState===END){
    boy.velocityY=0;
    path.velocityY = 0;
    cashG.setVelocityYEach(0);
    cashG.setLifetimeEach(-1);
    diamondsG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setVelocityYEach(0);
    swordGroup.setLifetimeEach(-1);
  }
  

  drawSprites();
  
  textSize(20);
  fill("yellow");
  text("Treasure: "+ treasureCollection,250,30);
  
  if(gameState===END){
    endImage=createSprite(200,200);
    endImage.addAnimation("gameOver",endImg);
  }
}
function createCash() {
  if (World.frameCount % 50 == 0) {
      var cash = createSprite(Math.round(random(50, 350),40,     10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
   if (World.frameCount % 100 == 0) {
      var diamonds = createSprite(Math.round(random(50,          350),40, 10, 10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 3;
      diamonds.lifetime = 150;
      diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 200 == 0) {
      var jwellery = createSprite(Math.round(random(50,            350),40, 10, 10));
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.velocityY = 3;
      jwellery.lifetime = 150;
      jwelleryG.add(jwellery);
  }
}
  
function createSword(){
  if (World.frameCount % 250 == 0) {
      var sword = createSprite(Math.round(random(50,              350),40, 10, 10));
       sword.addImage(swordImg);
       sword.scale=0.1;
       sword.velocityY = 3;
       sword.lifetime = 150;
       swordGroup.add(sword);
   }
}  