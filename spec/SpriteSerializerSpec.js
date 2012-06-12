describe("SpriteSerializer", function () {
  it("#serializeSprite", function () {
    var eventManager = new EventManager();
    var wall = new BrickWall(eventManager);
    wall.setPosition(new Point(1, 2));
    var serializer = new SpriteSerializer(eventManager);
    var result = serializer.serializeSprite(wall);
    expect(result).toEqual('BrickWall(1,2)');
  });
  
  it("#serializeSprites and #unserializeSprites", function () {
    var SERIALIZED_SPRITES = 'BrickWall(1,2);SteelWall(3,4)';
    var eventManager = new EventManager();
    
    var brickWall = new BrickWall(eventManager);
    brickWall.setPosition(new Point(1, 2));
    
    var steelWall = new SteelWall(eventManager);
    steelWall.setPosition(new Point(3, 4));
    
    var sprites = [brickWall, steelWall];
    
    var serializer = new SpriteSerializer(eventManager);
    var result = serializer.serializeSprites(sprites);
    
    expect(result).toEqual(SERIALIZED_SPRITES);
    
    var unserializedSprites = serializer.unserializeSprites(SERIALIZED_SPRITES);
    
    expect(unserializedSprites[0]).toEqual(brickWall);
    expect(unserializedSprites[1]).toEqual(steelWall);
  });
});
