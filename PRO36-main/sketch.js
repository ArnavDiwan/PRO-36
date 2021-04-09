var dog,sadDog,happyDog, database1;
var foodS, feedS, foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var fedTime, lastFed, feed, addFood;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database1 = firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database1.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed = createButton("Feed the dog");
  feed.position(700, 95)
  feed.mousePressed(feedDog)
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database1.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })
  
 
  //write code to display text lastFed time here
  fill(0, 0, 255);
  textSize(15);
  if (lastFed>=12){
   text("Last Feed: "+ lastFed %12 + "PM", 350, 30);
  }

 else if(lastFed == 0){
   text("Last Feed: 12AM", 350, 30);
 }

 else {
   text("Last Feed: "+ lastFed + "AM", 350, 30);
 }

//  if(mousePressedOver(feed)){
//    foodStock = foodStock - 1;
//  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  // feedS--;
  // database1.ref('/').update({
  //  Feed:feedS
  //  })
  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database1.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

function subFeed(){
  feedS--;
  database1.ref('/').update({
    Feed:feedS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database1.ref('/').update({
    Food:foodS
   })
}

