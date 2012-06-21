describe("Curtain", function () {
  var eventManager, curtain;
  
  beforeEach(function () {
    eventManager = new EventManager();
    curtain = new Curtain(eventManager);
  });
  
  describe("#fall", function () {
    it("speed - 1", function () {
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
    
    it("speed - 2", function () {
      curtain.setHeight(3);
      curtain.setSpeed(2);
      expect(curtain.getPosition()).toEqual(0);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(2);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(3);
      curtain.fall();
      expect(curtain.getPosition()).toEqual(3);
    });
  });
  
  describe("#rise", function () {
    it("speed - 1", function () {
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
    
    it("speed - 2", function () {
      curtain.setHeight(3);
      curtain.setSpeed(2);
      curtain.setPosition(3);
      expect(curtain.getPosition()).toEqual(3);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(1);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
      curtain.rise();
      expect(curtain.getPosition()).toEqual(0);
    });
  });
});
