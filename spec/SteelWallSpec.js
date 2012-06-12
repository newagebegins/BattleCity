describe("SteelWall", function () {
  it("#getClassName", function () {
    var eventManager = new EventManager();
    var wall = new SteelWall(eventManager);
    expect(wall.getClassName()).toEqual('SteelWall');
  });
});
