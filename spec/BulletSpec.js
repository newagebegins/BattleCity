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
