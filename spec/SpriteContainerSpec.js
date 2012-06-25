describe("SpriteContainer", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var spriteContainer = new SpriteContainer(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(spriteContainer,
      [Sprite.Event.CREATED, Sprite.Event.DESTROYED]);
  });
  
  it("should remove sprite when it is destroyed", function () {
    var eventManager = new EventManager();
    var sprite = new Sprite(eventManager);
    
    var spriteContainer = new SpriteContainer(eventManager);
    spriteContainer.addSprite(sprite);
    
    expect(spriteContainer.containsSprite(sprite)).toBeTruthy();
    spriteContainer.notify({'name': Sprite.Event.DESTROYED, 'sprite': sprite});
    expect(spriteContainer.containsSprite(sprite)).toBeFalsy();
  });
  
  it("should add sprite when it is created", function () {
    var eventManager = new EventManager();
    var sprite = new Sprite(eventManager);
    var spriteContainer = new SpriteContainer(eventManager);
    
    expect(spriteContainer.containsSprite(sprite)).toBeFalsy();
    spriteContainer.notify({'name': Sprite.Event.CREATED, 'sprite': sprite});
    expect(spriteContainer.containsSprite(sprite)).toBeTruthy();
  });
  
  it("should sort sprites by their z-index", function () {
    var eventManager = new EventManager();
    
    var spriteOne = new Sprite(eventManager);
    spriteOne.setZIndex(1);
    
    var spriteTwo = new Sprite(eventManager);
    spriteTwo.setZIndex(2);
    
    var spriteThree = new Sprite(eventManager);
    spriteThree.setZIndex(3);
    
    var spriteFour = new Sprite(eventManager);
    spriteFour.setZIndex(4);
    
    var spriteFive = new Sprite(eventManager);
    spriteFive.setZIndex(5);
    
    var spriteContainer = new SpriteContainer(eventManager);
    spriteContainer.addSprite(spriteFour);
    spriteContainer.addSprite(spriteOne);
    spriteContainer.addSprite(spriteThree);
    spriteContainer.addSprite(spriteFive);
    spriteContainer.addSprite(spriteTwo);
    
    expect(spriteContainer.getSprites()).toEqual([spriteOne, spriteTwo, spriteThree, spriteFour, spriteFive]);
  });
  
  it("#getEnemyTanks", function () {
    var eventManager = new EventManager();
    var spriteContainer = new SpriteContainer(eventManager);
    
    var enemyTankOne = new Tank(eventManager);
    enemyTankOne.makeEnemy();
    
    var enemyTankTwo = new Tank(eventManager);
    enemyTankTwo.makeEnemy();
    
    var brickWall = new BrickWall(eventManager);
    var player = new Tank(eventManager);
    
    expect(spriteContainer.getEnemyTanks().length).toEqual(2);
    expect(spriteContainer.getEnemyTanks()).toEqual([enemyTankOne, enemyTankTwo]);
  });
  
  it("#getWalls", function () {
    var eventManager = new EventManager();
    var spriteContainer = new SpriteContainer(eventManager);
    
    var enemyTank = new Tank(eventManager);
    enemyTank.makeEnemy();
    var brickWallOne = new BrickWall(eventManager);
    var brickWallTwo = new BrickWall(eventManager);
    var player = new Tank(eventManager);
    
    expect(spriteContainer.getWalls().length).toEqual(2);
    expect(spriteContainer.getWalls()).toEqual([brickWallOne, brickWallTwo]);
  });
  
  it("#getBase", function () {
    var eventManager = new EventManager();
    var spriteContainer = new SpriteContainer(eventManager);
    var base = new Base(eventManager);
    expect(spriteContainer.getBase()).toBe(base);
  });
});
