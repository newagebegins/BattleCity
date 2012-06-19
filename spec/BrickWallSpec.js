describe("BrickWall", function () {
  it("#getClassName", function () {
    var eventManager = new EventManager();
    var wall = new BrickWall(eventManager);
    expect(wall.getClassName()).toEqual('BrickWall');
  });
});
