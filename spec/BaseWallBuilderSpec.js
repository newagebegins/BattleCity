describe("BaseWallBuilder", function () {
  it("#buildWall and #destroyWall", function () {
    var eventManager = new EventManager();
    var container = new SpriteContainer(eventManager);
    
    new BrickWall(eventManager);
    
    var builder = new BaseWallBuilder();
    builder.setWallPositions([new Point(1, 2), new Point(10, 20)]);
    builder.setWallFactory(new BrickWallFactory(eventManager))
    builder.setSpriteContainer(container);
    builder.buildWall();
    
    var sprites = container.getSprites();
    expect(sprites.length).toEqual(3);
    expect(sprites[1] instanceof BrickWall);
    expect(sprites[1].getPosition()).toEqual(new Point(1, 2));
    expect(sprites[2].getPosition()).toEqual(new Point(10, 20));
    
    builder.destroyWall();
    
    expect(sprites[0].isDestroyed()).toBeFalsy();
    expect(sprites[1].isDestroyed()).toBeTruthy();
    expect(sprites[2].isDestroyed()).toBeTruthy();
  });
});
