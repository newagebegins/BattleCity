describe("SteelWall", function () {
  it("initial state", function () {
    var eventManager = new EventManager();
    var wall = new SteelWall(eventManager);
    expect(wall.isInvincibleForNormalBullets()).toBeTruthy();
  });
  
  it("#getClassName", function () {
    var eventManager = new EventManager();
    var wall = new SteelWall(eventManager);
    expect(wall.getClassName()).toEqual('SteelWall');
  });
});
