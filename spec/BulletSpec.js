describe("Bullet", function () {
  var eventManager, tank, bullet;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    bullet = new Bullet(eventManager, tank);
  });
  
  it("#destroyHook", function () {
    spyOn(eventManager, 'fireEvent');
    bullet.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
  });
  
  it("should be destroyed when goes out of bounds", function () {
    spyOn(bullet, 'destroy');
    bullet.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': bullet});
    expect(bullet.destroy).toHaveBeenCalled();
  });
  
  describe("CollisionDetector.Event.COLLISION", function () {
    it("wall", function () {
      var wall = new Wall(eventManager);
      spyOn(bullet, 'destroy');
      bullet.notify({
        'name': CollisionDetector.Event.COLLISION,
        'initiator': bullet,
        'sprite': wall});
      expect(bullet.destroy).toHaveBeenCalled();
    });
    
    describe("tank", function () {
      it("other tank", function () {
        var otherTank = new Tank(eventManager);
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherTank});
        expect(bullet.destroy).toHaveBeenCalled();
      });
      
      it("bullet's tank", function () {
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': tank});
        expect(bullet.destroy).not.toHaveBeenCalled();
      });
      
      it("enemy shot enemy", function () {
        spyOn(bullet, 'destroy');
        tank.makeEnemy();
        var otherTank = new Tank(eventManager);
        otherTank.makeEnemy();
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherTank});
        expect(bullet.destroy).not.toHaveBeenCalled();
      });
      
      it("hit invincible tank", function () {
        var otherTank = new Tank(eventManager);
        otherTank.setState(new TankStateInvincible(otherTank));
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherTank});
        expect(bullet.shouldExplode()).toBeFalsy();
      });
      
      it("collide with appearing tank", function () {
        var otherTank = new Tank(eventManager);
        otherTank.setState(new TankStateAppearing(otherTank));
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherTank});
        expect(bullet.destroy).not.toHaveBeenCalled();
      });
    });
    
    describe("bullet", function () {
      it("player hits enemy bullet", function () {
        var otherTank = new Tank(eventManager);
        otherTank.makeEnemy();
        var otherBullet = new Bullet(eventManager, otherTank);
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherBullet});
        expect(bullet.destroy).toHaveBeenCalled();
      });
      
      it("enemy hits player bullet", function () {
        var otherTank = new Tank(eventManager);
        otherTank.makeEnemy();
        var otherBullet = new Bullet(eventManager, otherTank);
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': otherBullet,
          'sprite': bullet});
        expect(bullet.destroy).toHaveBeenCalled();
      });
      
      it("enemy hits enemy bullet", function () {
        tank.makeEnemy();
        var otherTank = new Tank(eventManager);
        otherTank.makeEnemy();
        var otherBullet = new Bullet(eventManager, otherTank);
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': otherBullet});
        expect(bullet.destroy).not.toHaveBeenCalled();
      });
    });
    
    describe("base", function () {
      it("normal", function () {
        var base = new Base(eventManager);
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': base});
        expect(bullet.destroy).toHaveBeenCalled();
      });
      
      it("hit", function () {
        var base = new Base(eventManager);
        base.hit();
        spyOn(bullet, 'destroy');
        bullet.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': bullet,
          'sprite': base});
        expect(bullet.destroy).not.toHaveBeenCalled();
      });
    });
  });
});

describe("Bullet", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(bullet,
      [CollisionDetector.Event.OUT_OF_BOUNDS, CollisionDetector.Event.COLLISION]);
  });
});
