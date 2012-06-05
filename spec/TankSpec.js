describe("Tank", function () {
  var tank;
  
  beforeEach(function () {
    tank = new Tank();
  });
  
  describe("initial state", function () {
    it("position should be (0,0)", function () {
      expect(tank.getPosition()).toEqual(new Position(0, 0));
    });
    
    it("speed should be 0", function () {
      expect(tank.getSpeed()).toEqual(0);
    });
    
    it("direction should be Right", function () {
      expect(tank.getDirection()).toEqual(Direction.RIGHT);
    });
  });
  
  it("#setPosition", function () {
    var POSITION = new Position(1, 2);
    tank.setPosition(POSITION);
    expect(tank.getPosition()).toEqual(POSITION);
  });
  
  it("#setSpeed", function () {
    var SPEED = 2;
    tank.setSpeed(SPEED);
    expect(tank.getSpeed()).toEqual(SPEED);
  });
  
  it("#setDirection", function () {
    var DIRECTION = Direction.LEFT;
    tank.setDirection(DIRECTION);
    expect(tank.getDirection()).toEqual(DIRECTION);
  });
  
  describe("can move", function () {
    var INIT_X = 0, INIT_Y = 0, SPEED = 1;
    
    it("right", function () {
      checkDirection(Direction.RIGHT, new Position(INIT_X + SPEED, INIT_Y))
    });

    it("left", function () {
      checkDirection(Direction.LEFT, new Position(INIT_X - SPEED, INIT_Y))
    });
    
    it("up", function () {
      checkDirection(Direction.UP, new Position(INIT_X, INIT_Y - SPEED))
    });
    
    it("down", function () {
      checkDirection(Direction.DOWN, new Position(INIT_X, INIT_Y + SPEED))
    });
    
    function checkDirection(direction, finalPosition) {
      tank.setPosition(new Position(INIT_X, INIT_Y));
      tank.setSpeed(SPEED);
      tank.setDirection(direction);
      tank.move();
      expect(tank.getPosition()).toEqual(finalPosition);
    }
  });
});
