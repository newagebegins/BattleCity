describe("SpriteContainer", function () {
  it("should remove sprite when it is destroyed", function () {
    var eventManager = new EventManager();
    var sprite = new Sprite(eventManager);
    
    var spriteContainer = new SpriteContainer();
    spriteContainer.addSprite(sprite);
    
    expect(spriteContainer.containsSprite(sprite)).toBeTruthy();
    spriteContainer.notify({'name': Sprite.Event.DESTROYED, 'sprite': sprite});
    expect(spriteContainer.containsSprite(sprite)).toBeFalsy();
  });
  
  it("should add sprite when it is created", function () {
    var eventManager = new EventManager();
    var sprite = new Sprite(eventManager);
    var spriteContainer = new SpriteContainer();
    
    expect(spriteContainer.containsSprite(sprite)).toBeFalsy();
    spriteContainer.notify({'name': Sprite.Event.CREATED, 'sprite': sprite});
    expect(spriteContainer.containsSprite(sprite)).toBeTruthy();
  });
});
