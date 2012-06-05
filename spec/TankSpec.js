describe("Tank", function () {
  var eventManager, tank;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
  });
  
  describe("initial state", function () {
    it("position should be (0,0)", function () {
      expect(tank.getPosition()).toEqual(new Point(0, 0));
    });
    
    it("speed should be 0", function () {
      expect(tank.getSpeed()).toEqual(0);
    });
    
    it("direction should be Right", function () {
      expect(tank.getDirection()).toEqual(Tank.Direction.RIGHT);
    });
  });
  
  it("#setSpeed", function () {
    var SPEED = 2;
    tank.setSpeed(SPEED);
    expect(tank.getSpeed()).toEqual(SPEED);
  });
  
  it("#setDirection", function () {
    var DIRECTION = Tank.Direction.LEFT;
    tank.setDirection(DIRECTION);
    expect(tank.getDirection()).toEqual(DIRECTION);
  });
  
  describe("can move", function () {
    var INIT_X = 0, INIT_Y = 0, SPEED = 1;
    
    it("right", function () {
      checkDirection(Tank.Direction.RIGHT, new Point(INIT_X + SPEED, INIT_Y))
    });

    it("left", function () {
      checkDirection(Tank.Direction.LEFT, new Point(INIT_X - SPEED, INIT_Y))
    });
    
    it("up", function () {
      checkDirection(Tank.Direction.UP, new Point(INIT_X, INIT_Y - SPEED))
    });
    
    it("down", function () {
      checkDirection(Tank.Direction.DOWN, new Point(INIT_X, INIT_Y + SPEED))
    });
    
    function checkDirection(direction, finalPosition) {
      tank.setPosition(INIT_X, INIT_Y);
      tank.setSpeed(SPEED);
      tank.setDirection(direction);
      tank.move();
      expect(tank.getPosition()).toEqual(finalPosition);
    }
  });
  
  it("should fire event when moved", function () {
    spyOn(eventManager, 'fireEvent');
    tank.move();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': Sprite.Event.MOVED,
      'sprite': tank});
  });
});
