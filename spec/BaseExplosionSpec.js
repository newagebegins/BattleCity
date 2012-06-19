describe("BaseExplosion", function () {
  it("#destroyHook", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var explosion = new BaseExplosion(eventManager);
    explosion.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': BaseExplosion.Event.DESTROYED, 'explosion': explosion});
  });
});
