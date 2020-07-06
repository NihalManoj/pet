var dog, happyDog, dogImg;
var foodS, foodStock;
var database;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  textSize = 30;
  fill("white");
  stroke(4);
  text("Note:Press UP_ARROW to feed your dog milk",135,400);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  database.ref("/").update({
    Food:x
  })
}