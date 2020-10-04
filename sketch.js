//Create variables here
var dog, happyDog, database, feed,foodStock=0, dog_img, happy_img,fedTime, lastFed,foodObj;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happy_img= loadImage("images/dogImg1.png");

 
}

function setup() {
  createCanvas(1000, 400);
  foodObj = new food();

  database = firebase.database();
  foodStockRef = database.ref('Food');
  foodStockRef.on("value",readStock);

  dog = createSprite(800,200,20,20);
  dog.addImage(dog_img);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,90);
  feed.mousePressed(feedDog);

  addFood  = createButton("Add Food");
  addFood.position(800,90);
  addFood.mousePressed(addFoods);

}


function draw() {  
    background(46, 139, 87);

    foodObj.display();

    fedTime = database.ref('FeedTime');
      fedTime.on("value",function(data){
        lastFed=data.val();
      });

    fill(255,255,254);
    textSize(15);

    if(lastFed>=12){
      text("Last Feed: "+ lastFed%12 + "PM",350,30);
    }
    else if(lastFed == 0){
      text("Last Feed :12 AM",350,30);
    }
    else{
      text("Last Feed: "+ lastFed + "AM",350,30);
    }
    drawSprites();
}

function feedDog(){
  dog.addImage(happy_img);

  foodObj.updateFoodStock(foodObj.getfoodstock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodstock(),
    FeedTime:hour()
  })
}

function readStock(data) {
  foodS = data.val();
  console.log(foodS)
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.getfoodstock()+1);
  console.log(foodStock)
  database.ref('/').update({
    Food:foodStock
  })
}

