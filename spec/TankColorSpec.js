describe("TankColor", function () {
  describe("#update", function () {
    var color;
    
    beforeEach(function () {
      color = new TankColor();
      color.setColors([[0,1],[0,2],[1,2],[0,0]]);
    });
    
    it("no hits", function () {
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(1);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(1);
    });
    
    it("one hit", function () {
      color.hit();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(2);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(2);
    });
    
    it("two hits", function () {
      color.hit();
      color.hit();
      expect(color.getColor()).toEqual(1);
      color.update();
      expect(color.getColor()).toEqual(2);
      color.update();
      expect(color.getColor()).toEqual(1);
      color.update();
      expect(color.getColor()).toEqual(2);
    });
    
    it("three hits", function () {
      color.hit();
      color.hit();
      color.hit();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
    });
    
    it("four hits", function () {
      color.hit();
      color.hit();
      color.hit();
      color.hit();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
      color.update();
      expect(color.getColor()).toEqual(0);
    });
  });
});
