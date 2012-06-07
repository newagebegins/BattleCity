describe("ExplosionFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var explosionFactory = new ExplosionFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(explosionFactory,
      [Bullet.Event.DESTROYED]);
  });
  
  it("default state", function () {
    var eventManager = new EventManager();
    var explosionFactory = new ExplosionFactory(eventManager);
    expect(explosionFactory.getExplosionSize()).toEqual(32);
  });
  
  it("should place explosions correctly", function () {
    var BULLET_X = 0;
    var BULLET_Y = 0;
    var EXPLOSION_SIZE = 32;
    var eventManager = new EventManager();
    var explosionFactory = new ExplosionFactory(eventManager);
    explosionFactory.setExplosionSize(EXPLOSION_SIZE);
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    bullet.setRect(new Rect(0, 0, 8, 8));
    var explosion = explosionFactory.createExplosion(bullet);
    
    expect(explosion.getRect()).toEqual(new Rect(
      (BULLET_X - EXPLOSION_SIZE) / 2,
      (BULLET_Y - EXPLOSION_SIZE) / 2,
      EXPLOSION_SIZE,
      EXPLOSION_SIZE));
  });
  
  it("should create explosions when notified about destroyed bullet", function () {
    var eventManager = new EventManager();
    var explosionFactory = new ExplosionFactory(eventManager);
    spyOn(explosionFactory, 'createExplosion');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    explosionFactory.notify({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
    expect(explosionFactory.createExplosion).toHaveBeenCalledWith(bullet);
  });
});
