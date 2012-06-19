describe("Lives", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var lives = new Lives(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(lives, [Tank.Event.PLAYER_DESTROYED]);
  });
  
  describe("#notify", function () {
    it("Tank.Event.PLAYER_DESTROYED", function () {
      var eventManager = new EventManager();
      var lives = new Lives(eventManager);
      var tank = new Tank(eventManager);
      spyOn(lives, 'take');
      lives.notify({'name': Tank.Event.PLAYER_DESTROYED, 'tank': tank});
      expect(lives.take).toHaveBeenCalled();
    });
  });
  
  it("#take", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var EVENT = {'name': Lives.Event.END};
    var lives = new Lives(eventManager);
    lives.setCount(2);
    
    expect(lives.getCount()).toEqual(2);
    lives.take();
    expect(lives.getCount()).toEqual(1);
    lives.take();
    expect(lives.getCount()).toEqual(0);
    
    expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
    lives.take();
    expect(lives.getCount()).toEqual(0);
    expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
  });
});
