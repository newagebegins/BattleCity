describe("TankStateAppearing", function () {
  var eventManager, tank, state;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    state = new TankStateAppearing(tank);
  });
  
  
  describe("animation", function () {
    it("normal", function () {
      spyOn(eventManager, 'fireEvent');
      state.setFrames([1,2]);
      state.setFrameDuration(1);
      expect(state.getImage()).toEqual('appear_1');
      state.update();
      expect(state.getImage()).toEqual('appear_2');
      var EVENT = {'name': TankStateAppearing.Event.END, 'tank': tank};
      expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
      state.update();
      expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
    });
    
    it("pause", function () {
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(eventManager, 'fireEvent');
      state.setFrames([1,2]);
      state.setFrameDuration(1);
      expect(state.getImage()).toEqual('appear_1');
      state.update();
      expect(state.getImage()).toEqual('appear_1');
    });
  });
  
  it("#canMove", function () {
    expect(state.canMove()).toBeFalsy();
  });
  
  it("#canShoot", function () {
    expect(state.canShoot()).toBeFalsy();
  });
});
