var candy,candyImg
var sandy,sandyImg
var turtleG
var ground
var realGround;
var bg,backDrop
var gameState = "select"
var ob,ob1,ob2,ob3,obGroup
var obrand
var obplace
var score = 0
var lifeCount = 3
var life,lifeImg,lifeG
var gameover,gameOver
var sStop,cStop
var fail,hit,life1,life2,jumppp
var liferand
function preload(){
    candyImg = loadAnimation("Images/candy1.png","Images/candy2.png")
    sandyImg = loadAnimation("Images/sandy1.png","Images/sandy2.png")
    bg = loadImage("Images/bg.png")
    ob1 = loadImage("Images/ob1.png")
    ob2 = loadImage("Images/ob2.png")
    ob3 = loadImage("Images/ob3.png")
    lifeImg = loadImage("Images/life.png")
    gameover = loadImage("Images/gameover.png")
    sStop = loadAnimation("Images/sandy1.png")
    cStop = loadAnimation("Images/candy1.png")
    fail = loadSound("Sounds/fail.mp3")
    hit = loadSound("Sounds/hit.wav")
    life1 = loadSound("Sounds/life1.mp3")
    life2 = loadSound("Sounds/life2.mp3")
    jumppp =loadSound("Sounds/jumppp.mp3")
}

function setup(){    
    createCanvas(1000,500) 
    backDrop = createSprite(500,250,20,20)
    backDrop.addImage(bg)
    backDrop.scale = 3.5
    ground = createSprite(500,480,1000,20)
    ground.shapeColor = "darkblue"
    turtleG = new Group;
    obGroup = new Group
    candy = createSprite(650,250,20,20)
    candy.addAnimation("run",candyImg)
    sandy = createSprite(350,250,20,20)
    sandy.addAnimation("run",sandyImg)
    candy.scale = 0.4
    sandy.scale = 0.4
    realGround = createSprite(500,490,1000,20)
    realGround.visible = false
    lifeG = new Group
    gameO =createSprite(500,200,20,20)
    gameO.addImage(gameover)
    gameO.visible = false
    sandy.addAnimation("stop",sStop)
        candy.addAnimation("stop",cStop)
}

function draw(){ 
    obrand = Math.round(random(1,3))
    
    background(0)
    textSize(25)
    drawSprites()
    if(gameState == "select"){
        fill("black")
    text("Please select your character",350,175)
    fill("purple")
    text("Candy",600,325)
    fill("darkgreen")
    text("Sandy",300,325)
    if(mousePressedOver(sandy)){
        gameState = "ingameS"
    }
    if(mousePressedOver(candy)){
        gameState = "ingameC"
    }
    }
    if(gameState == "ingameS" || gameState == "ingameC"){
        backDrop.velocityX = -3
        if(sandy.isTouching(obGroup) || candy.isTouching(obGroup)){
            isTouchingOb()

        }
        if(sandy.isTouching(lifeG) || candy.isTouching(lifeG)){
            lifeCount++
            lifeG.destroyEach()
            liferand = Math.round(random(1,2))
            if(liferand ==1){
                life1.play()
            }
            if(liferand ==2){
                life2.play()
            }

        }
            
        
        if(backDrop.x <300){
            backDrop.x = 500
            
        }
        if(gameState == "ingameS"){
            sandy.x = 150
            sandy.scale = 0.3
            candy.visible = false
            
            
            if(keyDown("space") && sandy.y >=449){
                sandy.velocityY = -14
                jumppp.play()
            }
            sandy.velocityY = sandy.velocityY+0.5
            
        }
        if(gameState == "ingameC"){
            candy.x = 150
            candy.scale = 0.3
            sandy.visible = false
            if(keyDown("space") && candy.y >=449){
                candy.velocityY = -14
            }
            candy.velocityY = candy.velocityY+0.5
        }
        sandy.collide(realGround)
        candy.collide(realGround)
        spawnOb()
        spawnLife()
        fill("black")
        text("score: "+score,20,20)
        text("Life: "+ lifeCount,20,40)
        score = score +Math.round(getFrameRate()/60)
        
    }

    if(gameState == "gameOver"){
        backDrop.velocityX = 0
        backDrop.x = 500
        fill("black")
        text("score: "+score,20,20)
        gameO.visible = true
        sandy.changeAnimation("stop",sStop)
        candy.changeAnimation("stop",cStop)
    }
    
    
}

function spawnOb(){
    if(frameCount%100===0){
        ob = createSprite(1000,435,20,20)
        if(obrand == 1){
            ob.addImage(ob1)
        }
        if(obrand == 2){
            ob.addImage(ob2)
        }
        if(obrand == 3){
            ob.addImage(ob3)
        }
        ob.scale = 0.225
        ob.velocityX = -5
        ob.lifetime = 250
        obGroup.add(ob)
    }
}

function spawnLife(){
    if(frameCount%250===0){
    life = createSprite(1000,320,20,20)
    life.addImage(lifeImg)
    life.scale = 0.1
    life.lifetime = 250
    life.velocityX = -5
    lifeG.add(life)
    }
}

function isTouchingOb(){
    if(lifeCount>1){
        lifeCount--
        for(var i = 0; i<obGroup.length;i++){
            if(sandy.isTouching(obGroup.get(i)) || candy.isTouching(obGroup.get(i))){
                obGroup.get(i).destroy()
            }
            
        }
        hit.play()
    }else{
        gameState ="gameOver"
        for(var i = 0; i<obGroup.length;i++){
            if(sandy.isTouching(obGroup.get(i)) || candy.isTouching(obGroup.get(i))){
                
                obGroup.get(i).velocityX = 0
                obGroup.get(i).lifetime =-1
                obGroup.get(i+1).velocityX = 0
                obGroup.get(i+1).lifetime =-1
            } 
        }
        lifeG.setVelocityXEach(0)
        lifeG.setLifetimeEach(-1)
        fail.play()
    }
    
    
}



