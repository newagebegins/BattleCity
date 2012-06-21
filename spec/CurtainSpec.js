describe("Curtain", function () {
  var eventManager, curtain;
  
  beforeEach(function () {
    eventManager = new EventManager();
    curtain = new Curtain(eventManager);
  });
  
  describe("#fall", function () {
    it("moving", function () {
      curtain.setHeight(3);
      curtain.setSpeed(1);
      expect(curtain.getPosition()).toEqual(0);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(1);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(2);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(3);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(3);
    });
    
    it("event", function () {
      var EVENT = {'name': Curtain.Event.HAS_FALLEN};
      spyOn(eventManager, 'fireEvent');
      
      curtain.setHeight(2);
      curtain.setSpeed(1);
      
      curtain.fall();
      expect(curtain.getPosition()).toEqual(1);
      expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
      
      curtain.fall();
      expect(curtain.getPosition()).toEqual(2);
      expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
      eventManager.fireEvent.reset();
      
      curtain.fall();
      expect(curtain.getPosition()).toEqual(2);
      expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
    });
  });
  
  describe("#rise", function () {
    it("moving", function () {
      curtain.setHeight(3);
      curtain.setSpeed(1);
      curtain.setPosition(3);
      expect(curtain.getPosition()).toEqual(3);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(2);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(1);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
    });
    
    it("event", function () {
      var EVENT = {'name': Curtain.Event.HAS_RISEN};
      spyOn(eventManager, 'fireEvent');
      
      curtain.setHeight(2);
      curtain.setSpeed(1);
      curtain.setPosition(2);
      
      curtain.rise();
      expect(curtain.getPosition()).toEqual(1);
      expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
      
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
      expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
      eventManager.fireEvent.reset();
      
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
      expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
    });
  });
});
