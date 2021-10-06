const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function preload(){
  bg = loadImage("images/background.png")
  fruitimg = loadImage("images/melon.png")
  bunnyimg = loadImage('images/Rabbit-01.png')
  blinkani = loadAnimation('images/blink_1.png','images/blink_2.png','images/blink_3.png')
  eatani = loadAnimation('images/eat_0.png','images/eat_1.png','images/eat_2.png','images/eat_3.png','images/eat_4.png')
  sadani = loadAnimation('images/sad_1.png','images/sad_2.png','images/sad_3.png')
}


function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  rope = new Rope(5,{x:250,y:30})
  fruit = Bodies.circle(250,50,25)
  World.add(world,fruit)

  blinkani.frameDelay=10
  eatani.frameDelay=100
  eatani.looping=false
  
  sadani.frameDelay = 40
  sadani.looping = false
  bunny = createSprite(220,600)
  bunny.addAnimation('blink',blinkani)
  bunny.addAnimation('eat',eatani)
  bunny.addAnimation('sad',sadani)

  bunny.scale = 0.2

  cut = createImg("images/cut_btn.png")
  cut.position(250,30)
  cut.size(50,50)
  cut.mouseClicked(function(){
    rope.break()
    link.remove()
  })
  link=new Link(rope,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.display()
  if(fruit!==null){
   push()
   imageMode(CENTER)
   image(fruitimg,fruit.position.x,fruit.position.y,100,100)
   pop()
  //dist(x1,y1,x2,y2)
  
   if (dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y)<80){
     bunny.changeAnimation('eat',eatani)
     World.remove(world,fruit)
     fruit = null
  }
  }
  if(fruit !== null&&fruit.position.y>650){
    bunny.changeAnimation('sad',sadani)

  }
  drawSprites()
}





