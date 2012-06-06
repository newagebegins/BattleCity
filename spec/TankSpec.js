describe("Tank", function () {
  var eventManager, tank;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
  });
  
  describe("initial state", function () {
    it("normal speed should be 0", function () {
      expect(tank.getNormalSpeed()).toEqual(0);
    });
    
    it("bullet size should be 1", function () {
      expect(tank.getBulletSize()).toEqual(1);
    });
    
    it("bullet speed should be 1", function () {
      expect(tank.getBulletSpeed()).toEqual(1);
    });
  });
  
  describe("can move", function () {
    var INIT_X = 0, INIT_Y = 0, SPEED = 1;
    
    it("right", function () {
      checkDirection(Sprite.Direction.RIGHT, new Point(INIT_X + SPEED, INIT_Y))
    });

    it("left", function () {
      checkDirection(Sprite.Direction.LEFT, new Point(INIT_X - SPEED, INIT_Y))
    });
    
    it("up", function () {
      checkDirection(Sprite.Direction.UP, new Point(INIT_X, INIT_Y - SPEED))
    });
    
    it("down", function () {
      checkDirection(Sprite.Direction.DOWN, new Point(INIT_X, INIT_Y + SPEED))
    });
    
    function checkDirection(direction, finalPosition) {
      tank.setXY(INIT_X, INIT_Y);
      tank.setSpeed(SPEED);
      tank.setDirection(direction);
      tank.move();
      expect(tank.getPosition()).toEqual(finalPosition);
    }
  });
  
  it('#shoot', function () {
    spyOn(eventManager, 'fireEvent');
    tank.shoot();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': Tank.Event.SHOOT,
      'tank': tank});
  });
});
