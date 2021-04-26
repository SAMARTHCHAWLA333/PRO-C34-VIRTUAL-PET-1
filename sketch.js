//Create variables here
var dog; 
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(40);
  
  dog = createsprite(250,350,10,60);
  dog.addImage(dog);
  dog.scale = 0.2;
}


function draw() {  

    //add styles here

    background(0,181,255);
    if (foodS!== undefined){
      textSize(50);
      fill(255);
      text("Use UP ARROW for feeding your pet",50,50);
      text("Food Left => "+foodS, 150, 150);

    if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
  }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dog);
    }

    if(foodS === 0){
      foodS = 20;
    }

    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food: x
  })
}

function readStock(data){
  foodS = data.val();
}