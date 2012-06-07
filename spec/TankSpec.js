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
  
  describe("#resolveCollisionWithWall", function () {
    it("tank moves right", function () {
      checkDirection(new Rect(1, 1, 2, 2), new Rect(2, 1, 2, 2), Sprite.Direction.RIGHT, new Point(0, 1));
    });
    
    it("tank moves left", function () {
      checkDirection(new Rect(2, 1, 2, 2), new Rect(1, 1, 2, 2), Sprite.Direction.LEFT, new Point(3, 1));
    });
    
    it("tank moves up", function () {
      checkDirection(new Rect(1, 2, 2, 2), new Rect(1, 1, 2, 2), Sprite.Direction.UP, new Point(1, 3));
    });
    
    it("tank moves down", function () {
      checkDirection(new Rect(1, 1, 2, 2), new Rect(1, 2, 2, 2), Sprite.Direction.DOWN, new Point(1, 0));
    });
    
    function checkDirection(tankRect, wallRect, direction, resolvedTankPosition) {
      tank.setRect(tankRect);
      tank.setDirection(direction);
      var wall = new Wall(eventManager);
      wall.setRect(wallRect);
      tank.resolveCollisionWithWall(wall);
      expect(tank.getPosition()).toEqual(resolvedTankPosition);
    }
  });
  
  it("should resolve collision when collides with a wall", function () {
    spyOn(tank, 'resolveCollisionWithWall');
    var wall = new Wall(eventManager);
    tank.notify({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'sprite': wall});
    expect(tank.resolveCollisionWithWall).toHaveBeenCalledWith(wall);
  });
  
  describe("#resolveOutOfBounds", function () {
    it("tank moves right", function () {
      checkDirection(new Point(9, 3), Sprite.Direction.RIGHT, new Point(8, 3));
    });
    
    it("tank moves left", function () {
      checkDirection(new Point(0, 3), Sprite.Direction.LEFT, new Point(1, 3));
    });
    
    it("tank moves up", function () {
      checkDirection(new Point(4, 1), Sprite.Direction.UP, new Point(4, 2));
    });
    
    it("tank moves down", function () {
      checkDirection(new Point(4, 7), Sprite.Direction.DOWN, new Point(4, 6));
    });
    
    function checkDirection(tankPosition, direction, resolvedPosition) {
      tank.setPosition(tankPosition);
      tank.setDimensions(2, 2);
      tank.setDirection(direction);
      var bounds = new Rect(1, 2, 9, 6);
      tank.resolveOutOfBounds(bounds);
      expect(tank.getPosition()).toEqual(resolvedPosition);
    }
  });
  
  it("should resolve collision when goes out of bounds", function () {
    spyOn(tank, 'resolveOutOfBounds');
    var bounds = new Rect(0, 0, 100, 100);
    tank.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': tank, 'bounds': bounds});
    expect(tank.resolveOutOfBounds).toHaveBeenCalledWith(bounds);
  });
});

describe("Tank", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(tank,
      [Bullet.Event.DESTROYED, CollisionDetector.Event.COLLISION, CollisionDetector.Event.OUT_OF_BOUNDS]);
  });
});
