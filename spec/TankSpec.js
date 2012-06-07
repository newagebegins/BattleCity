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
    
    it("should have proper size", function () {
      expect(tank.getWidth()).toEqual(26);
      expect(tank.getHeight()).toEqual(26);
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
  
  describe("#shoot", function () {
    it("should fire event", function () {
      spyOn(eventManager, "fireEvent");
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
    });
    
    it("only one bullet can be shot at once", function () {
      spyOn(eventManager, "fireEvent");
      tank.shoot();
      eventManager.fireEvent.reset();
      tank.shoot();
      expect(eventManager.fireEvent).not.toHaveBeenCalled();
      tank.notify({'name': Bullet.Event.DESTROYED, 'tank': tank});
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
    });
  });
  
  describe("track animation", function () {
    it("animate when tank is moving", function () {
      tank.setSpeed(1);
      expect(tank.getTrackFrame()).toEqual(1);
      tank.updateTrackFrame();
      expect(tank.getTrackFrame()).toEqual(2);
      tank.updateTrackFrame();
      expect(tank.getTrackFrame()).toEqual(1);
    });

    it("don't animate when tank is not moving", function () {
      tank.setSpeed(0);
      expect(tank.getTrackFrame()).toEqual(1);
      tank.updateTrackFrame();
      expect(tank.getTrackFrame()).toEqual(1);
      tank.updateTrackFrame();
      expect(tank.getTrackFrame()).toEqual(1);
    });
  });
  
  describe("image", function () {
    it("RIGHT", function () {
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.setTrackFrame(1);
      expect(tank.getImage()).toEqual('tank_right_1');
    });
    it("LEFT", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      tank.setTrackFrame(2);
      expect(tank.getImage()).toEqual('tank_left_2');
    });
  });
});

describe("Tank", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(tank,
      [Bullet.Event.DESTROYED, CollisionDetector.Event.COLLISION]);
  });
});
