describe("BulletExplosionFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var explosionFactory = new BulletExplosionFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(explosionFactory,
      [Bullet.Event.DESTROYED]);
  });
  
  it("default state", function () {
    var eventManager = new EventManager();
    var explosionFactory = new BulletExplosionFactory(eventManager);
    expect(explosionFactory.getExplosionSize()).toEqual(32);
  });
  
  it("should place explosions correctly", function () {
    var EXPLOSION_SIZE = 32;
    var eventManager = new EventManager();
    var explosionFactory = new BulletExplosionFactory(eventManager);
    explosionFactory.setExplosionSize(EXPLOSION_SIZE);
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    bullet.setRect(new Rect(0, 0, 8, 8));
    var explosion = explosionFactory.create(bullet);
    expect(explosion instanceof BulletExplosion).toBeTruthy();
    expect(explosion.getRect()).toEqual(new Rect(-12, -12, EXPLOSION_SIZE, EXPLOSION_SIZE));
  });
  
  describe("#notify", function () {
    var eventManager, explosionFactory, tank, bullet;
    
    beforeEach(function () {
      eventManager = new EventManager();
      explosionFactory = new BulletExplosionFactory(eventManager);
      spyOn(explosionFactory, 'create');
      tank = new Tank(eventManager);
      bullet = new Bullet(eventManager, tank);
    });
    
    it("explode", function () {
      explosionFactory.notify({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
      expect(explosionFactory.create).toHaveBeenCalledWith(bullet);
    });
    
    it("don't explode", function () {
      bullet.setExplode(false);
      explosionFactory.notify({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
      expect(explosionFactory.create).not.toHaveBeenCalled();
    });
  });
  
});
