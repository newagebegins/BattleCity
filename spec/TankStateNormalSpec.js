describe("TankStateNormal", function () {
  var eventManager, tank, state;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    tank.setTrackAnimationDuration(1);
    state = new TankStateNormal(tank);
  });
  
  describe("track animation", function () {
    it("animate when tank is moving", function () {
      tank.setSpeed(1);
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackAnimation();
      expect(state.getTrackFrame()).toEqual(2);
      state.updateTrackAnimation();
      expect(state.getTrackFrame()).toEqual(1);
    });

    it("don't animate when tank is not moving", function () {
      tank.setSpeed(0);
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackAnimation();
      expect(state.getTrackFrame()).toEqual(1);
      state.updateTrackAnimation();
      expect(state.getTrackFrame()).toEqual(1);
    });
  });
  
  it("flash animation", function () {
    tank.startFlashing();
    state.setFlashDuration(3);
    expect(state.isFlashed()).toBeTruthy();
    state.updateFlash();
    expect(state.isFlashed()).toBeTruthy();
    state.updateFlash();
    expect(state.isFlashed()).toBeTruthy();
    state.updateFlash();
    expect(state.isFlashed()).toBeFalsy();
    state.updateFlash();
    expect(state.isFlashed()).toBeFalsy();
    state.updateFlash();
    expect(state.isFlashed()).toBeFalsy();
    state.updateFlash();
    expect(state.isFlashed()).toBeTruthy();
  });
  
  describe("#getImage", function () {
    it("RIGHT", function () {
      tank.setDirection(Sprite.Direction.RIGHT);
      expect(state.getImage()).toEqual('tank_player1_right_1');
    });
    it("LEFT", function () {
      tank.toNormalSpeed();
      tank.setDirection(Sprite.Direction.LEFT);
      state.update();
      expect(state.getImage()).toEqual('tank_player1_left_2');
    });
    it("flashed", function () {
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.startFlashing();
      state.setFlashed(true);
      expect(state.getImage()).toEqual('tank_player1_right_1_f');
    });
  });
  
  describe("#update", function () {
    it("#update", function () {
      spyOn(state, 'updateTrackAnimation');
      spyOn(state, 'updateFlash');
      state.update();
      expect(state.updateTrackAnimation).toHaveBeenCalled();
      expect(state.updateFlash).toHaveBeenCalled();
    });
  });
  
  it("#canMove", function () {
    expect(state.canMove()).toBeTruthy();
  });
  
  it("#canShoot", function () {
    expect(state.canShoot()).toBeTruthy();
  });
});
