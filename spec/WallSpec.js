describe("Wall", function () {
  it("initial state", function () {
    var eventManager = new EventManager();
    var wall = new Wall(eventManager);
    
    expect(wall.getWidth()).toEqual(16);
    expect(wall.getHeight()).toEqual(16);
    
    expect(wall.isHitLeft()).toBeFalsy();
    expect(wall.isHitTop()).toBeFalsy();
    expect(wall.isHitRight()).toBeFalsy();
    expect(wall.isHitBottom()).toBeFalsy();
  });
  
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var wall = new Wall(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(wall, [CollisionDetector.Event.COLLISION]);
  });
  
  describe("#notify", function () {
    it("hit by a bullet", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      spyOn(wall, 'hitByBullet');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      wall.notify({'name': CollisionDetector.Event.COLLISION, 'initiator': bullet, 'sprite': wall});
      expect(wall.hitByBullet).toHaveBeenCalledWith(bullet);
    });
  });
  
  describe('#hitByBullet', function () {
    it("hit left", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      spyOn(wall, 'hitLeft');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setDirection(Sprite.Direction.RIGHT);
      wall.hitByBullet(bullet);
      expect(wall.hitLeft).toHaveBeenCalled();
    });
    
    it("hit right", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      spyOn(wall, 'hitRight');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setDirection(Sprite.Direction.LEFT);
      wall.hitByBullet(bullet);
      expect(wall.hitRight).toHaveBeenCalled();
    });
    
    it("hit top", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      spyOn(wall, 'hitTop');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setDirection(Sprite.Direction.DOWN);
      wall.hitByBullet(bullet);
      expect(wall.hitTop).toHaveBeenCalled();
    });
    
    it("hit bottom", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      spyOn(wall, 'hitBottom');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setDirection(Sprite.Direction.UP);
      wall.hitByBullet(bullet);
      expect(wall.hitBottom).toHaveBeenCalled();
    });
    
    it("enhanced bullet", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setType(Bullet.Type.ENHANCED);
      spyOn(wall, 'destroy');
      wall.hitByBullet(bullet);
      expect(wall.destroy).toHaveBeenCalled();
    });
    
    it("invincible for normal bullets", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      wall.makeInvincibleForNormalBullets();
      spyOn(wall, 'hitBottom');
      var tank = new Tank(eventManager);
      var bullet = new Bullet(eventManager, tank);
      bullet.setDirection(Sprite.Direction.UP);
      wall.hitByBullet(bullet);
      expect(wall.hitBottom).not.toHaveBeenCalled();
    });
  });
  
  describe("hit multiple times", function () {
    it("test 1", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitLeft();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitLeft();
      expect(wall.isDestroyed()).toBeTruthy();
    });
    
    it("test 2", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitRight();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitRight();
      expect(wall.isDestroyed()).toBeTruthy();
    });
    
    it("test 3", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitTop();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitTop();
      expect(wall.isDestroyed()).toBeTruthy();
    });
    
    it("test 4", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitBottom();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitBottom();
      expect(wall.isDestroyed()).toBeTruthy();
    });
    
    it("test 5", function () {
      var eventManager = new EventManager();
      var wall = new Wall(eventManager);
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitTop();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitRight();
      expect(wall.isDestroyed()).toBeFalsy();
      wall.hitBottom();
      expect(wall.isDestroyed()).toBeTruthy();
    });
  });
});
