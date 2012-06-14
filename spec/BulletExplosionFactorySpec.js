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
    expect(explosionFactory.getBulletExplosionSize()).toEqual(32);
  });
  
  it("should place explosions correctly", function () {
    var EXPLOSION_SIZE = 32;
    var eventManager = new EventManager();
    var explosionFactory = new BulletExplosionFactory(eventManager);
    explosionFactory.setBulletExplosionSize(EXPLOSION_SIZE);
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    bullet.setRect(new Rect(0, 0, 8, 8));
    var explosion = explosionFactory.createBulletExplosion(bullet);
    
    expect(explosion.getRect()).toEqual(new Rect(-12, -12, EXPLOSION_SIZE, EXPLOSION_SIZE));
  });
  
  it("should create explosions when notified about destroyed bullet", function () {
    var eventManager = new EventManager();
    var explosionFactory = new BulletExplosionFactory(eventManager);
    spyOn(explosionFactory, 'createBulletExplosion');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    explosionFactory.notify({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
    expect(explosionFactory.createBulletExplosion).toHaveBeenCalledWith(bullet);
  });
});
