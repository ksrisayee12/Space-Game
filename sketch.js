
var SERVE = 2;
var PLAY = 1;
var END = 0;


var gameState = SERVE;

var asteroid, asteroidimage;

var asteroid2, asteroid2image

var rocket, rocketimage;

var star, starimage;



var earth, earthimage;



var sun, sunimage;

var moon, moonimage;

var galaxy2, galaxy2image;

var galaxy1, galaxy1image;

var logo, logoimage

var astronaut, astronaut_image



var flare, flareimage;


var soundtrack;

var opener, openerimage;

var crashsound;

var gameover, gameoverimage;

var restart, restartimage

var leftkey,rightkey

var leftimage,rightimage

var asteroidsgroup;

var starsgroup;

var moongroup;

var mercurygroup;

var sungroup;

var galaxy1group;

var galaxy2group;

var saturngroup;

var earthgroup;

var astronautgroup;



var score;



var edges;


function preload() {
  sunimage = loadImage("sun.png");
  logoimage = loadImage("space download.png");
  moonimage = loadImage("moon.png");
  
  flareimage = loadImage("flare.png");
  earthimage = loadImage("earth.png");
  starimage = loadImage("startle.png");
  
  soundtrack = loadSound("spaceship audio.mp3");
  galaxy2image = loadImage("galaxy2.png");
 
  restartimage = loadImage("restart.png");
  openerimage = loadImage("start button.png");
  rocketimage = loadImage("rocketeer.png");
  galaxy1image = loadImage("milkyWay.png");
  asteroidimage = loadImage("asteroid.png");
  gameover_image = loadImage("gameover.jpg");
  
  astronaut_image = loadImage("astronaut.png");
  rocketimage = loadImage("awesomerocketimage.png");

  crashsound = loadSound("crash download.flac");
  
  leftimage = loadImage("left button.png")
  
  rightimage = loadImage("right button.png")
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  rocket = createSprite(windowWidth / 2, windowHeight - 50, 20, 5);
  rocket.addImage("rocket", rocketimage);
  rocket.scale = 0.18;
  score = 0;
 
  rightkey = createSprite(windowWidth+(-70), windowHeight-450)
  rightkey.addImage(rightimage)
  rightkey.scale=0.15
  
  leftkey = createSprite(windowWidth+(-1850), windowHeight-450)
  leftkey.addImage(leftimage)
  leftkey.scale=0.20
  
  edges = createEdgeSprites();


  
  asteroidsgroup = new Group();
  starsgroup = new Group();
  moongroup = new Group();
  
  sungroup = new Group();
  galaxy1group = new Group();
  galaxy2group = new Group();
  saturngroup = new Group();
  earthgroup = new Group();
  astronautgroup = new Group();
  
  flaregroup = new Group();
 
  logo = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  logo.addImage(logoimage);
  logo.scale = 1.2;
  logo.visible = true;
  //declaring message for clicking space
  opener = createSprite(windowWidth / 2.0, windowHeight - 215, 10, 10);
  opener.addImage(openerimage);
  opener.scale = 0.2;
  opener.visible = true;
  //declaring sprites for end Game state
  gameover = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  gameover.addImage(gameover_image);
  gameover.scale = 0.6;
  restart = createSprite(windowWidth - 360, windowHeight / 2, 10, 10);
  restart.addImage(restartimage);
  restart.scale = 0.7;
  
  gameover.visible = false;
  restart.visible = false;
}


function draw() {

  
  
  edges = createEdgeSprites();
  if (gameState === SERVE) {
    

   
    background(260);
    rocket.visible = false;
     
    if (mousePressedOver(opener)||touches.opener){
      gameState = PLAY
    }
  }
  if (gameState === PLAY) {
    rocket.collide(edges);
    gameover.visible = false;
    restart.visible = false;
    logo.visible = false;
    opener.visible = false;
    soundtrack.play();
    crashsound.stop()
    background(20);
    textSize(30);
    text("Score: " + score, windowWidth - 250, windowHeight - 350);
    score = score + Math.round(frameCount / 180);
    rocket.visible = true;
    if (keyDown("LEFT_ARROW")) {
      rocket.x = rocket.x - 34;
    }
    if (keyDown("RIGHT_ARROW")) {
      rocket.x = rocket.x + 34;
    }
    asteroidShower();
    rocketVelocity();
    rocket.setCollider("circle", 0, 0, 150);


    if (asteroidsgroup.isTouching(rocket)) {

     
      gameState = END;
      asteroid.velocityY = 0;
      
      crashsound.play();
      soundtrack.stop()
    }



  }
  if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    asteroidsgroup.setVelocityYEach(0);
    asteroidsgroup.destroyEach();
    sungroup.destroyEach();
    moongroup.destroyEach();
    galaxy1group.destroyEach();
    galaxy2group.destroyEach();
    
   
    earthgroup.destroyEach();
    astronautgroup.destroyEach();
    flaregroup.destroyEach();
    
    starsgroup.setVelocityYEach(0);
  rocket.x = windowWidth - 1250;
    rocket.y = windowHeight / 2;

    
    
    if (mousePressedOver(restart)||touches.restart) {
      reset();
    }

  }
  drawSprites();
}

