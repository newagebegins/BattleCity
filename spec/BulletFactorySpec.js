describe("BulletFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new BulletFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.SHOOT]);
  });
  
  describe("#createBullet", function () {
    it("RIGHT", function () {
      checkDirection(new Point(0, 0), new Point(32, 14), Sprite.Direction.RIGHT);
    });
    
    it("LEFT", function () {
      checkDirection(new Point(32, 0), new Point(31, 14), Sprite.Direction.LEFT);
    });
    
    it("UP", function () {
      checkDirection(new Point(0, 32), new Point(14, 31), Sprite.Direction.UP);
    });
    
    it("DOWN", function () {
      checkDirection(new Point(0, 0), new Point(14, 32), Sprite.Direction.DOWN);
    });
    
    function checkDirection(tankPosition, bulletPosition, direction) {
      var BULLET_SIZE = 4;
      var BULLET_SPEED = 8;
      
      var eventManager = new EventManager();
      spyOn(eventManager, 'fireEvent');
      
      var factory = new BulletFactory(eventManager);

      var tank = new Tank(eventManager);
      tank.setPosition(tankPosition);
      tank.setDimensions(32, 32);
      tank.setDirection(direction);
      tank.setBulletSize(BULLET_SIZE);
      tank.setBulletSpeed(BULLET_SPEED);

      var bullet = new Bullet(eventManager, tank);
      bullet.setPosition(bulletPosition);
      bullet.setDimensions(BULLET_SIZE, BULLET_SIZE);
      bullet.setDirection(direction);
      bullet.setSpeed(BULLET_SPEED);
      
      expect(factory.createBullet(tank)).toEqual(bullet);
    }
  });
});
