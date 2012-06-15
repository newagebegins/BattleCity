describe("TankExplosion", function () {
  it("#destroyHook", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var explosion = new TankExplosion(eventManager);
    explosion.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
  });
});