function asteroidShower() {
  if (frameCount % 10 === 0) {
    asteroid = createSprite(30, 0, 500, 500);
    asteroid.addImage("asteroid", asteroidimage);
    asteroid.setCollider("circle", 0, 40, 415);

    asteroid.x = Math.round(random(windowWidth));
    asteroid.velocityY = +(10 + 5 * score / 1000)
    asteroid.scale = 0.09;
    asteroid.lifetime=windowHeight + 50
    //adding asteroids in asteroids group
    asteroidsgroup.add(asteroid);
    asteroid.depth = asteroid.depth + 5;
  }


}



function rocketVelocity() {
  if (frameCount % 0.5 === 0) {
    star = createSprite(500, 0, 40, 10);
    star.x = Math.round(random(windowWidth));
    star.addImage(starimage);
    star.velocityY = 45;
    star.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    star.scale = 0.02;
    star.lifetime=windowHeight + 50
    starsgroup.add(star);
  }

  if (frameCount % 425 === 0) {
    earth = createSprite(500, 0, 40, 10);
    earth.addImage(earthimage);
    earth.x = Math.round(random(windowWidth));
    earth.scale = 0.4;
    earth.velocityY = 10;
    earth.lifetime=windowHeight - 500
    earthgroup.add(earth);



  }


  

  

  if (frameCount % 243 === 0) {
    galaxy2 = createSprite(500, 0, 40, 10);
    galaxy2.addImage(galaxy2image);
    galaxy2.x = Math.round(random(windowWidth));
    galaxy2.scale = 0.4;
    galaxy2.velocityY = 15;
    galaxy2.lifetime=windowHeight - 50
    galaxy2group.add(galaxy2);
  }

  if (frameCount % 159 === 0) {
    galaxy1 = createSprite(500, 0, 40, 10);
    galaxy1.addImage(galaxy1image);
    galaxy1.x = Math.round(random(windowWidth));
    galaxy1.scale = 0.2;
    galaxy1.velocityY = 15;
    galaxy1.lifetime=windowHeight - 50
    galaxy1group.add(galaxy1);
  }

  if (frameCount % 744 === 0) {
    sun = createSprite(500, 0, 40, 10);
    sun.addImage(sunimage);
    sun.x = Math.round(random(windowWidth));
    sun.scale = 0.5;
    sun.velocityY = 10;
    sun.lifetime=windowHeight - 50
    sungroup.add(sun);

  }
  
  if (frameCount % 288 === 0) {
    moon = createSprite(500, 0, 40, 10);
    moon.addImage(moonimage);
    moon.scale = 0.5;
    moon.x = Math.round(random(windowWidth));
    moon.velocityY = 5;
    moon.lifetime=windowHeight - 50
    moongroup.add(moon);

  }
  if (frameCount % 388 === 0) {
    astronaut = createSprite(0, 300, 40, 10);
    astronaut.addImage(astronaut_image);
    astronaut.scale = 0.1;
    astronaut.y = Math.round(random(windowWidth));
    astronaut.velocityX = 5;
    astronaut.lifetime = windowWidth - 500
    astronautgroup.add(astronaut);

  }
  
  if (frameCount % 233 === 0) {
    flare = createSprite(500, 0, 40, 10);
    flare.addImage(flareimage);
    flare.scale = 0.4;
    flare.x = Math.round(random(windowWidth));
    flare.velocityY = 5;
    lifetime=windowHeight - 50
    flaregroup.add(flare);

  }
}

function reset() {
  gameState = PLAY;
  starsgroup.destroyEach();
  score = 0;
  rocket.x = windowWidth / 2;
  rocket.y = windowHeight - 50;

}