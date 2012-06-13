describe("TankStateAppearing", function () {
  var eventManager, tank, state;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    state = new TankStateAppearing(tank);
  });
  
  it("animation", function () {
    spyOn(eventManager, 'fireEvent');
    state.setFrames([1,2]);
    expect(state.getFrame()).toEqual(1);
    expect(state.getImage()).toEqual('appear_1');
    state.updateFrame();
    expect(state.getFrame()).toEqual(2);
    expect(state.getImage()).toEqual('appear_2');
    var EVENT = {'name': TankStateAppearing.Event.END, 'tank': tank};
    expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
    state.updateFrame();
    expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
  });
  
  it("#update", function () {
    spyOn(state, 'updateFrame');
    state.update();
    expect(state.updateFrame).toHaveBeenCalled();
  });
  
  it("#canMove", function () {
    expect(state.canMove()).toBeFalsy();
  });
  
  it("#canShoot", function () {
    expect(state.canShoot()).toBeFalsy();
  });
});
