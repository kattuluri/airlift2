var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var boxTouch=0

var game = 1;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 800);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(400,780,800,20);
	groundSprite.shapeColor="tan";
	groundSprite.depth = packageSprite.depth;
    packageSprite.depth = packageSprite.depth+1;


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:3, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 690, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  textSize(21);
  text("Use Down Arrow to Drop the Package",210,100);
  
 
  if(packageSprite.isTouching(groundSprite)){
	boxTouch = boxTouch+4;
  }
  if(boxTouch === 4){
	packageSprite.scale = 0.24;
  }

  if(boxTouch === 9){
	 packageSprite.scale = 0.28;
  }

  if(boxTouch === 14){
	 packageSprite.scale = 0.32;
  }

  if(boxTouch === 19){
	 Body.setStatic(packageBody, true);
	 game = 0;
  }
  drawSprites();
}



function keyPressed() { 
  if (keyCode === DOWN_ARROW && game == 1) {
	Matter.Body.setStatic(packageBody,false); 
  }
} 
