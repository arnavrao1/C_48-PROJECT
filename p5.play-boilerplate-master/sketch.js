var spaceshipImg, cometImg, backgroundImg, boomImg
var spaceship, obstacle, obstacleGroup, resetButton, resetButtonImg, explosionSound
var backgroundMusic
var lives = 3
var score = 0

function preload() {
  spaceshipImg = loadImage("spaceship.png")
cometImg = loadImage("comet.png")
backgroundImg = loadImage("background.jpg")
boomImg = loadImage("boom.png")
resetButtonImg = loadImage("resetButton.png")
explosionSound = loadSound("explosion.mp3")
backgroundMusic = loadSound("backgroundMusic.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backgroundMusic.play()
  backgroundMusic.setVolume(0.1)
  obstacleGroup = new Group()
  spaceship = createSprite(960, 540)
  spaceship.addImage("spaceship", spaceshipImg)
  spaceship.addImage("boom", boomImg)
  spaceship.scale = 0.5
  resetButton = createSprite(960, 800)
resetButton.addImage("resetButton", resetButtonImg)
resetButton.scale = 0.4
resetButton.visible = false

}

function draw() {
  background(backgroundImg);
  spawnObstacles()

  if(keyIsDown(UP_ARROW)) {
    spaceship.y = spaceship.y-15
  }

spaceship.setCollider("rectangle", 0, 0, 200, 400)
  if(keyIsDown(RIGHT_ARROW)) {
    spaceship.x = spaceship.x+15
  }

  if(keyIsDown(LEFT_ARROW)) {
    spaceship.x = spaceship.x-15
  }

  if(keyIsDown(DOWN_ARROW)) {
    spaceship.y = spaceship.y+15
  }

if(frameCount%80===0) {
  score = score + 5
}
  
  if(lives<=0) {
    spaceship.changeImage("boom")
    obstacle.visible = false
    backgroundMusic.stop()
    spaceship.scale = 0.7
    lives = 0
    if(keyIsDown(UP_ARROW)) {
      spaceship.x = 960
      spaceship.y = 540
    }
spaceship.setCollider("rectangle", 0, 0, 1, 1)
    if(keyIsDown(LEFT_ARROW)) {
      spaceship.x = 960
      spaceship.y = 540
    }

    if(keyIsDown(RIGHT_ARROW)) {
      spaceship.x = 960
      spaceship.y = 540
    }

    if(keyIsDown(DOWN_ARROW)) {
      spaceship.x = 960
      spaceship.y = 540
    }


resetButton.visible = true

if(frameCount % 80 === 0) {
score -= 5

}

if(mousePressedOver(resetButton)) {
  reset()
}
  }

  drawSprites();

  fill("white")
textSize(40)
  text("Score = "+score, 195, 35)

  fill("white")
textSize(40)
  text("Lives = "+lives, 25, 35)
  

  if(lives<=0) {
textSize(40)
    text("Oops! You lost the game!", 940, 150)
  }
}


function spawnObstacles() {
if(frameCount % 80 === 0) {
  obstacle = createSprite(50, 100)
  obstacleGroup.add(obstacle)
  obstacle.addImage("obstacle", cometImg)
  obstacle.scale=0.5
  obstacle.velocityX = 3
  obstacle.y = Math.round(random(10, 400))
  obstacle.x = Math.round(random(10, 200))

  if(obstacleGroup.isTouching(spaceship)) {
    explosionSound.play()
    explosionSound.setVolume(0.1)
    lives -= 1
    obstacleGroup.destroyEach()
    score -= 20
  }
}

if(score<0) {
  score = 0
}
}

function reset() {
    lives = 3
    obstacle.visible = true
    spaceship.scale = 0.5
    spaceship.x = 960
    spaceship.y = 540
    spaceship.changeImage("spaceship")

    if(keyIsDown(UP_ARROW)) {
      spaceship.y = spaceship.y-10
    }
  
    if(keyIsDown(RIGHT_ARROW)) {
      spaceship.x = spaceship.x+10
    }
  
    if(keyIsDown(LEFT_ARROW)) {
      spaceship.x = spaceship.x-10
    }
  
    if(keyIsDown(DOWN_ARROW)) {
      spaceship.y = spaceship.y+10
    }

spaceship.x = 370
spaceship.y = 300
score = 0
resetButton.visible = false

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}