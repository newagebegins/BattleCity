describe("Painter", function () {
  it("should draw sprites", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'draw');
    var wall = new BrickWall(eventManager);
    spyOn(wall, 'draw');
    var painter = new Painter(eventManager);
    painter.addSprite(tank);
    painter.addSprite(wall);
    
    var ctx = 'ctx';
    painter.draw(ctx);
    
    expect(tank.draw).toHaveBeenCalledWith(ctx);
    expect(wall.draw).toHaveBeenCalledWith(ctx);
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
    
    var painter = new Painter(eventManager);
    painter.addSprite(spriteFour);
    painter.addSprite(spriteOne);
    painter.addSprite(spriteThree);
    painter.addSprite(spriteFive);
    painter.addSprite(spriteTwo);
    
    expect(painter.getSprites()).toEqual([spriteOne, spriteTwo, spriteThree, spriteFour, spriteFive]);
  });
});
