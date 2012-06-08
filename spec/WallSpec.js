describe("Wall", function () {
  it("initial state", function () {
    var eventManager = new EventManager();
    var wall = new Wall(eventManager);
    
    expect(wall.getWidth()).toEqual(16);
    expect(wall.getHeight()).toEqual(16);
  });
});
