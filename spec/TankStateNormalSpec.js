describe("TankStateNormal", function () {
  var eventManager, tank, state;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    state = new TankStateNormal(tank);
  });
  
  describe("track animation", function () {
    it("animate when tank is moving", function () {
      tank.setSpeed(1);
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackFrame();
      expect(state.getTrackFrame()).toEqual(2);
      state.updateTrackFrame();
      expect(state.getTrackFrame()).toEqual(1);
    });

    it("don't animate when tank is not moving", function () {
      tank.setSpeed(0);
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackFrame();
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackFrame();
      expect(state.getTrackFrame()).toEqual(1);
    });
  });
  
  describe("#getImage", function () {
    it("RIGHT", function () {
      tank.setDirection(Sprite.Direction.RIGHT);
      state.setTrackFrame(1);
      expect(state.getImage()).toEqual('tank_player1_right_1');
    });
    it("LEFT", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      state.setTrackFrame(2);
      expect(state.getImage()).toEqual('tank_player1_left_2');
    });
  });
  
  it("#update", function () {
    spyOn(state, 'updateTrackFrame');
    state.update();
    expect(state.updateTrackFrame).toHaveBeenCalled();
  });
  
  it("#canMove", function () {
    expect(state.canMove()).toBeTruthy();
  });
  
  it("#canShoot", function () {
    expect(state.canShoot()).toBeTruthy();
  });
});
